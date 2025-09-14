// Select DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');

// Weather display elements
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weather-description');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');

// API Configuration
const apiKey = '6cae796f1ef8c088fbe48a27bc79e3e6';

// Event listener for form submission
searchForm.addEventListener('submit', async (event) => {
    // This line is the solution. It stops the page from reloading.
    event.preventDefault(); 
    
    const city = searchInput.value.trim();

    if (city) {
        await getWeather(city);
    }
});

/**
 * Fetches weather data from the OpenWeatherMap API for a given city.
 * @param {string} city - The name of the city to get weather for.
 */
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // If city not found (404) or other server error
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

/**
 * Displays the fetched weather data on the page.
 * @param {object} data - The weather data object from the API.
 */
function displayWeather(data) {
    // Hide error and show weather display
    errorMessage.classList.add('hidden');
    weatherDisplay.classList.remove('hidden');

    // Update the DOM with the data
    cityNameEl.textContent = data.name;
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIconEl.alt = data.weather[0].description;
    weatherDescriptionEl.textContent = data.weather[0].description;

    // Update details
    feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed.toFixed(1)} m/s`;
    
    // Clear the search input
    searchInput.value = '';
}

/**
 * Hides the weather display and shows an error message.
 */
function showError() {
    weatherDisplay.classList.add('hidden'); // Hide any previous weather data
    errorMessage.classList.remove('hidden');
}