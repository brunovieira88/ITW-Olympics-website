// ViewModel KnockOut
var allSports;

var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/API/Sports');
    self.displayName = 'Paris2024 Sports List';
    self.error = ko.observable('');
    self.sports = ko.observableArray([]);
    self.isShowingFav = ko.observable(false);

    self.setFavorite = function () {
        var ident = this.Id;
        var existingInfo = JSON.parse((localStorage.getItem("fav_sports")) || "[]");
        if (!Array.isArray(existingInfo)) {
          existingInfo = [];
        }
    
        count = 0;
        for (var i = 0; i < existingInfo.length; i++) {
          if (existingInfo[i].Id == ident) {
            count = 1;
            break;
          }
        }
        if (count != 1) {
          existingInfo.push(this); 
          $("#" + ident).html("<i class='fa fa-heart' aria-hidden='true'></i>");
        }  
        else {
          existingInfo = existingInfo.filter(function (sport) {
          return sport.Id !== ident;
        });
          $("#" + ident).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
        }
        localStorage.setItem("fav_sports", JSON.stringify(existingInfo));
        console.log(JSON.parse(localStorage.getItem("fav_sports") || "[]"));
    };

    self.removeAllFavorites = function () {
        localStorage.removeItem("fav_sports");
        self.isShowingFav(false);
        window.location.reload()
    
    };
    

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getAthletes...');
        var composedUri = self.baseUri();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.sports(data);
            allSports = data;
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

ko.bindingHandlers.showFavorites = {
    init: function (element, valueAccessor) {
      var value = valueAccessor();
      $(element).click(function () {
        if (value.isShowingFav()) {
          value.sports(allSports);
          value.isShowingFav(false);
        }
        else {
          let favoritesSports = JSON.parse(localStorage.getItem("fav_sports") || "[]");
          value.sports(favoritesSports);
          value.isShowingFav(true);
        }
      
      });
    }
};

ko.bindingHandlers.favButton = {
  init: function (element, valueAccessor) {
    var existingInfo = JSON.parse(localStorage.getItem("fav_sports") || "[]");
    for (var i = 0; i < existingInfo.length; i++) {
      if (existingInfo[i].Id == element.id) {
        $(element).html("<i class='fa fa-heart' aria-hidden='true'></i>");
        break;
      }
    }
  }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})