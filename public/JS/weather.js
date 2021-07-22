const form = document.querySelector("#searchWeather");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const cityName = form.elements.query.value;
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  let tempvar = getValue.data.main.temp;
  form.elements.query.value = "";
});

////////////////////////////////////////////
// getValue.data
// console.log(res.data.main.humidity);
// console.log(res.data.main.feels_like);
// console.log(res.data.coord.lat);
// console.log(res.data.coord.lon);
// console.log(res.data.name);
// console.log(res.data.sys.country);
// console.log(res.data.wind.speed);
// console.log(res.data.weather.main);
// console.log(res.data.weather[0].description);
// console.log(res.data.wind.speed);
