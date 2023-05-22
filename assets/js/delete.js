import { clearCitiesFromLocalStorage } from "./local-storage.js";
export function removeAllCitySections() {
  const main = document.querySelector("main");
  const sections = document.querySelectorAll(".weather-section");

  sections.forEach((section) => {
    section.remove();
  });

  clearCitiesFromLocalStorage();
}
