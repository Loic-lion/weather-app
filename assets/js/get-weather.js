export function getWeather() {
  const form = document.querySelector("form");
  const key = "a1b90f946e33798b0953319a693cbb11";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&units=metric&appid=" +
            key
        )
          .then((response) => response.json())
          .then((data) => {
            let forecasts = data.list;
            let forecastDays = {};

            forecasts.forEach((forecast) => {
              let date = new Date(forecast.dt_txt).toDateString();
              if (!forecastDays[date]) {
                forecastDays[date] = forecast;
              }
            });

            let currentWeather = forecastDays[new Date().toDateString()];

            let currentTemperature = currentWeather.main.temp;
            let currentDescription = currentWeather.weather[0].description;
            let currentWind = currentWeather.wind.speed;
            let currentIconCode = currentWeather.weather[0].icon;

            let currentIconUrl =
              "http://openweathermap.org/img/w/" + currentIconCode + ".png";
            let currentIconImg = document.createElement("img");
            currentIconImg.src = currentIconUrl;

            document.querySelector("h2").textContent = "Now, " + city;
            document.querySelector(
              ".container_current_info_temperature"
            ).textContent = "Temperature: " + currentTemperature + "°C";
            document.querySelector(
              ".container_current_info_description"
            ).textContent = "Description: " + currentDescription;
            document.querySelector(".container_current_info_wind").textContent =
              "Wind: " + currentWind + "km/h";
            document.querySelector(".container_current_info_icon").innerHTML =
              "";
            document
              .querySelector(".container_current_info_icon")
              .appendChild(currentIconImg);

            let forecastDates = Object.keys(forecastDays).slice(1, 6);
            forecastDates.forEach((date, index) => {
              let forecast = forecastDays[date];
              let temperature = forecast.main.temp;
              let description = forecast.weather[0].description;
              let iconCode = forecast.weather[0].icon;

              let forecastContainer = document.querySelector(
                ".container_forecast_day" + (index + 1)
              );

              let dateElement = document.createElement("div");
              dateElement.textContent = date;

              let iconUrl =
                "http://openweathermap.org/img/w/" + iconCode + ".png";
              let iconImg = document.createElement("img");
              iconImg.src = iconUrl;

              let temperatureElement = document.createElement("div");
              temperatureElement.textContent =
                "Temperature: " + temperature + "°C";

              let descriptionElement = document.createElement("div");
              descriptionElement.textContent = "Description: " + description;

              forecastContainer.innerHTML = "";
              forecastContainer.appendChild(dateElement);
              forecastContainer.appendChild(iconImg);
              forecastContainer.appendChild(temperatureElement);
              forecastContainer.appendChild(descriptionElement);
            });
          });
      })
      .catch((error) => console.log("Il y a une erreur : ", error));
  });
}
