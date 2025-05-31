  // ViewModel KnockOut
  var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/Sports");
    self.error = ko.observable("");
    self.passingMessage = ko.observable("");
    self.id = ko.observable("");
    self.name = ko.observable("");
    self.sport_url = ko.observable("");
    self.pictogram = ko.observable("");
    self.athletes = ko.observableArray([]);
    self.coaches = ko.observableArray([]);
    self.competitions = ko.observableArray([]);
    self.teams = ko.observableArray([]);
    self.technical_officials = ko.observableArray([]);
    self.venues = ko.observableArray([]);
    //--- Internal functions
    self.activate = function (id) { 
        console.log("CALL: getAthlete by ID...");

        var composedUri = self.baseUri() + "/" + id;
        console.log(composedUri); 
        ajaxHelper(composedUri, "GET").done(function (data) {
            console.log(data);
            hideLoading();
    
            // Set the observables with the returned data
            self.id(data.Id);
            self.name(data.Name);
            self.sport_url(data.Sport_url);
            self.pictogram(data.Pictogram);
            self.athletes(data.Athletes);
            self.coaches(data.Coaches);
            self.competitions(data.Competitions);
            self.teams(data.Teams);
            self.technical_officials(data.Technical_officials);
            self.venues(data.Venues);
            

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching athlete data: ", textStatus, errorThrown);
            self.error("Error loading data, please try again later.");
        });
    };
    
    function ajaxHelper(uri, method, data) {
        self.error(""); // Clear error message
        return $.ajax({
          type: method,
          url: uri,
          dataType: "json",
          contentType: "application/json",
          data: data ? JSON.stringify(data) : null,
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            hideLoading();
            self.error(errorThrown);
          },
        });
    }
  
    function sleep(milliseconds) {
      const start = Date.now();
      while (Date.now() - start < milliseconds);
    }
  
    function showLoading() {
      $("#myModal").modal("show", {
        backdrop: "static",
        keyboard: false,
      });
    }
    function hideLoading() {
      $("#myModal").on("shown.bs.modal", function (e) {
        $("#myModal").modal("hide");
      });
    }
  
    function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;
      console.log("sPageURL=", sPageURL);
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");
  
        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined
            ? true
            : decodeURIComponent(sParameterName[1]);
        }
      }
    }
    //--- start ....
    showLoading();
    var SportId = getUrlParameter("id");
    console.log("sport id,", SportId);
    if (SportId == undefined) {
        console.error("No sport ID provided in the URL.");
        self.error("No sport ID provided.");
        hideLoading();
    }
    else {
      self.activate(SportId);
    }
    console.log("VM initialized!");
  };
  
  $(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());

  });
  
  $(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal("hide");
  });
  