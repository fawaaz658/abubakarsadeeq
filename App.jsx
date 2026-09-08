import React, { useState, useEffect } from 'react'
import { Thermometer } from 'lucide-react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import Forecast from './components/Forecast'
import { weatherApi } from './utils/weatherApi'

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFahrenheit, setIsFahrenheit] = useState(false)
  const [lastSearchedCity, setLastSearchedCity] = useState(null)

  // Load weather on component mount (try to use geolocation)
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity')
    if (savedCity) {
      setLastSearchedCity(savedCity)
      handleSearch(savedCity)
    }
    // Don't call handleGeolocation on mount - let user initiate it
  }, [])

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const weatherData = await weatherApi.getCurrentWeather(city)
      setCurrentWeather(weatherData)
      setLastSearchedCity(city)
      localStorage.setItem('lastSearchedCity', city)
      
      // Fetch forecast
      const forecastData = await weatherApi.getForecast(weatherData.coord.lat, weatherData.coord.lon)
      setForecast(forecastData)
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name and try again.')
      console.error('Weather API error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGeolocation = async () => {
    setLoading(true)
    setError(null)
    
    // Create a timeout for geolocation
    const geolocationTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Geolocation timeout')), 5000)
    )
    
    try {
      await Promise.race([
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords
                const weatherData = await weatherApi.getCurrentWeatherByCoords(latitude, longitude)
                setCurrentWeather(weatherData)
                setLastSearchedCity(weatherData.name)
                localStorage.setItem('lastSearchedCity', weatherData.name)
                
                // Fetch forecast
                const forecastData = await weatherApi.getForecast(latitude, longitude)
                setForecast(forecastData)
                resolve()
              } catch (err) {
                setError('Failed to fetch weather data for your location.')
                console.error('Weather API error:', err)
                reject(err)
              } finally {
                setLoading(false)
              }
            },
            (error) => {
              setLoading(false)
              console.log('Geolocation not available, user can search manually')
              reject(error)
            }
          )
        }),
        geolocationTimeout
      ])
    } catch (err) {
      setLoading(false)
      console.log('Geolocation unavailable or timed out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather App</h1>
            <p className="text-gray-600">Get accurate weather information for any location</p>
          </div>
          <button
            onClick={() => setIsFahrenheit(!isFahrenheit)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            title="Toggle temperature unit"
          >
            <Thermometer size={20} />
            <span>{isFahrenheit ? '°F' : '°C'}</span>
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onGeolocation={handleGeolocation}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && currentWeather && (
          <>
            <CurrentWeather weather={currentWeather} isFahrenheit={isFahrenheit} />
            <HourlyForecast forecast={forecast} isFahrenheit={isFahrenheit} />
            <Forecast forecast={forecast} isFahrenheit={isFahrenheit} />
          </>
        )}

        {!loading && !currentWeather && !error && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
            <Thermometer className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-lg">Search for a city or use geolocation to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
