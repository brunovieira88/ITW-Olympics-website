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
  
  // ViewModel KnockOut
  var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    
    self.baseUri = ko.observable("http://192.168.160.58/Paris2024/API/athletes");
    self.displayName = "Paris2024 Athletes List";
    self.error = ko.observable("");
    self.passingMessage = ko.observable("");
    self.athleteId = ko.observable("");
    self.name = ko.observable("");
    self.shortName = ko.observable("");
    self.nameTV = ko.observable("");
    self.birthCountry = ko.observable("");
    self.birthDate = ko.observable("");
    self.birthPlace = ko.observable("");
    self.sex = ko.observable("");
    self.photo = ko.observable("");
    self.height = ko.observable("");
    self.weight = ko.observable("");
    self.lang = ko.observable("");
    self.countryCode = ko.observable("");
    self.country = ko.observable("");
    self.nationalityCode = ko.observable("");
    self.residencePlace = ko.observable("");
    self.residenceCountry = ko.observable("");
    self.nickname = ko.observable("");
    self.hobbies = ko.observable("");
    self.occupation = ko.observable("");
    self.education = ko.observable("");
    self.family = ko.observable("");
    self.reason = ko.observable("");
    self.hero = ko.observable("");
    self.athleteFunction = ko.observable("");
    self.influence = ko.observable("");
    self.philosophy = ko.observable("");
    self.sportingRelatives = ko.observable("");
    self.ritual = ko.observable("");
    self.otherSports = ko.observable("");
    self.url = ko.observable("");
    self.birth = ko.observable("");
    self.nameAll = ko.observable("");
    self.medals = ko.observableArray([]);
    self.sports = ko.observableArray([]);
    self.competitions = ko.observableArray([]);
    self.athletesDetails = ko.observableArray([]);

    self.formatDate = function (dateString) {
      if (!dateString) return ''; 
      var date = new Date(dateString);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    self.formattedBirthDate = ko.computed(function() {
      return self.formatDate(self.birthDate());
    });
    self.flagUrl = ko.computed(function() {
        return 'https://flagcdn.com/' + self.countryCode() + '.svg';
    });

    
    //--- Internal functions
    self.activate = function (id) { 
        console.log("CALL: getAthlete by ID...");

        var composedUri = self.baseUri() + "/" + id;
        console.log(composedUri); 
        ajaxHelper(composedUri, "GET").done(function (data) {
            console.log(data);
            hideLoading();
    
            // Set the observables with the returned data
            self.athleteId(data.Id);
            self.nameAll(data.Name);
            self.shortName(data.NameShort);
            self.nameTV(data.NameTV);
            self.birthCountry(data.BirthCountry);
            self.birthDate(data.BirthDate);
            self.birthPlace(data.BirthPlace);
            self.sex(data.Sex);
            self.photo(data.Photo);
            self.height(data.Height);
            self.weight(data.Weight);
            self.lang(data.Lang);
            self.athleteFunction(data.Function);
            self.country(data.Country);
            self.countryCode(countryToCode[self.country()]);
            self.nationalityCode(data.Nationality_code);
            self.residencePlace(data.Residence_place);
            self.residenceCountry(data.Residence_country);
            self.nickname(data.Nickname);
            self.hobbies(data.Hobbies);
            self.occupation(data.Occupation);
            self.education(data.Education);
            self.family(data.Family);
            self.reason(data.Reason);
            self.hero(data.Hero);
            self.influence(data.Influence);
            self.philosophy(data.Philosophy);
            self.sportingRelatives(data.SportingRelatives);
            self.ritual(data.Ritual);
            self.otherSports(data.OtherSports);
            self.url(data.Url);
            self.name(self.nameAll() + (self.nickname() !== null ? ", aka, " + self.nickname() : ""));
            self.birth(self.birthCountry() + ', ' + self.birthPlace());
            self.medals(data.Medals); 
            console.log(self.medals());
            self.sports(data.Sports); 
            self.competitions(data.Competitions);
            self.athletesDetails([
              { label: 'Height', value: self.height() }, // Replace with actual observables or data bindings
              { label: 'Weight', value: self.weight() },
              { label: 'Lang', value: self.lang() },
              { label: 'Country', value: self.country() },
              { label: 'Nacionality Code', value: self.nationalityCode() },
              { label: 'Residence Place', value: self.residencePlace() },
              { label: 'Residence Country', value: self.residenceCountry() },
              { label: 'Hobbies', value: self.hobbies() },
              { label: 'Occupation', value: self.occupation() },
              { label: 'Education', value: self.education() },
              { label: 'Family', value: self.family() },
              { label: 'Reason', value: self.reason() },
              { label: 'Hero', value: self.hero() },
              { label: 'Influence', value: self.influence() },
              { label: 'Philosophy', value: self.philosophy() },
              { label: 'Sporting Relatives', value: self.sportingRelatives() },
              { label: 'Ritual', value: self.ritual() },
              { label: 'Other Sports', value: self.otherSports() },
              { label: 'More info', value: self.url() }
            ]);
            console.log(self.athletesDetails());
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
    var AtheId = getUrlParameter("id");
    console.log(AtheId);
    if (AtheId == undefined) {
        console.error("No athlete ID provided in the URL.");
        self.error("No athlete ID provided.");
        hideLoading();
    }
    else {
      self.activate(AtheId);
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
  