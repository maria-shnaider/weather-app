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
  let celsius = document.querySelector("#celsius-temp");
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind-speed");
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  let pressure = response.data.main.pressure;
  let press = document.querySelector("#pressure");
  let weatherDescription = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  let weatherIcon = response.data.weather[0].icon;
  let toggleCelsius = document.querySelector("#toggle-a");

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

  for (let i = 0; i < imgArray.length; ++i) {
    if (imgArray[i].imgCode == weatherIcon) {
      let image = document.querySelector("#img-big");
      image.setAttribute("src", imgArray[i].imgAddress);
      image.setAttribute("alt", weatherDescription);
    }
  }

  celsTemperature = response.data.main.temp;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value.trim();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
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

function showDefaultCity(event) {
  event.preventDefault();
  let id = String(event.target.id);
  let currentCity = document.querySelector("#current-city");
  defaultCity = document.getElementById(id).innerHTML;
  currentCity.innerHTML = defaultCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function search(city) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsTemperature = null;

let fahrenheit = document.querySelector("#toggle-b");
fahrenheit.addEventListener("change", convertToFahrenheit);

let celsius = document.querySelector("#toggle-a");
celsius.addEventListener("change", convertToCelsius);

let currentDate = new Date();
showTime(currentDate);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

let defaultCity = document.querySelectorAll(".city-link");
for (let i = 0; i < defaultCity.length; ++i) {
  let city = defaultCity.item(i);
  city.addEventListener("click", showDefaultCity);
}

search("Berlin");
