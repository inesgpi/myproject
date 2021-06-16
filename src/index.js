let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};
function CtoF(tempC) {
  return (tempC * 9) / 5 + 32;
}
function FtoC(tempF) {
  return (5 * (tempF - 32)) / 9;
}

function updateCity(city) {
  updateCityName(city);
  getCurrentWeather(city);
}
function updateCityName(cityName) {
  let pCityName = document.querySelector("#city-name");
  pCityName.innerHTML = cityName;
}

// Initialize app
let currentUnit = "c";
updateCity("Lisboa");

let now = new Date();
let pDate = document.querySelector("#selector-date");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

pDate.innerHTML = `${day}, ${date}, ${hours}:${minutes}`;

function getCurrentWeather(city) {
  let apiKey = "3877b33aa48fa9de5377a5315e2ac035";
  let unit;
  if (currentUnit === "c") {
    unit = "metric";
  } else {
    unit = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  function handler(response) {
    console.log(response);
    let temp = response.data.main.temp;
    updateWeather(temp);
  }

  axios.get(apiUrl).then(handler);
}

function updateWeather(temp) {
  let spanTempVal = document.querySelector("#current-temp-val");
  let value = Math.round(temp);
  spanTempVal.innerHTML = value;
}

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");

  updateCity(searchInput.value);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

let btnRadioC = document.querySelector("#btnRadioC");
let btnRadioF = document.querySelector("#btnRadioF");

function changeToC(event) {
  currentUnit = "c";
  let spanDegrees = document.querySelector("#current-temp-deg");
  spanDegrees.innerHTML = "ºC";

  let spanTempVal = document.querySelector("#current-temp-val");
  let value = parseInt(spanTempVal.innerHTML);

  let valueC = Math.round(FtoC(value));

  spanTempVal.innerHTML = valueC;
}

function changeToF(event) {
  currentUnit = "f";
  let spanDegrees = document.querySelector("#current-temp-deg");
  spanDegrees.innerHTML = "ºF";

  let spanTempVal = document.querySelector("#current-temp-val");
  let value = parseInt(spanTempVal.innerHTML);
  let valueF = Math.round(CtoF(value));

  spanTempVal.innerHTML = valueF;
}
btnRadioC.addEventListener("change", changeToC);
btnRadioF.addEventListener("change", changeToF);

function getGeoLocation(event) {
  console.log("CLICK!");
  //console.log(event);
  navigator.geolocation.getCurrentPosition(getWeatherForLocation);
}

function getWeatherForLocation(position) {
  let apiKey = "3877b33aa48fa9de5377a5315e2ac035";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit;
  if (currentUnit === "c") {
    unit = "metric";
  } else {
    unit = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  function handler(response) {
    console.log(response);
    let temp = response.data.main.temp;
    let cityName = response.data.name;
    updateWeather(temp);
    updateCityName(cityName);
  }
  axios.get(apiUrl).then(handler);
}

let btnGeoLocation = document.querySelector("#btn-geo-location");

btnGeoLocation.addEventListener("click", getGeoLocation);
