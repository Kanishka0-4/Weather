const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDataDiv = document.getElementById('weatherData');

const apiKey = 'bd609caf8beb4adab07125953241609'; 

async function getWeather() {
  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const temp = data.current.temp_c;  
  const feelsLike = data.current.feelslike_c;
  const weatherDescription = data.current.condition.text;
  const weatherIcon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const cityName = data.location.name;

  weatherDataDiv.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <p>Temperature: ${temp}°C</p>
    <p>Feels Like: ${feelsLike}°C</p>
   <img src="${weatherIcon}" alt="${weatherDescription}" />
    <p>Humidity: ${humidity}%</p>
  `;
}
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

getWeatherBtn.addEventListener('click', getWeather);
