import { getWeather } from "./get-weather.js";
import { removeAllCitySections } from "./delete.js";
import { autocomplete } from "./autocomplete-city.js";

const deleteAllButton = document.getElementById("button_delete");

deleteAllButton.addEventListener("click", removeAllCitySections);
getWeather();

document.getElementById("city_input").addEventListener("input", autocomplete);
