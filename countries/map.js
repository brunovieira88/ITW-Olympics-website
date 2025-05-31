function CountryViewModel() {
    var self = this;
    self.countryName = ko.observable('');
    self.countryImageUrl = ko.observable('');
    self.totalMedals = ko.observable(0);
    self.totalAthletes = ko.observable(0);
    self.totalCoaches = ko.observable(0);
    self.detailsPageUrl = ko.observable('#');

    // Função para buscar detalhes do NOC
    self.fetchNOCDetails = function (countryName) {
        var url = `http://192.168.160.58/Paris2024/api/NOCs/Search?q=${countryName}`;
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                if (data.length > 0) {
                    var nocId = data[0].Id;
                    if (data[0].Name.toLowerCase() === countryName.toLowerCase()) {
                        self.fetchNOCInfo(nocId);
                    } else {
                        alert('Nome pesquisado não corresponde a nenhum país');
                    }
                } else {
                    console.error('NOC não encontrado para o país: ' + countryName);
                }
            },
            error: function () {
                console.error('Falha ao buscar dados do NOC da API');
            }
        });
    };

    // Função para informações detalhadas do NOC
    self.fetchNOCInfo = function (nocId) {
        var url = `http://192.168.160.58/Paris2024/api/NOCs/${nocId}`;
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                self.countryName(data.Name);
                self.countryImageUrl(data.Photo);
                self.totalAthletes(data.Athletes.length);
                self.totalCoaches(data.Coaches.length);
                self.totalMedals(data.Medals.length);
                self.detailsPageUrl(`countrydetails.html?id=${nocId}`);

                $('#countryModal').modal('show');
                
                // foco do modal
                $('#countryModal').attr('aria-hidden', 'false');
                $('#countryModal').find('.modal-content').focus(); 
                console.log(data);
            },
            error: function(xhr, status, error) {
                console.error('Erro ao buscar dados do NOC.', error);
                console.log('Detalhes da resposta:', xhr.responseText);
                alert(`Erro ao buscar dados do NOC. Status: ${xhr.status}, ${error}`);
            }
        });
    };
}

$(document).ready(function () {
    var viewModel = new CountryViewModel();
    ko.applyBindings(viewModel);

    $('#allSvg').on('click', '.allPaths', function () {
        var countryId = $(this).attr('id');
        if (countryId) {
            viewModel.fetchNOCDetails(countryId);
        } else {
            console.error('O atributo id está ausente ou indefinido');
        }
    });

    function searchCountry() {
        var searchQuery = $('#searchInput').val().trim();
        if (searchQuery) {
            viewModel.fetchNOCDetails(searchQuery);
        }
    }

    $('#searchButton').on('click', searchCountry);

    // Fechamento do modal
    $('#countryModal').on('hidden.bs.modal', function () {
        $(this).attr('aria-hidden', 'true');
    });
});
