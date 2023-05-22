// async function autocompleteCity(searchTerm) {
//   const apiKey = "pV6Omh6o8mMriVDAB39/bw==M2t1Pk6cKzDsRU5w";
//   const apiUrl = `https://api.ninjas.com/v1/city?name=${encodeURIComponent(
//     searchTerm
//   )}&api_key=${apiKey}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data && data.length > 0) {
//       const cities = data.map((city) => city.name);
//       return cities;
//     }
//     return [];
//   } catch (error) {
//     console.error(
//       "Une erreur s'est produite lors de la récupération des données de l'API Ninja.",
//       error
//     );
//     return [];
//   }
// }

function autocompleteCity(searchTerm) {
  const apiKey = "pV6Omh6o8mMriVDAB39/bw==M2t1Pk6cKzDsRU5w"; // Remplacez par votre propre clé API City API de API Ninja
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const apiUrl = `https://api.ninjas.com/v1/cities?name=${encodedSearchTerm}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const cities = data.map((city) => city.city);
        return cities;
      }
      return [];
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des données de l'API City API de API Ninja.",
        error
      );
      return [];
    });
}

export { autocompleteCity };
