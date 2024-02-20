const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const weatherIcon = document.querySelector(".weather-icon");
// const loadingScreen = document.querySelector(".loading");
const innerContainer = document.querySelector(".inner-container");

form.addEventListener("submit", searchForLocation);

let target = "New Delhi";
const fetchResults = async (targetLocation) => {
  // innerContainer.style.display = "none";
  // loadingScreen.style.display = "block";

  let url = `http://api.weatherapi.com/v1/current.json?key=18edb8a8fee44075be473828241102&q=${targetLocation}&aqi=no`;

  const res = await fetch(url);
  const data = await res.json();

  let locationName = data.location.name;
  let time = data.location.localtime;

  let temp = data.current.temp_c;
  let condition = data.current.condition.text;

  let iconSrc = data.current.condition.icon;

  // innerContainer.style.display = "block";
  // loadingScreen.style.display = "none";

  updateDetails(temp, locationName, time, condition, iconSrc);
};

function updateDetails(temp, locationName, time, condition, iconSrc) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition;
  weatherIcon.src = iconSrc;
}

function searchForLocation(e) {
  e.preventDefault();

  target = searchField.value;
  fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
