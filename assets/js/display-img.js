const apiKey = "b4puxqqaZ9NFQ2w2yDPYha1xZL31u6JoCcDBEeLUwuE";

export function fetchCityImage(city) {
  const apiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const firstPhoto = data.results[0];
        const imageUrl = firstPhoto.urls.regular;

        const imageElement = document.createElement("img");
        imageElement.classList.add("weather_current_img");
        imageElement.src = imageUrl;

        currentWeatherContainer.prepend(imageElement);
      } else {
        const placeholderImage = document.createElement("img");
        placeholderImage.classList.add("weather_current_img");
        placeholderImage.src = "./assets/img/deafault-search.jpg";

        currentWeatherContainer.prepend(placeholderImage);
      }
    })
    .catch((error) => {
      console.log(
        "Une erreur s'est produite lors de la récupération de l'image :",
        error
      );
    });
}