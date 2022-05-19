// // Weather Dashboard
// //authored by Charissa Hollister 05/18/2022
// //**************************** */

////issues
//local storage overwrites after refresh then submit (line 252 and 166 nd 19???)
//prev city history doesn't display on refresh/onload (line 268)

var cords;
var lat = "";
var lon = "";
var i = 1;
var ii = 0;
var weatherArray = [];
var pcContainer = document.querySelector("#city-buttons");

var futureCities;
var LSfutureCities = JSON.parse(localStorage.getItem(futureCities));
if (LSfutureCities) {
  futureCities = LSfutureCities;
} else {
  futureCities = [];
}

//Get the current date and time with Moment.js for header
const currentDate = moment().format("L"); //current date

var displayCityWeather = function (weatherArray) {
  //current day information
  var c = 0;
  //card
  var dayCardEl = document.createElement("div");
  dayCardEl.classList = "col-auto card card-body";
  var container = document.getElementById("day1container");
  container.innerHTML = "";
  container.append(dayCardEl);

  //header
  var dayheaderEl = document.createElement("h5");
  dayheaderEl.innerHTML = currentDate;
  dayheaderEl.classList = "card-header card-header-date";
  dayCardEl.append(dayheaderEl);
  var dayheaderspanEl = document.createElement("span");
  dayheaderspanEl.innerHTML = weatherArray[c].currentDesc;
  dayheaderspanEl.classList = "card-header-desc";
  dayheaderEl.append(dayheaderspanEl);
  //card info area
  var cardinfo = document.createElement("div");
  cardinfo.classList = "card-info-body";
  dayCardEl.append(cardinfo);
  //icon
  var dayiconEl = document.createElement("img");
  dayiconEl.classList = "card-info";
  console.log(weatherArray[c].currentIconID);
  dayiconEl.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      weatherArray[c].currentIcon +
      "@2x.png"
  );
  dayiconEl.setAttribute("height", "50px");
  dayiconEl.setAttribute("alt", weatherArray[c].currentDesc);
  cardinfo.append(dayiconEl);
  //temp
  var daytempEl = document.createElement("p");
  daytempEl.innerHTML = "Temperature: " + weatherArray[c].currentTemp + " °F";
  daytempEl.classList = "card-info";
  dayCardEl.append(daytempEl);
  //humidity
  var dayhumEl = document.createElement("p");
  dayhumEl.innerHTML = "Humidity: " + weatherArray[c].currentHum + " %";
  dayhumEl.classList = "card-info";
  dayCardEl.append(dayhumEl);
  //uv index
  var dayuviEl = document.createElement("p");
  dayuviEl.innerHTML = "UV Index: " + weatherArray[c].currentUVI;
  dayuviEl.classList = "card-info";
  dayCardEl.append(dayuviEl);
  //wind
  var daywindEl = document.createElement("p");
  daywindEl.innerHTML = "Wind Speed: " + weatherArray[c].currentWind;
  daywindEl.classList = "card-info";
  dayCardEl.append(daywindEl);

  // //// for c to weatherArray.length...
  c++;
  var container2 = document.getElementById("forecast-container");
  container2.innerHTML = "";
  for (c; c < weatherArray.length; c++) {
    // first set is current day, rest are upcoming forecast
    //create elements and append information
    var dayCardEl = document.createElement("div");
    dayCardEl.classList = "col-auto card card-body bg-info";
    container2.append(dayCardEl);
    //header
    var dayheaderEl = document.createElement("h5");
    dayheaderEl.innerHTML = weatherArray[c].weatherDate;
    dayheaderEl.classList = "future-card-header card-header card-header-date";
    dayCardEl.append(dayheaderEl);
    var dayheaderspanEl = document.createElement("span");
    dayheaderspanEl.innerHTML = weatherArray[c].currentDesc;
    dayheaderspanEl.classList = "future-card-header card-header-desc";
    dayCardEl.append(dayheaderspanEl);
    //card info area
    var cardinfo = document.createElement("div");
    cardinfo.classList = "card-info-body";
    dayCardEl.append(cardinfo);
    //icon
    var dayiconEl = document.createElement("img");
    dayiconEl.classList = "card-info";
    var s = weatherArray[c].currentIcon;
    dayiconEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + s + "@2x.png"
    );
    dayiconEl.setAttribute("height", "50px");
    dayiconEl.setAttribute("alt", weatherArray[c].currentDesc);
    cardinfo.append(dayiconEl);
    //temp
    var daytempEl = document.createElement("p");
    daytempEl.innerHTML = "Temperature: " + weatherArray[c].currentTemp + " °F";
    daytempEl.classList = "card-info";
    cardinfo.append(daytempEl);
    //humidity
    var dayhumEl = document.createElement("p");
    dayhumEl.innerHTML = "Humidity: " + weatherArray[c].currentHum + " %";
    dayhumEl.classList = "card-info";
    cardinfo.append(dayhumEl);
    //uv index
    var dayuviEl = document.createElement("p");
    dayuviEl.innerHTML = "UV Index: " + weatherArray[c].currentUVI;
    dayuviEl.classList = "card-info";
    cardinfo.append(dayuviEl);
    //wind
    var daywindEl = document.createElement("p");
    daywindEl.innerHTML = "Wind Speed: " + weatherArray[c].currentWind;
    daywindEl.classList = "card-info";
    cardinfo.append(daywindEl);
  }

  displayPrevCityButtons();
};

// //function to convert city name to lat, lon
var getLocationInfo = function (city, state) {
  // format the api url ////to get lat and lon
  var apiLocUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "," +
    state +
    "US&limit=1&appid=6047a3a93fe5b57d52141da0dff7f508";
  fetch(apiLocUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data1) {
          //console.log(data1);
          var nameLoc = data1[0].name;
          lat = data1[0].lat;
          lon = data1[0].lon;
          var saveforlater = { nameLoc, lat, lon };
          futureCities.push(saveforlater);
          /////stop refresh from clearing storage
          localStorage.setItem("futureCities", JSON.stringify(futureCities));
          document.getElementById("city-name").textContent = nameLoc;
          console.log(futureCities);
          getWeatherLocation(lat, lon);
        });
      } else {
        alert("Error: city Not Found");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("city Not Found or Unable to connect to weather api");
    });
};

var getWeatherLocation = function (lat, lon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=hourly,minutely&appid=6047a3a93fe5b57d52141da0dff7f508";
  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        //console.log(response)
        response.json().then(function (data) {
          console.log(data);
          dl = 1;
          if (data.daily.length < 11) {
            dl = data.daily.length;
          } else {
            dl = 10;
          }
          // clear out weather array now that it's done
          weatherArray = [];
          for (i = 0; i < dl; i++) {
            var weatherDate = moment().add(i, "d").format("L");
            var currentTemp = data.daily[i].temp.day;
            var currentWind = data.daily[i].wind_speed;
            var currentHum = data.daily[i].humidity;
            var currentUVI = data.daily[i].uvi;
            var currentIcon = data.daily[i].weather[ii].icon;
            var currentIconID = data.daily[i].weather[ii].id;
            var currentDesc = data.daily[i].weather[ii].description;
            weatherArray[i] = {
              weatherDate,
              currentTemp,
              currentIcon,
              currentIconID,
              currentDesc,
              currentUVI,
              currentHum,
              currentWind,
            };
          }
          displayCityWeather(weatherArray);
        });
      } else {
        alert("Error: city Not Found");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to weather api");
    });
};

//submit city from search box
var buttonClickHandler = function () {
  event.preventDefault();
  var cityInput = document.querySelector("#cityName");
  var stateInput = document.querySelector("#stateName");
  var city = cityInput.value;
  var state = stateInput.value;
  cityInput.value = "";
  stateInput.value = "";
  if (!city || !state) {
    alert("Must enter a city and state");
  } else {
    getLocationInfo(city, state);
  }
};

var SubmitCityBtn = document.getElementById("submitCity");
SubmitCityBtn.addEventListener("click", buttonClickHandler);

//display previous cities based on local storage

var displayPrevCityButtons = function () {
  pcContainer.innerHTML = "";
  for (var w = 0; w < futureCities.length; w++) {
    var prevCityEl = document.createElement("button");
    prevCityEl.innerHTML = futureCities[w].nameLoc;
    prevCityEl.classList = "btn prevCity";
    prevCityEl.setAttribute("id", w);
    console.log(prevCityEl);
    pcContainer.append(prevCityEl);
  }
};
////////why isn't it loading on refresh?????
displayPrevCityButtons();

// //clicked a previous city button
pcContainer.addEventListener("click", function (event) {
  lat = "";
  lon = "";
  q = [event.target.id];
  q = parseInt(q);
  Cname = futureCities[q].nameLoc;
  var nameHeader = document.getElementById("city-name");
  nameHeader.textContent = Cname;
  lat = futureCities[q].lat;
  lon = futureCities[q].lon;
  console.log(q, Cname, lat, lon);
  getWeatherLocation(lat, lon);
});
