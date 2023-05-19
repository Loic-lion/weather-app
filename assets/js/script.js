const button = document.querySelector("button");
const key = "a1b90f946e33798b0953319a693cbb11";

button.addEventListener("click", function () {
  let cityInput = document.querySelector("input");
  let city = cityInput.value;

  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=5&appid=" +
      key
  )
    .then((response) => response.json())
    .then((data) => {
      let longitude = data[0].lon;
      let latitude = data[0].lat;

      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&units=metric&appid=" +
          key
      )
        .then((response) => response.json())
        .then((data) => {
          let temperature = data.main.temp;
          let description = data.weather[0].description;
          let wind = data.wind.speed;
          console.log(data);
          let iconTemp = data.weather[0].icon;

          let iconUrl = "http://openweathermap.org/img/w/" + iconTemp + ".png";
          let iconImg = document.createElement("img");
          iconImg.src = iconUrl;

          document.querySelector(
            ".container_current_info_temperature"
          ).textContent = "temperature: " + temperature;
          document.querySelector(
            ".container_current_info_description"
          ).textContent = "description: " + description;
          document.querySelector(".container_current_info_wind").textContent =
            "wind: " + wind;
            document.querySelector(".container_current_info_icon").innerHTML = "";
            
            document.querySelector(".container_current_info_icon").appendChild(iconImg);
        });
    })
    .catch((error) => console.log("Il y a une erreur : ", error));
});
