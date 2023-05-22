import { getWeather } from "./get-weather.js";
import { removeAllCitySections } from "./delete.js";

const deleteAllButton = document.getElementById("button_delete");

deleteAllButton.addEventListener("click", removeAllCitySections);
getWeather();
