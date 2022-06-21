let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.trim().toLowerCase();

if (Object.keys(weather).includes(city)) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
  function celsToFahr() {
    let fahr = (temperature * 9) / 5 + 32;
    return Math.round(fahr);
  }
  alert(
    `It is currently ${Math.round(temperature)}°C (${celsToFahr(
      temperature
    )}°F) in ${
      city[0].toUpperCase() + city.substr(1).toLowerCase()
    } with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city. Try going to https://www.google.com/search?q=weather+${city}`
  );
}
