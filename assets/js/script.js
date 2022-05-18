// // Weather Dashboard
// //authored by Charissa Hollister 05/18/2022
// //**************************** */

var cords;
var lat = "";
var lon = "";
var i = 1;
var ii = 0;
var weatherArray = [];

var futureCities;
var LSfutureCities = JSON.parse(localStorage.getItem(futureCities))
if (LSfutureCities) {
    futureCities = LSfutureCities
}else {futureCities = {}}
//var city;
//var currentDate = "05/18/22";


//Get the current date and time with Moment.js for header
const currentDate = moment().format("L"); //current date

var displayCityWeather = function(weatherArray){
    console.log(weatherArray)
        // first set is current day, rest are upcoming forecast
        //create elements and append information
    //current day information
    var c=0;
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
    dayiconEl.setAttribute("src", "https://i.imgur.com/Rnj7kZj.jpeg");
    dayiconEl.setAttribute("height","50px");
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
    for (c;c<weatherArray.length;c++){
// first set is current day, rest are upcoming forecast
        //create elements and append information
    var dayCardEl = document.createElement("div");
    dayCardEl.classList = "col-auto card card-body bg-info";
    document.getElementById("forecast-container").append(dayCardEl);
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
    dayiconEl.setAttribute("src", "https://i.imgur.com/Rnj7kZj.jpeg");
    dayiconEl.setAttribute("height","50px");
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
    // clear out weather array now that it's done 
    //weatherArray = [];
}




// //function to convert city name to lat, lon
var getLocationInfo = function (city,state) {
    // format the api url ////to get lat and lon
      var apiLocUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ","+ state + "US&limit=1&appid=6047a3a93fe5b57d52141da0dff7f508";
          fetch(apiLocUrl)
          .then(function (response) {
              // request was successful
              if (response.ok) {
                  console.log(response)
                  response.json().then(function (data1) {
                      console.log(data1)
                      var nameLoc = data1[0].name;
                      lat = data1[0].lat;
                      lon = data1[0].lon;
                     // var saveforlater = {[nameLoc]:{lat,lon}};
                        futureCities[nameLoc] = {lat,lon}

                      localStorage.setItem("futureCities", JSON.stringify(futureCities));
                      document.getElementById("city-name").textContent = nameLoc;
                      console.log(futureCities)
                      getWeatherLocation(lat,lon);
                      //data1 = [];
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




var getWeatherLocation = function(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=6047a3a93fe5b57d52141da0dff7f508";
    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
                    if (response.ok) {
                        //console.log(response)
                        response.json().then(function (data) {
                            console.log(data)
                            dl=1
                            if(data.daily.length < 11){ dl=data.daily.length}
                            else{dl = 10}
                            for (i=0;i<dl;i++){
                                var weatherDate = moment().add(i, 'd').format("L");
                                var currentTemp = data.daily[i].temp.day;
                                var currentWind = data.daily[i].wind_speed;
                                var currentHum = data.daily[i].humidity;
                                var currentUVI = data.daily[i].uvi;
                                var currentIcon = data.daily[i].weather[ii].icon;
                                var currentIconID = data.daily[i].weather[ii].id;
                                var currentDesc = data.daily[i].weather[ii].description;
                                weatherArray[i] =   {weatherDate,
                                                    currentTemp,
                                                    currentIcon,
                                                    currentIconID,
                                                    currentDesc,
                                                    currentUVI,
                                                    currentHum, 
                                                    currentWind 
                                                    }
                            } displayCityWeather(weatherArray)
                        })
                    } else {
                        alert("Error: city Not Found");}
                })
                    .catch(function (error) {
                    // Notice this `.catch()` getting chained onto the end of the `.then()` method
                    alert("Unable to connect to weather api");
                });
    }

//getWeatherLocation(40.7,-74);
//getLocationInfo("new york", "New York");

//submit city from search box
var buttonClickHandler = function(){
    event.preventDefault();
    ////// add to clear current city data

    //pull in city from input id cityName
    var city = document.querySelector("#cityName").value ;
    var state = document.querySelector("#stateName").value ;
    if(!city || !state){ alert("Must enter a city and state");
    }else {
    console.log(city,state);
    getLocationInfo(city, state);}
}

var SubmitCityBtn = document.getElementById("submitCity");
SubmitCityBtn.addEventListener("click", buttonClickHandler);



//submit city from recently viewed
var buttonClickHandler = function(){
    event.preventDefault();
    ////// add to clear current city data

    //pull in city from input id cityName
    var cityInput = document.querySelector("#cityName");
    var stateInput = document.querySelector("#stateName") ;
    var city = cityInput.value;
    var state = stateInput.value;
    cityInput.value = "";
    stateInput.value = "";
    console.log(city,state);
    getLocationInfo(city, state);
}

var SubmitCityBtn = document.getElementById("submitCity");
SubmitCityBtn.addEventListener("click", buttonClickHandler);


