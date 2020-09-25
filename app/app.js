console.log('This is the weather app');

const notificationElement = document.querySelector(".notification");
const timeElement = document.querySelector(".date-day");
const locationElement = document.querySelector(".location");
var tempElement = document.querySelector(".weather-temp");
const descElement = document.querySelector(".weather-desc");




// app data
const weather = {};
weather.temperature ={
    unit: "celsius"
}

const KELVIN = 273;

const key = "ea9e00108abe56e6692c79e98ce28a45";


if('geolocation' in navigator ){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML ="<p>Boowser does not support geolocation</p>";
}

// set users position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);

};


function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML =`<p>${error.message}</p>`;
}

function getWeather(latitude, longitude){
let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

fetch(api).then(function(response){
  let data = response.json();
  return data;
})
.then(function(data){
  weather.temperature.value = Math.floor(data.main.temp - KELVIN);
  weather.description = data.weather[0].description;
  weather.city = data.name;
  weather.country = data.sys.country;
  weather.timezone = data.timezone;
})
.then(function(){
  displayWeather();
});
} 


function displayWeather(){
  timeElement.innerHTML = weather.timezone;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  descElement.innerHTML = weather.description;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  
}
  
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

tempElement.addEventListener('click', function(){
  if(weather.temperature.value === undefined) return;

  if(weather.temperature.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius";
  }
  
}); 