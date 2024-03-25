const axios = require('axios');

// Function to fetch temperature data for a given city
async function fetchTemperature(city) {
    try {
        const apiKey = '2d3ef0a0445d65b9d2352fd6b90401d2'; 
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        // Make a GET request to the OpenWeatherMap API
        const response = await axios.get(apiUrl);
        
        // Extract temperature from the API response
        const temperature = response.data.main.temp;
        
        return temperature;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
}

module.exports = { fetchTemperature };
