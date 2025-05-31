  // ViewModel KnockOut
  var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/Technical_officials");
    self.error = ko.observable("");
    self.passingMessage = ko.observable("");
    self.officialId = ko.observable("");
    self.name = ko.observable("");
    self.birthDate = ko.observable("");
    self.officialFunction = ko.observable("");
    self.sex = ko.observable("");
    self.photo = ko.observable("");
    self.category = ko.observable("");
    self.organizationCode = ko.observable("");
    self.organization = ko.observable("");
    self.organizationLong = ko.observable("");
    self.moreInfo = ko.observable("");
    self.sports = ko.observableArray([]);
  
    //--- Internal functions
    self.activate = function (id) { 
        console.log("CALL: getAthlete by ID...");

        var composedUri = self.baseUri() + "/" + id;
        console.log(composedUri); 
        ajaxHelper(composedUri, "GET").done(function (data) {
            console.log(data);
            hideLoading();
    
            // Set the observables with the returned data
            self.officialId(data.Id);
            self.name(data.Name);
            self.birthDate(data.BirthDate);
            self.sex(data.Sex);
            self.officialFunction(data.Function);
            self.photo(data.Photo || "https://static.thenounproject.com/png/503257-200.png");
            self.moreInfo(data.Url); 
            self.sports(data.Sports);
            self.category(data.Category);
            self.organizationCode(data.OrganisationCode);
            self.organization(data.Organisation);
            self.organizationLong(data.OrganisationLong);

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
    var officialId = getUrlParameter("id");
    console.log("official id,", officialId);
    if (officialId == undefined) {
        console.error("No official ID provided in the URL.");
        self.error("No official ID provided.");
        hideLoading();
    }
    else {
      self.activate(officialId);
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
  