import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org'

if (!API_KEY) {
  console.warn('VITE_OPENWEATHER_API_KEY is not set. Please add it to your .env file.')
}

export const weatherApi = {
  // Get current weather by city name
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get forecast by coordinates
  getForecast: async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/forecast`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric'
          }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric'
          }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Convert temperature between Celsius and Fahrenheit
  convertTemp: (celsius, toFahrenheit = false) => {
    if (toFahrenheit) {
      return (celsius * 9/5) + 32
    }
    return celsius
  }
}
