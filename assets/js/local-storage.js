export function getCitiesFromLocalStorage() {
  const storedCities = localStorage.getItem("cityPosition");
  return storedCities ? JSON.parse(storedCities) : [];
}

export function saveCitiesToLocalStorage(cities) {
  localStorage.setItem("cityPosition", JSON.stringify(cities));
}

export function addCityToLocalStorage(cityPosition) {
  const cities = getCitiesFromLocalStorage();
  cities.push(cityPosition);
  saveCitiesToLocalStorage(cities);
}

export function removeCityFromLocalStorage(cityPosition) {
  const cities = getCitiesFromLocalStorage();
  const updatedCities = cities.filter(
    (city) =>
      city.city !== cityPosition.city ||
      city.longitude !== cityPosition.longitude ||
      city.latitude !== cityPosition.latitude
  );
  saveCitiesToLocalStorage(updatedCities);
}

export function clearCitiesFromLocalStorage() {
  localStorage.removeItem("cityPosition");
}
