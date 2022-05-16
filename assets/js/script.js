// // Code Quiz - Javascript
// //authored by Charissa Hollister 05/04/2022
// //**************************** */


// //---------Global variables-----------

// //-----------Code------------

// //---------define functions---------

// //-------overall function to initiate-------

// //-----------Get references from HTML------------

// //---------------Add event listener-----------


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






var displayCityToday = function(data, citySearchTerm, i){
var testCityPlacement = document.querySelector(".card-header-date");
//location being displayed
var place = data.location.name;
// current day weather data 
var currentDate = data.forecast.forecastday[i].date;
var currentIcon = data.forecast.forecastday[i].day.condition.icon;
var currentIconAltText = data.forecast.forecastday[i].day.condition.text;
var currentTemp = data.forecast.forecastday[i].day.avgtemp_f;
var currentHum = data.forecast.forecastday[i].day.avghumidity;
console.log(currentDate, currentHum, currentIcon, currentTemp, currentIconAltText)
};

var displayCityFuture = function(data, citySearchTerm, i){
    var testCityPlacement = document.querySelector(".card-header-date");
    //location being displayed
    var place = data.location.name;
    // current day weather data 
    var currentDate = data.forecast.forecastday[i].date;
    var currentIcon = data.forecast.forecastday[i].day.condition.icon;
    var currentIconAltText = data.forecast.forecastday[i].day.condition.text;
    var currentTemp = data.forecast.forecastday[i].day.avgtemp_f;
    var currentHum = data.forecast.forecastday[i].day.avghumidity;
    console.log(currentDate, currentHum, currentIcon, currentTemp, currentIconAltText)
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
                for (var i = 0; i < data.forecast.forecastday.length; i++){
                    if(i=0){displayCityToday(data, city, i);}
            else{ displayCityFuture(data, city, i);}
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


// //submit button
// userFormEl.addEventListener("submit", formSubmitHandler);

// //display repo content containers
var repoContainerEl = document.querySelector("#repos-container");
var citySearchTerm = document.querySelector("#city-search-term");

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
