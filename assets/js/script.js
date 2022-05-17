// // Code Quiz - Javascript
// //authored by Charissa Hollister 05/04/2022
// //**************************** */


// //---------Global variables-----------

// //-----------Code------------

// //---------define functions---------

// //-------overall function to initiate-------

// //-----------Get references from HTML------------

// //---------------Add event listener-----------

// //display repo content containers
var currentContainerEl = document.querySelector(".day1container");
var futureContainerEl = document.querySelector(".futureContainer");

var citySearchTerm = document.querySelector("#city-search-term");
var city = citySearchTerm;
var currentDayDate = document.querySelector("#day1date");
var currentDayInfo = document.querySelector("#day1Info");

// container is futuredayInfo for 5 day forecast section
var futureContainer = document.querySelector(".futureContainer")
/////clear out cards before displaying for a new city

var displayCityToday = function(data, i){
//location being displayed
var place = data.location.name;
// current day weather data 
var currentDate = data.forecast.forecastday[i].date;
var currentIcon = data.forecast.forecastday[i].day.condition.icon;
var currentIconAltText = data.forecast.forecastday[i].day.condition.text;
var currentTemp = data.forecast.forecastday[i].day.avgtemp_f;
var currentWind = data.forecast.forecastday[i].day.maxwind_mpph;
var currentHum = data.forecast.forecastday[i].day.avghumidity;
//console.log(place, currentDate, currentHum, currentWind, currentIcon, currentTemp, currentIconAltText)
};

var displayCityFuture = function(data, i){
     // clear old content
 futureContainerEl.textContent = "";
 citySearchTerm.textContent = "";
    //location being displayed
    var place = data.location.name;
    // current day weather data 
    var currentDate = data.forecast.forecastday[i].date;
    var currentIcon = data.forecast.forecastday[i].day.condition.icon;
    var currentIconAltText = data.forecast.forecastday[i].day.condition.text;
    var currentTemp = data.forecast.forecastday[i].day.avgtemp_f;
    var currentWind = data.forecast.forecastday[i].day.maxwind_mpph;
    var currentHum = data.forecast.forecastday[i].day.avghumidity;
    //console.log(currentDate, currentHum, currentIcon, currentTemp, currentIconAltText)
    
//create: <div class="col-auto card card-body bg-info"></div>
var dayCardEl = document.createElement("div");
dayCardEl.classList = "col-auto card card-body bg-info";
//create: <h5 class="card-header-date" id="day2date"></h5>
var daydateEl = document.createElement("h5");
daydateEl.classList = "card-header-date";
//create: <div class="card-body" id="dayInfo"></div>
var dayCardBodyEl = document.createElement("div");
dayCardBodyEl.classList = "card-body";
//create: <p class="infoLines"></p>
var dayTempEl = document.createElement("p");
dayTempEl.classList = "card-info";
var dayIconEl = document.createElement("p");
dayIconEl.classList = "card-info";
//dayIconEl.setAttribute("href", "alt:'currentIconAltText'");
var dayWindEl = document.createElement("p");
dayWindEl.classList = "card-info";
var dayHumEl = document.createElement("p");
dayHumEl.classList = "card-info";


//create card blocks
futureContainer.appendChild(dayCardEl);
dayCardEl.appendChild(daydateEl);
dayCardEl.appendChild(dayCardBodyEl);
dayCardBodyEl.appendChild(dayTempEl);
dayCardBodyEl.appendChild(dayIconEl);
dayCardBodyEl.appendChild(dayWindEl);
dayCardBodyEl.appendChild(dayHumEl);

//fill in card information
daydateEl.textContent = "date"
dayTempEl.textContent = "temp"
dayIconEl.textContent = "icon"
dayWindEl.textContent = "wind"
dayHumEl.textContent = "hum"


};

// //function to get city info
var getLocationInfo = function (city) {
  // format the api url
    var apiUrl = "http://api.weatherapi.com/v1/forecast.json?key=55eec00c163d4c31961194524221605&q=" + city +"&days=10&aqi=no&alerts=yes";
    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data)
                    for (var i = 1; i < data.forecast.forecastday.length; i++){
                        if(i=0){displayCityToday(data, i);}
                        else{ displayCityFuture(data, i);

                        }
            } });
            } else {
                alert("Error: city Not Found");
            }
        })
        .catch(function (error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to weather api");
        });
};

getLocationInfo("New York");






                    //  var card = `<div class="col-auto card card-body bg-info " id="day2">
                    //     <h5 class="card-header-date" id="daydate">${data.forecast.forecastday[i].date}</h5>
                    //     <div class="card-body" id="dayInfo">
                    //     </div>
                    //     </div>`
                    //     futureContainer.innerHTML = card;
//     var dayTempEl = document.createElement("p");
//     dayTempEl.classList = "card-info flex-row justify-space-between align-center";

//     dayTempEl.textContent = currentTemp;

// futuredayInfo.appendChild(dayTempEl)


    // var futuredayDate = document.querySelector("#day" + i +"date");
    // var futuredayInfo = document.querySelector("#day" + i +"Info");
    // futuredayDate.textContent = currentDate;



                            
                            
// ${data.forecast.forecastday[i].date}
// //display user repos
// var displayRepos = function (data, i) {
//   console.log(repos);
//   console.log(searchTerm);
//   // clear old content
//   repoContainerEl.textContent = "";
//   repoSearchTerm.textContent = searchTerm;
//   // check if api returned any repos
//   if (repos.length === 0) {
//     repoContainerEl.textContent = "No repositories found.";
//     return;
//   }
//   // loop over repos
//   for (var i = 0; i < repos.length; i++) {
//     // format repo name
//     var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    // create a link for each repo
    // var repoEl = document.createElement("a");
    // repoEl.classList = "list-item flex-row justify-space-between align-center";
    // repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // // create a span element to hold repository name
    // var titleEl = document.createElement("span");
    // titleEl.textContent = repoName;

    // // append to container
    // repoEl.appendChild(titleEl);

    // // create a status element
    // var statusEl = document.createElement("span");
    // statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" +
//         repos[i].open_issues_count +
//         " issue(s)";
//     } else {
//       statusEl.innerHTML =
//         "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     // append to container
//     repoEl.appendChild(statusEl);

//     // append container to the dom
//     repoContainerEl.appendChild(repoEl);
//   }
// };


// //////from git er done assignment
// //form variables
// var userFormEl = document.querySelector("#user-form");
// var nameInputEl = document.querySelector("#username");

// //form submission function
// var formSubmitHandler = function (event) {
//   event.preventDefault();
//   // get value from input element
//   var username = nameInputEl.value.trim();

//   if (username) {
//     getUserRepos(username);
//     nameInputEl.value = "";
//   } else {
//     alert("Please enter a GitHub username");
//   }
//   console.log(event);
// };
//////add recent searches from local storage to the city buttons
/* <div id="city-buttons" class="card-body">
<button class="btn" data="data-city1">New York</button>
<!-- add search history cities  --> */



// //submit button
// userFormEl.addEventListener("submit", formSubmitHandler);



// //display user repos
// var displayRepos = function (repos, searchTerm) {
//   console.log(repos);
//   console.log(searchTerm);
//   // clear old content
//   repoContainerEl.textContent = "";
//   repoSearchTerm.textContent = searchTerm;
//   // check if api returned any repos
//   if (repos.length === 0) {
//     repoContainerEl.textContent = "No repositories found.";
//     return;
//   }
//   // loop over repos
//   for (var i = 0; i < repos.length; i++) {
//     // format repo name
//     var repoName = repos[i].owner.login + "/" + repos[i].name;

//     // create a container for each repo
//     // create a link for each repo
//     var repoEl = document.createElement("a");
//     repoEl.classList = "list-item flex-row justify-space-between align-center";
//     repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

//     // create a span element to hold repository name
//     var titleEl = document.createElement("span");
//     titleEl.textContent = repoName;

//     // append to container
//     repoEl.appendChild(titleEl);

//     // create a status element
//     var statusEl = document.createElement("span");
//     statusEl.classList = "flex-row align-center";

//     // check if current repo has issues or not
//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" +
//         repos[i].open_issues_count +
//         " issue(s)";
//     } else {
//       statusEl.innerHTML =
//         "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     // append to container
//     repoEl.appendChild(statusEl);

//     // append container to the dom
//     repoContainerEl.appendChild(repoEl);
//   }
// };

// var getFeaturedCity = function(language) {
//     var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
//     fetch(apiUrl).then(function(response) {
//       if (response.ok) {
//         response.json().then(function(data) {
//           displayRepos(data.items, language);
//         });
//       } else {
//         alert('Error: City Weather Not Found');
//       }
//     });
//   };

//   var cityButtonsE1 = document.querySelector("#city-buttons");

//   var buttonClickHandler = function(event){
//       var defaultCity = event.target.getAttribute("data-city");
//       console.log(defaultCity);
//       if (defaultCity) {
//         getFeaturedCity(defaultCity);
      
//         // clear old content
//         repoContainerEl.textContent = "";
//       }

//   }
//   vityButtonsE1.addEventListener("click", buttonClickHandler);
