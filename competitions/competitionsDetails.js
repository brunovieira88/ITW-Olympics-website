  // ViewModel KnockOut
  var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/Competitions");
    self.error = ko.observable("");
    self.passingMessage = ko.observable("");
    self.sportId = ko.observable("");
    self.name = ko.observable("");
    self.photo = ko.observable("");
    self.sportInfoId = ko.observable();
    self.sportInfoName = ko.observable();
    self.athletes = ko.observableArray([]);
    self.tag = ko.observable("");
    //--- Internal functions
    self.activate = function (id, name) { 
        console.log("CALL: getAthlete by ID...");

        var composedUri = self.baseUri() + "?sportid=" + id + "&name=" + name;
        console.log(composedUri); 
        ajaxHelper(composedUri, "GET").done(function (data) {
            console.log(data);
            hideLoading();
    
            // Set the observables with the returned data
            self.sportId(data.SportId);
            self.name(data.Name);
            self.photo(data.Photo || '2024_Summer_Olympics_logo.svg.png');
            self.sportInfoId(data.SportInfo.Id);
            self.sportInfoName(data.SportInfo.Name);
            self.athletes(data.Athletes);
            self.tag(data.Tag);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching athlete data: ", textStatus, errorThrown);
            self.error("Error loading data, please try again later.");
        });
    };
    
    function ajaxHelper(uri, method, data) {
        self.error("");
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
    var SportId = getUrlParameter("sportid");
    var sportName = getUrlParameter("name")
    console.log("sport id,", SportId);
    console.log("name,", sportName);
    if (SportId == undefined || sportName == undefined) {
        console.error("No sport ID or name provided in the URL.");
        self.error("No sport ID or name provided.");
        hideLoading();
    }
    else {
      self.activate(SportId, sportName);
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
  