// // Weather Dashboard
// //authored by Charissa Hollister 05/18/2022
// //**************************** */

var cords;
var lat;
var lon;
var i = 1;
var ii = 0;
var weatherArray = [];

var futureCities;
var LSfutureCities = JSON.parse(localStorage.getItem(futureCities))
if (LSfutureCities) {
    futureCities = LSfutureCities
}else {futureCities = []}
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
    //icon add to city header
    // var dayiconEl = document.createElement("img");
    // dayiconEl.classList = "day-image";
    // dayiconEl.setAttribute("src", "https://i.imgur.com/Rnj7kZj.jpeg");
    // dayiconEl.setAttribute("height","50px");
    // dayiconEl.setAttribute("alt", weatherArray[c].currentDesc);
    // document.getElementById("day-header").append(dayiconEl);

    //card
    var dayCardEl = document.createElement("div");
    dayCardEl.classList = "col-auto card card-body";
    document.getElementById("day1container").append(dayCardEl);
    //header
    var dayheaderEl = document.createElement("h5");
    dayheaderEl.innerHTML = currentDate;
    dayheaderEl.classList = "card-header card-header-date";
    dayCardEl.append(dayheaderEl);
    var dayheaderspanEl = document.createElement("span");
    dayheaderspanEl.innerHTML = weatherArray[c].currentDesc;
    dayheaderspanEl.classList = "card-header-desc";
    dayheaderEl.append(dayheaderspanEl);
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
      var apiLocUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ","+ state + "US&limit=5&appid=6047a3a93fe5b57d52141da0dff7f508";
          fetch(apiLocUrl)
          .then(function (response) {
              // request was successful
              if (response.ok) {
                  console.log(response)
                  response.json().then(function (data1) {
                      console.log(data1)
                    //   if(data1.length>1){
                    //       for (var co=0;co<data1.length;co++){
                    //       var cityOptions = data1.state[co]}
                    //   let whichCity = window.prompt("Which city would you like to see?");
                    //   var cp = (whichCity).selectmenu(cityOptions);
                    //   var nameLoc = data1[cp].name;
                    //   lat = data1[cp].lat;
                    //   lon = data1[cp].lon;
                    //                           }
                    //                           else{
                      var nameLoc = data1[0].name;
                      lat = data1[0].lat;
                      lon = data1[0].lon;
                    // }
                      var saveforlater = {nameLoc, lat,lon};
                      console.log(saveforlater);
                      futureCities.unshift(saveforlater);
                      futureCities.push(saveforlater);
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
          alert("Unable to connect to weather api");
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
        
                                //var place = data.location.name;
                                //var currentDate = "today"; //get using moment
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
                                                    //console.log(weatherArray[1])
                                //data = []
                                // if(i=0){displayCityToday(data, i);}
                                // else{ displayCityFuture(weatherArray);}
                                
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
getLocationInfo("New York", "New York");

//submit city from search box
// var buttonClickHandler = function(){
//     // event.preventDefault();

//     //// add to clear current city data


//     //pull in city from input id cityName
//     var nameInputEl = document.querySelector("#cityName")
//     var city = nameInputEl.value.trim();
//     city =  "New York"
//     //add state to city name
//     state = "New York"
//     getLocationInfo(city, state);
// }

// var SubmitCityBtn = document.getElementById("submitCity");
// SubmitCityBtn.addEventListener("click", buttonClickHandler);



//submit city from recently viewed



