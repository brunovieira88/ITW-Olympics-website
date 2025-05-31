const countryToCode = {
  "Afghanistan": "af",
  "Albania": "al",
  "Algeria": "dz",
  "Andorra": "ad",
  "Angola": "ao",
  "Antigua and Barbuda": "ag",
  "Argentina": "ar",
  "Armenia": "am",
  "Australia": "au",
  "Austria": "at",
  "Azerbaijan": "az",
  "Bahamas": "bs",
  "Bahrain": "bh",
  "Bangladesh": "bd",
  "Barbados": "bb",
  "Belarus": "by",
  "Belgium": "be",
  "Belize": "bz",
  "Benin": "bj",
  "Bhutan": "bt",
  "Bolivia": "bo",
  "Bosnia and Herzegovina": "ba",
  "Botswana": "bw",
  "Brazil": "br",
  "Brunei": "bn",
  "Bulgaria": "bg",
  "Burkina Faso": "bf",
  "Burundi": "bi",
  "Cabo Verde": "cv",
  "Cambodia": "kh",
  "Cameroon": "cm",
  "Canada": "ca",
  "Central African Republic": "cf",
  "Chad": "td",
  "Chile": "cl",
  "China": "cn",
  "Colombia": "co",
  "Comoros": "km",
  "Congo Democratic Republic": "cd",
  "Congo Republic": "cg",
  "Costa Rica": "cr",
  "Croatia": "hr",
  "Cuba": "cu",
  "Cyprus": "cy",
  "Czech Republic": "cz",
  "Denmark": "dk",
  "Djibouti": "dj",
  "Dominica": "dm",
  "Dominican Republic": "do",
  "Ecuador": "ec",
  "Egypt": "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  "Eritrea": "er",
  "Estonia": "ee",
  "Eswatini": "sz",
  "Ethiopia": "et",
  "Fiji": "fj",
  "Finland": "fi",
  "France": "fr",
  "Gabon": "ga",
  "Gambia": "gm",
  "Georgia": "ge",
  "Germany": "de",
  "Ghana": "gh",
  "Greece": "gr",
  "Grenada": "gd",
  "Guatemala": "gt",
  "Guinea": "gn",
  "Guinea-Bissau": "gw",
  "Guyana": "gy",
  "Haiti": "ht",
  "Honduras": "hn",
  "Hungary": "hu",
  "Iceland": "is",
  "India": "in",
  "Indonesia": "id",
  "Iran": "ir",
  "Iraq": "iq",
  "Ireland": "ie",
  "Israel": "il",
  "Italy": "it",
  "Jamaica": "jm",
  "Japan": "jp",
  "Jordan": "jo",
  "Kazakhstan": "kz",
  "Kenya": "ke",
  "Kiribati": "ki",
  "Kuwait": "kw",
  "Kyrgyzstan": "kg",
  "Laos": "la",
  "Latvia": "lv",
  "Lebanon": "lb",
  "Lesotho": "ls",
  "Liberia": "lr",
  "Libya": "ly",
  "Liechtenstein": "li",
  "Lithuania": "lt",
  "Luxembourg": "lu",
  "Madagascar": "mg",
  "Malawi": "mw",
  "Malaysia": "my",
  "Maldives": "mv",
  "Mali": "ml",
  "Malta": "mt",
  "Marshall Islands": "mh",
  "Mauritania": "mr",
  "Mauritius": "mu",
  "Mexico": "mx",
  "Micronesia": "fm",
  "Moldova": "md",
  "Monaco": "mc",
  "Mongolia": "mn",
  "Montenegro": "me",
  "Morocco": "ma",
  "Mozambique": "mz",
  "Myanmar": "mm",
  "Namibia": "na",
  "Nauru": "nr",
  "Nepal": "np",
  "Netherlands": "nl",
  "New Zealand": "nz",
  "Nicaragua": "ni",
  "Niger": "ne",
  "Nigeria": "ng",
  "North Korea": "kp",
  "North Macedonia": "mk",
  "Norway": "no",
  "Oman": "om",
  "Pakistan": "pk",
  "Palau": "pw",
  "Palestine": "ps",
  "Panama": "pa",
  "Papua New Guinea": "pg",
  "Paraguay": "py",
  "Peru": "pe",
  "Philippines": "ph",
  "Poland": "pl",
  "Portugal": "pt",
  "Qatar": "qa",
  "Romania": "ro",
  "Russia": "ru",
  "Rwanda": "rw",
  "Saint Kitts and Nevis": "kn",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  "Samoa": "ws",
  "San Marino": "sm",
  "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa",
  "Senegal": "sn",
  "Serbia": "rs",
  "Seychelles": "sc",
  "Sierra Leone": "sl",
  "Singapore": "sg",
  "Slovakia": "sk",
  "Slovenia": "si",
  "Solomon Islands": "sb",
  "Somalia": "so",
  "South Africa": "za",
  "South Korea": "kr",
  "South Sudan": "ss",
  "Spain": "es",
  "Sri Lanka": "lk",
  "Sudan": "sd",
  "Suriname": "sr",
  "Sweden": "se",
  "Switzerland": "ch",
  "Syria": "sy",
  "Taiwan": "tw",
  "Tajikistan": "tj",
  "Tanzania": "tz",
  "Thailand": "th",
  "Timor-Leste": "tl",
  "Togo": "tg",
  "Tonga": "to",
  "Trinidad and Tobago": "tt",
  "Tunisia": "tn",
  "Turkey": "tr",
  "Turkmenistan": "tm",
  "Tuvalu": "tv",
  "Uganda": "ug",
  "Ukraine": "ua",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  "United States": "us",
  "Uruguay": "uy",
  "Uzbekistan": "uz",
  "Vanuatu": "vu",
  "Vatican City": "va",
  "Venezuela": "ve",
  "Vietnam": "vn",
  "Yemen": "ye",
  "Zambia": "zm",
  "Zimbabwe": "zw"
};
var allAthletes;

// ViewModel KnockOut

var vm = function () {
  console.log("ViewModel initiated...");
  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/athletes");
  self.displayName = "Paris2024 Athletes List";
  self.error = ko.observable("");
  self.passingMessage = ko.observable("");
  self.athletes = ko.observableArray([]);
  self.currentPage = ko.observable(1);
  self.pagesize = ko.observable(20);
  self.totalRecords = ko.observable(50);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.birthCountry = ko.observable("");
  self.photo = ko.observable(""); //erro
  self.isShowingFav = ko.observable(false);
  self.orderChoosen = ko.observable(getUrlParameter("order") || "1");
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
  self.orderSubmit = function () {
    $("#sameSearch").val(self.searchParameter());
    $("#ordForm").submit();
  }

  self.setFavorite = function () {
    var ident = this.Id;
    var existingInfo = JSON.parse((localStorage.getItem("fav")) || "[]");
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
      existingInfo = existingInfo.filter(function (athlete) {
      return athlete.Id !== ident;
    });
      $("#" + ident).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
    }
    localStorage.setItem("fav", JSON.stringify(existingInfo));
    console.log(JSON.parse(localStorage.getItem("fav") || "[]"));
  };


  // tirar refreh se der
  self.removeAllFavorites = function () {
    localStorage.removeItem("fav");
    self.isShowingFav(false);
    window.location.reload()

  };
  
  //--- Page Events
  self.activate = function (id) { 
    console.log("CALL: getAthletes...");
    var composedUri =
      self.baseUri() + "?page=" + id + "&pagesize=" + self.pagesize() + "&order=" + self.orderChoosen() + "&search=" + self.searchParameter().trim();
    console.log(composedUri);
    ajaxHelper(composedUri, "GET").done(function (data) {
      console.log(data);
      hideLoading();
      self.athletes(data.Athletes);
      self.currentPage(data.CurrentPage);
      self.hasNext(data.HasNext);
      self.hasPrevious(data.HasPrevious);
      self.pagesize(data.PageSize);
      self.totalPages(data.TotalPages);
      self.totalRecords(data.TotalAhletes);
      self.birthCountry(data.BirthCountry);
      allAthletes = data.Athletes;

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
  console.log("o valor", self.orderChoosen);
  $("#ord").val(self.orderChoosen());
  console.log("agora", $("#ord").val());
  var pg = getUrlParameter("page");
  if (pg == undefined) self.activate(1);
  else {
    self.activate(pg);
  }
  console.log("photo is", self.photo());
  console.log("VM initialized!");
};

ko.bindingHandlers.hoverBackground = {
  init: function (element, valueAccessor) {
    $(element).hover(
      function () {
        var country = $(element).find(".Country").text().trim();
        if (country in countryToCode) {
          $(element).css("background-image", "url('https://flagcdn.com/" + countryToCode[$(element).find(".Country").text().trim()] + ".svg')");
        }
      },
      function () {
        $(element).css("background-image", "none");
      }
    );
  }
};


ko.bindingHandlers.showFavorites = {
  init: function (element, valueAccessor) {
    var value = valueAccessor();
    $(element).click(function () {
      if (value.isShowingFav()) {
        value.athletes(allAthletes);
        value.isShowingFav(false);
        $("#Pag").toggleClass("d-none");
      }
      else {
        let favoritesAthletes = JSON.parse(localStorage.getItem("fav") || "[]");
        value.athletes(favoritesAthletes);
        value.isShowingFav(true);
        $("#Pag").toggleClass("d-none");
      }
    
    });
  }
};

ko.bindingHandlers.favButton = {
  init: function (element, valueAccessor) {
    var existingInfo = JSON.parse(localStorage.getItem("fav") || "[]");
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


