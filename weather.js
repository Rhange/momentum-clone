const API_KEY = "32574dbc92bfe305f430c5ab9e8e7035";
const COORDS = "coords";

function saveCoords(coordObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude,
    coordsObj = {
      latitude,
      longitude
    };
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log("Cant access geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // getWeather
  }
}

function init() {
  loadCoords();
}

init();
