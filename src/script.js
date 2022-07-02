let apiKey = "907907672178e58fe9f5148a143803fc";

function showTime(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let time = document.querySelector("#date-time");
  time.innerHTML = `${days[day]}, ${hour}:${minutes}`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let celcius = document.querySelector("#celcius-temp");
  celcius.innerHTML = `${temperature}°`;
  let windSpeed = response.data.wind.speed;
  if (windSpeed >= 1) {
    windSpeed = Math.round(windSpeed);
  } else {
    windSpeed = windSpeed.toFixed(1);
  }
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = ` ${windSpeed}`;
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = ` ${humidity}`;
  let pressure = response.data.main.pressure;
  let press = document.querySelector("#pressure");
  press.innerHTML = ` ${pressure}`;
  let weatherDescription = response.data.weather[0].description;
  let weatherArray = weatherDescription.split(" ");
  weatherCapitalized = `${weatherArray[0]
    .charAt(0)
    .toUpperCase()}${weatherArray[0].slice(1)} ${weatherArray[1]}`;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = weatherCapitalized;

  cels_temperature = response.data.main.temp;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value.trim();
  let currentCity = document.querySelector("#current-city");
  let cityArray = city.split(" ");
  cityArray.forEach(function capitalizeCity(word, i, capitalizedWord) {
    capitalizedWord[i] = word[0].toUpperCase() + word.substr(1).toLowerCase();
  });
  currentCity.innerHTML = cityArray.join(" ");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#celcius-temp");
  let fahr = (cels_temperature * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fahr)}°`;
}

let cels_temperature = null;

let fahrenheit = document.querySelector("#toggle-b");
fahrenheit.addEventListener("change", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#celcius-temp");
  temp.innerHTML = `${Math.round(cels_temperature)}°`;
}

let celcius = document.querySelector("#toggle-a");
celcius.addEventListener("change", convertToCelcius);

let currentDate = new Date();
showTime(currentDate);

function showCurrentCity(response) {
  let currentLocation = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = currentLocation;
}

function getCurrentLocation(event) {
  event.preventDefault();
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showCurrentCity);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

function showDefaultCity(event) {
  event.preventDefault();
  let id = String(event.target.id);
  let currentCity = document.querySelector("#current-city");
  defaultCity = document.getElementById(id).innerHTML;
  currentCity.innerHTML = defaultCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let defaultCity = document.querySelectorAll(".city-link");
for (let i = 0; i < defaultCity.length; ++i) {
  let city = defaultCity.item(i);
  city.addEventListener("click", showDefaultCity);
}
