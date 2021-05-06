const API_KEY = "c20c2e4f835c7ca9edf8329477a6d36a";

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
  fetch(
    `${WEATHER_API}lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`
  )
    .then((Response) => Response.json())
    .then((json) => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerHTML = `${Math.floor(temperature)}°C 📌 ${name}`;
    });
  return;
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const coords = {
    lat,
    lng,
  };
  //Set Geo Data to Local Storage
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);

  return;
}

function handleGeoFailure() {
  console.log("no location Data");
  return;
}

function loadWeather() {
  const currentCoords = localStorage.getItem("coords");

  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
  } else {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeoFailure
    );
  }

  return;
}

function init() {
  loadWeather();
}

init();
