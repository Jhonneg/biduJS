//initialize component state
let state = reactive({
  selectedCity: "Hello Universe",
  weather: {
    temperature: "N/A",
    humidity: "N/A",
    description: "",
  },
});

const mockWeatherData = {
  "New York": {
    temperature: "15°C",
    humidity: "55%",
    description: "Cloudy",
  },
  London: {
    temperature: "10°C",
    humidity: "75%",
    description: "Rainy",
  },
  Tokyo: {
    temperature: "22°C",
    humidity: "65%",
    description: "Sunny",
  },
  Sydney: {
    temperature: "25°C",
    humidity: "60%",
    description: "Sunny",
  },
};

function fetchWeather(city) {
  setTimeout(() => {
    const weather = mockWeatherData[city];
    state.weather = weather;
  }, 500);
}
createEffect(() => {
  fetchWeather(state.selectedCity);
});

createEffect(() => {
  console.log("re-render");
  render(
    "#container",
    ` <select onChange=updateSelectedCity(this.value)>
          <option value="Tokyo">Tokyo</option>
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Sydney">Sydney</option>
        </select>
        <div>
          <p>Temperature : ${state.weather.temperature}</p>
          <p>Humidity : ${state.weather.humidity}</p>
          <p>Description : ${state.weather.description}</p>
        </div>
      `
  );
});

function updateSelectedCity(city) {
  state.selectedCity = city;
  fetchWeather(city);
}
