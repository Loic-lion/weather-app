export function autocomplete() {
  let input = document.getElementById("city_input");
  const dataList = document.getElementById("city_list");
  if (input.value == "") {
    return;
  }
  let options = {
    method: "GET",
    headers: { "x-api-key": "pV6Omh6o8mMriVDAB39/bw==M2t1Pk6cKzDsRU5w" },
  };

  let url = `https://api.api-ninjas.com/v1/city?limit=10&name=${input.value}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      dataList.innerHTML = "";
      data.forEach((element) => {
        let option = document.createElement("option");
        option.value = `${element.name}`;
        dataList.appendChild(option);
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
