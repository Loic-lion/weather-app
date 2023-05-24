// export function chartTemp(city) {
//   const apiKey = "b4puxqqaZ9NFQ2w2yDPYha1xZL31u6JoCcDBEeLUwuE";
//   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const temperatureData = [];
//       const timeLabels = [];

//       // Filtrer les données pour obtenir uniquement les mesures toutes les 3 heures
//       const filteredData = data.list.filter(
//         (item, index) => index % 8 === 0 && index < 8
//       );

//       filteredData.forEach((item) => {
//         temperatureData.push(item.main.temp);
//         const timestamp = item.dt * 1000; // Convertir le timestamp en millisecondes
//         const date = new Date(timestamp);
//         timeLabels.push(
//           date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//         );
//       });

//       const canvas = document.createElement("canvas");
//       canvas.id = "chart";

//       const weatherCurrent = document.querySelector(".weather_current");
//       weatherCurrent.appendChild(canvas);

//       const ctx = canvas.getContext("2d");
//       new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: timeLabels,
//           datasets: [
//             {
//               label: "Température (°C)",
//               data: temperatureData,
//               backgroundColor: "rgba(0, 123, 255, 0.5)",
//               borderColor: "rgba(0, 123, 255, 1)",
//               borderWidth: 1,
//               pointRadius: 0,
//               lineTension: 0,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               beginAtZero: false,
//             },
//           },
//         },
//       });
//     })
//     .catch((error) => {
//       console.error(
//         "Une erreur s'est produite lors de la récupération des données :",
//         error
//       );
//     });
// }
