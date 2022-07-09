let apiKey = "907907672178e58fe9f5148a143803fc";

let imgArray = [
  { imgCode: "01d", imgAddress: "images/01d.png" },
  { imgCode: "01n", imgAddress: "images/01n.png" },
  { imgCode: "02d", imgAddress: "images/02d.png" },
  { imgCode: "02n", imgAddress: "images/02n.png" },
  { imgCode: "03d", imgAddress: "images/03.png" },
  { imgCode: "03n", imgAddress: "images/03.png" },
  { imgCode: "04d", imgAddress: "images/03.png" },
  { imgCode: "04n", imgAddress: "images/03.png" },
  { imgCode: "09d", imgAddress: "images/09.png" },
  { imgCode: "09n", imgAddress: "images/09.png" },
  { imgCode: "10d", imgAddress: "images/10d.png" },
  { imgCode: "10n", imgAddress: "images/10n.png" },
  { imgCode: "11d", imgAddress: "images/11.png" },
  { imgCode: "11n", imgAddress: "images/11.png" },
  { imgCode: "13d", imgAddress: "images/13.png" },
  { imgCode: "13n", imgAddress: "images/13.png" },
  { imgCode: "50d", imgAddress: "images/50d.png" },
  { imgCode: "50n", imgAddress: "images/50n.png" },
];

function showTime(timestamp) {
  let date = new Date(timestamp);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

function showMainIcon(response) {
  let weatherIcon = response.data.weather[0].icon;
  let weatherDescription = response.data.weather[0].description;
  for (let i = 0; i < imgArray.length; ++i) {
    if (imgArray[i].imgCode == weatherIcon) {
      let image = document.querySelector("#img-big");
      image.setAttribute("src", imgArray[i].imgAddress);
      image.setAttribute("alt", weatherDescription);
    }
  }
}

function showForecastIcon(response) {
  let weatherIcon = response.weather[0].icon;
  let alt = response.weather[0].description;
  for (let i = 0; i < imgArray.length; ++i) {
    if (imgArray[i].imgCode == weatherIcon) {
      let src = imgArray[i].imgAddress;
      return { src, alt };
    }
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-container");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `
  <div class="col-2 forecast-day-wrapper">
    <h5 class="forecast-day">${formatDay(forecastDay.dt)}</h5>
    <div class="img-container">
      <img class="forecast-icon" src=${
        showForecastIcon(forecastDay).src
      } alt="${showForecastIcon(forecastDay).alt}" />
    </div>
    <div class="forecast-temp">
      <span class="forecast-max-temp">${Math.round(
        forecastDay.temp.max
      )}°</span>
      <span class="forecast-min-temp">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  let temperature = Math.round(response.data.main.temp);
  let celsius = document.querySelector("#celsius-temp");
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind-speed");
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  let pressure = response.data.main.pressure;
  let press = document.querySelector("#pressure");
  let weather = document.querySelector("#weather-description");
  let toggleCelsius = document.querySelector("#toggle-a");
  let weatherDescription = response.data.weather[0].description;

  currentCity.innerHTML = response.data.name;

  celsius.innerHTML = `${temperature}°`;
  if (windSpeed >= 1) {
    windSpeed = Math.round(windSpeed);
  } else {
    windSpeed = windSpeed.toFixed(1);
  }
  wind.innerHTML = ` ${windSpeed}`;
  humid.innerHTML = ` ${humidity}`;
  press.innerHTML = ` ${pressure}`;
  weather.innerHTML = weatherDescription;
  toggleCelsius.checked = true;

  let date = new Date();
  let userTimeDifference = date.getTimezoneOffset() * 60000;
  let utc0Timestamp = date.getTime() + userTimeDifference;
  let timezone = response.data.timezone * 1000;
  let cityTime = utc0Timestamp + timezone;
  showTime(cityTime);

  celsTemperature = response.data.main.temp;

  getForecast(response.data.coord);

  showMainIcon(response);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value.trim();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then(showWeather)
    .catch(() => {
      document.querySelector("#current-city").innerHTML =
        "Is it a real city, huh?";
    });
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#celsius-temp");
  let fahr = (celsTemperature * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fahr)}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#celsius-temp");
  temp.innerHTML = `${Math.round(celsTemperature)}°`;
}

function showCurrentCity(response) {
  console.log(response);
  let currentLocation = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = currentLocation;
}

function getCurrentLocation(event) {
  event.preventDefault();
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showCurrentCity);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

function showDefaultCity(event) {
  event.preventDefault();
  let id = String(event.target.id);
  let currentCity = document.querySelector("#current-city");
  defaultCity = document.getElementById(id).innerHTML;
  currentCity.innerHTML = defaultCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function search(city) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
let units = "metric";

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsTemperature = null;

let fahrenheit = document.querySelector("#toggle-b");
fahrenheit.addEventListener("change", convertToFahrenheit);

let celsius = document.querySelector("#toggle-a");
celsius.addEventListener("change", convertToCelsius);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

let defaultCity = document.querySelectorAll(".city-link");
for (let i = 0; i < defaultCity.length; ++i) {
  let city = defaultCity.item(i);
  city.addEventListener("click", showDefaultCity);
}

search("Berlin");
