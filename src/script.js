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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let celcius = document.querySelector("#celcius-temp");
  celcius.innerHTML = temperature;
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

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#celcius-temp").innerHTML;
  let fahr = (temp * 9) / 5 + 32;
  document.querySelector("#celcius-temp").innerHTML = Math.round(fahr);
}

let temperature = document.querySelector("#celcius-temp").innerHTML;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  document.querySelector("#celcius-temp").innerHTML = temperature;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

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

    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(showCurrentCity);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);
