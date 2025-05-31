// ViewModel KnockOut
var vm = function () {
  console.log("ViewModel initiated...");
  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/Coaches");
  self.displayName = "Paris2024 Coaches List";
  self.error = ko.observable("");
  self.passingMessage = ko.observable("");
  self.coaches = ko.observableArray([]);
  self.currentPage = ko.observable(1);
  self.pagesize = ko.observable(20);
  self.totalRecords = ko.observable(50);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.isShowingFav = ko.observable(false);
  self.searchParameter = ko.observable(getUrlParameter("search") || "");
  self.previousPage = ko.computed(function () {
    return self.currentPage() * 1 - 1;
  }, self);
  self.nextPage = ko.computed(function () {
    return self.currentPage() * 1 + 1;
  }, self);
  self.fromRecord = ko.computed(function () {
    return self.previousPage() * self.pagesize() + 1;
  }, self);
  self.toRecord = ko.computed(function () {
    return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
  }, self);
  self.totalPages = ko.observable(0);
  self.pageArray = function () {
    var list = [];
    var size = Math.min(self.totalPages(), 9);
    var step;
    if (size < 9 || self.currentPage() === 1) step = 0;
    else if (self.currentPage() >= self.totalPages() - 4)
      step = self.totalPages() - 9;
    else step = Math.max(self.currentPage() - 5, 0);

    for (var i = 1; i <= size; i++) list.push(i + step);
    return list;
  };
  //favoritos
  self.setFavorite = function () {
    var ident = this.Id;
    var existingInfo = JSON.parse((localStorage.getItem("fav_coaches")) || "[]");
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
      existingInfo = existingInfo.filter(function (coache) {
      return coache.Id !== ident;
    });
      $("#" + ident).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
    }
    localStorage.setItem("fav_coaches", JSON.stringify(existingInfo));
    console.log(JSON.parse(localStorage.getItem("fav_coaches") || "[]"));
  };
  // tirar refreh se der
  self.removeAllFavorites = function () {
    localStorage.removeItem("fav_coaches");
    self.isShowingFav(false);
    window.location.reload()

  };
  
  //--- Page Events
  self.activate = function (id) { 
    console.log("CALL: getAthletes...");
    var composedUri =
      self.baseUri() + "?page=" + id + "&pagesize=" + self.pagesize() + "&search=" + self.searchParameter();
    console.log(composedUri);
    ajaxHelper(composedUri, "GET").done(function (data) {
      console.log(data);
      hideLoading();
      self.coaches(data.Coaches);
      self.currentPage(data.CurrentPage);
      self.hasNext(data.HasNext);
      self.hasPrevious(data.HasPrevious);
      self.pagesize(data.PageSize);
      self.totalPages(data.TotalPages);
      self.totalRecords(data.TotalCoaches);
      allCoaches = data.Coaches;
    });
  };
  //--- Internal functions
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
  var pg = getUrlParameter("page");
  if (pg == undefined) self.activate(1);
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
        value.coaches(allCoaches);
        value.isShowingFav(false);
        $("#Pag").removeClass("d-none");
      }
      else {
        let favoritesCoaches = JSON.parse(localStorage.getItem("fav_coaches") || "[]");
        value.coaches(favoritesCoaches);
        value.isShowingFav(true);
        $("#Pag").addClass("d-none");
      }
    });
  }
};

ko.bindingHandlers.favButton = {
  init: function (element, valueAccessor) {
    var existingInfo = JSON.parse(localStorage.getItem("fav_coaches") || "[]");
    for (var i = 0; i < existingInfo.length; i++) {
      if (existingInfo[i].Id == element.id) {
        $(element).html("<i class='fa fa-heart' aria-hidden='true'></i>")
        break;
      }
    }
  }
}

$(document).ready(function () {
  console.log("ready!");
  ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
  $("#myModal").modal("hide");
});


