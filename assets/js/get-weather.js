import {
  getCitiesFromLocalStorage,
  addCityToLocalStorage,
  removeCityFromLocalStorage,
  clearCitiesFromLocalStorage,
} from "./local-storage.js";

function getWeather(city) {
  const form = document.querySelector("form");
  const key = "a1b90f946e33798b0953319a693cbb11";
  let cities = getCitiesFromLocalStorage();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let cityInput = document.querySelector("input");
    city = cityInput.value;

    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
              "https://openweathermap.org/img/w/" + currentIconCode + ".png";
            let currentIconImg = document.createElement("img");
            currentIconImg.src = currentIconUrl;

            let main = document.querySelector("main");

            let section = document.createElement("section");
            section.classList.add("weather");

            let currentWeatherContainer = document.createElement("div");
            currentWeatherContainer.classList.add("weather_current");

            let h2 = document.createElement("h2");
            h2.textContent = "Now, " + city;

            let temperatureElement = document.createElement("div");
            temperatureElement.classList.add("temperature");
            temperatureElement.textContent = currentTemperature + "°C";

            let descriptionElement = document.createElement("div");
            descriptionElement.classList.add("description");
            descriptionElement.textContent = currentDescription;

            let windElement = document.createElement("div");
            windElement.classList.add("wind");
            windElement.textContent = "Wind: " + currentWind + "km/h";

            let iconElement = document.createElement("div");
            iconElement.classList.add("icon");
            iconElement.appendChild(currentIconImg);

            ///////////////////////API IMAGE/////////////////////

            // Remplacez 'VILLE' par le nom de la ville pour laquelle vous souhaitez afficher l'image

            // Remplacez 'VOTRE_CLE_UNSPLASH' par votre propre clé d'API Unsplash
            const apiKey = "b4puxqqaZ9NFQ2w2yDPYha1xZL31u6JoCcDBEeLUwuE";

            // Obtention de l'élément div avec la classe "weather-current"
            const weatherCurrentDiv =
              document.querySelector(".weather_current");

            // Fonction pour récupérer une image d'Unsplash basée sur le nom de la ville
            function fetchCityImage(city) {
              const apiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${apiKey}`;

              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  const imageUrl = data.urls.regular;

                  // Création d'un élément d'image et définition de l'URL de l'image
                  const imageElement = document.createElement("img");
                  imageElement.classList.add("weather_current_img");
                  imageElement.src = imageUrl;

                  // Ajout de l'élément d'image à la div weather-current
                  weatherCurrentDiv.appendChild(imageElement);
                })
                .catch((error) => {
                  console.log(
                    "Une erreur s'est produite lors de la récupération de l'image :",
                    error
                  );
                });
            }

            // Appel de la fonction fetchCityImage avec le nom de la ville
            fetchCityImage(city);

            //////////////////////SUITE ATTACHEMENT DES DIV A LA CARTE WEATHER////////

            currentWeatherContainer.appendChild(h2);
            currentWeatherContainer.appendChild(iconElement);
            currentWeatherContainer.appendChild(temperatureElement);
            currentWeatherContainer.appendChild(descriptionElement);
            currentWeatherContainer.appendChild(windElement);

            section.appendChild(currentWeatherContainer);

            let forecastDates = Object.keys(forecastDays).slice(1, 6);

            let forecastDayContainer = document.createElement("div");
            forecastDayContainer.classList.add("weather_forecast");

            forecastDates.forEach((date, index) => {
              let forecast = forecastDays[date];
              let temperature = forecast.main.temp;
              let description = forecast.weather[0].description;
              let iconCode = forecast.weather[0].icon;

              let forecastContainer = document.createElement("div");
              forecastContainer.classList.add("weather_forecast_day");

              let dateElement = document.createElement("div");
              dateElement.textContent = date;
              dateElement.classList.add("weather_forecast_day_date");

              let iconUrl =
                "http://openweathermap.org/img/w/" + iconCode + ".png";
              let iconImg = document.createElement("img");
              iconImg.src = iconUrl;
              iconImg.classList.add("weather_forecast_day_icon");

              let temperatureElement = document.createElement("div");
              temperatureElement.textContent = temperature + "°C";
              temperatureElement.classList.add(
                "weather_forecast_day_temperature"
              );

              let descriptionElement = document.createElement("div");
              descriptionElement.textContent = description;
              descriptionElement.classList.add(
                "weather_forecast_day_description"
              );

              forecastContainer.appendChild(dateElement);
              forecastContainer.appendChild(iconImg);
              forecastContainer.appendChild(temperatureElement);
              forecastContainer.appendChild(descriptionElement);

              forecastDayContainer.appendChild(forecastContainer);
            });

            section.appendChild(forecastDayContainer);

            main.appendChild(section);

            let cityPosition = {
              city: city,
              longitude: longitude,
              latitude: latitude,
            };
            addCityToLocalStorage(cityPosition);
          });
      })
      .catch((error) => console.log("Il y a une erreur : ", error));

    cityInput.value = "";
  });

  window.addEventListener("DOMContentLoaded", function () {
    let storedCities = getCitiesFromLocalStorage();
    if (storedCities) {
      cities = storedCities;
      cities.forEach((cityPosition) => {
        let cityName = cityPosition.city;
        let longitude = cityPosition.longitude;
        let latitude = cityPosition.latitude;

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
              "https://openweathermap.org/img/w/" + currentIconCode + ".png";
            let currentIconImg = document.createElement("img");
            currentIconImg.src = currentIconUrl;

            let main = document.querySelector("main");

            let section = document.createElement("section");
            section.classList.add("weather");

            let currentWeatherContainer = document.createElement("div");
            currentWeatherContainer.classList.add("weather_current");

            let h2 = document.createElement("h2");
            h2.textContent = "Now, " + cityName;

            let temperatureElement = document.createElement("div");
            temperatureElement.classList.add("temperature");
            temperatureElement.textContent = currentTemperature + "°C";

            let descriptionElement = document.createElement("div");
            descriptionElement.classList.add("description");
            descriptionElement.textContent = currentDescription;

            let windElement = document.createElement("div");
            windElement.classList.add("wind");
            windElement.textContent = "Wind: " + currentWind + "km/h";

            let iconElement = document.createElement("div");
            iconElement.classList.add("icon");
            iconElement.appendChild(currentIconImg);

            currentWeatherContainer.appendChild(h2);
            currentWeatherContainer.appendChild(iconElement);
            currentWeatherContainer.appendChild(temperatureElement);
            currentWeatherContainer.appendChild(descriptionElement);
            currentWeatherContainer.appendChild(windElement);

            section.appendChild(currentWeatherContainer);

            let forecastDates = Object.keys(forecastDays).slice(1, 6);

            let forecastDayContainer = document.createElement("div");
            forecastDayContainer.classList.add("weather_forecast");

            forecastDates.forEach((date, index) => {
              let forecast = forecastDays[date];
              let temperature = forecast.main.temp;
              let description = forecast.weather[0].description;
              let iconCode = forecast.weather[0].icon;

              let forecastContainer = document.createElement("div");
              forecastContainer.classList.add("weather_forecast_day");

              let dateElement = document.createElement("div");
              dateElement.textContent = date;
              dateElement.classList.add("weather_forecast_day_date");

              let iconUrl =
                "http://openweathermap.org/img/w/" + iconCode + ".png";
              let iconImg = document.createElement("img");
              iconImg.src = iconUrl;
              iconImg.classList.add("weather_forecast_day_icon");

              let temperatureElement = document.createElement("div");
              temperatureElement.textContent = temperature + "°C";
              temperatureElement.classList.add(
                "weather_forecast_day_temperature"
              );

              let descriptionElement = document.createElement("div");
              descriptionElement.textContent = description;
              descriptionElement.classList.add(
                "weather_forecast_day_description"
              );

              forecastContainer.appendChild(dateElement);
              forecastContainer.appendChild(iconImg);
              forecastContainer.appendChild(temperatureElement);
              forecastContainer.appendChild(descriptionElement);

              forecastDayContainer.appendChild(forecastContainer);
            });

            section.appendChild(forecastDayContainer);

            main.appendChild(section);
          });
      });
    }
  });
}

export { getWeather };
