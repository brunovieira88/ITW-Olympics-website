function BasketballViewModel() {
    var self = this;

    self.baseUri = 'http://192.168.160.58/Paris2024/api/Basketballs/';
    self.matches = ko.observableArray([]);
    self.filterSex = ko.observable('M');
    self.filterGroupAndStage = ko.observable(''); 
    
    self.formatDate = function (dateString) {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };    function showLoading() {
        var loadingModal = new bootstrap.Modal(document.getElementById('myModal'), {
            backdrop: 'static',
            keyboard: false
        });
        loadingModal.show();
    }

    function hideLoading() {
        var loadingModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
        if (loadingModal) {
            loadingModal.hide();
        }
    }

    self.loadMatches = function () {
        var combinedMatches = [];
        var ids = [];
        for (var i = 1; i <= 104; i++) {
            ids.push(i);
        }

        showLoading(); 

        function loadPair(index) {
            if (index >= ids.length) {
                self.matches(combinedMatches);
                console.log('Partidas carregadas:', combinedMatches);
                hideLoading(); 
                return;
            }

            var id1 = ids[index];
            var id2 = id1 + 1;

            $.ajax({
                url: self.baseUri + id1,
                method: 'GET',
                dataType: 'json',
                success: function (response1) {
                    $.ajax({
                        url: self.baseUri + id2,
                        method: 'GET',
                        dataType: 'json',
                        success: function (response2) {
                            if (response1.Sex === response2.Sex) {
                                combinedMatches.push({
                                    StageName: response1.StageName,
                                    Venue: response1.Venue,
                                    Sex: response1.Sex,
                                    Group: response1.Group,
                                    Date: self.formatDate(response1.Date),
                                    Team1: {
                                        Name: response1.ParticipantName,
                                        Country: response1.CountryName,
                                        CountryCode: response1.CountryCode,
                                        detailsPageUrl: `../countries/countrydetails.html?id=${response1.CountryCode}` ,
                                        Result: response1.Result || 'N/A',
                                        CountryImage: response1.CountryFlag,
                                    },
                                    Team2: {
                                        Name: response2.ParticipantName,
                                        Country: response2.CountryName,
                                        CountryCode: response2.CountryCode,
                                        detailsPageUrl: `../countries/countrydetails.html?id=${response2.CountryCode}` ,
                                        Result: response2.Result || 'N/A',
                                        CountryImage: response2.CountryFlag,
                                    }
                                });
                            } else {
                                console.warn('Sexo inconsistente para IDs: ' + id1 + ' e ' + id2);
                            }
                            loadPair(index + 2);
                        },
                        error: function () {
                            console.warn('Erro ao carregar ID: ' + id2);
                            loadPair(index + 2);
                        }
                    });
                },
                error: function () {
                    console.warn('Erro ao carregar ID: ' + id1);
                    loadPair(index + 2);
                }
            });
        }

        loadPair(0);
    };

    self.filteredMatches = ko.computed(function () {
        return self.matches().filter(function (match) {
            var matchesSex = match.Sex === self.filterSex();
            var matchesGroup = !self.filterGroupAndStage() || match.StageName === self.filterGroupAndStage();
            return matchesSex && matchesGroup;
        });
    });

    self.loadMatches();
}
ko.applyBindings(new BasketballViewModel());
