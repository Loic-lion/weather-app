import { getWeather } from "./get-weather.js";
import { removeAllCitySections } from "./delete.js";
// import { autocompleteCity } from "./autocomplete-city.js";

const deleteAllButton = document.getElementById("button_delete");

deleteAllButton.addEventListener("click", removeAllCitySections);
getWeather();

// function handleSearchInput(event) {
//   let searchTerm = event.target.value;
//   autocompleteCity(searchTerm)
//     .then((cities) => {
//       // Faites quelque chose avec la liste des villes renvoyées
//       console.log(cities);
//     })
//     .catch((error) => {
//       // Gérez les erreurs
//       console.error(error);
//     });
// }

// const searchInput = document.getElementById("cityInput");
// searchInput.addEventListener("input", handleSearchInput);
