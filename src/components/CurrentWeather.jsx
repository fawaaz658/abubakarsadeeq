import React from 'react'
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Gauge
} from 'lucide-react'

const weatherIcons = {
  'Clear': <Sun className="w-16 h-16 text-yellow-400" />,
  'Clouds': <Cloud className="w-16 h-16 text-gray-400" />,
  'Rain': <CloudRain className="w-16 h-16 text-blue-400" />,
  'Drizzle': <CloudRain className="w-16 h-16 text-blue-300" />,
  'Thunderstorm': <CloudRain className="w-16 h-16 text-purple-500" />,
  'Snow': <Cloud className="w-16 h-16 text-blue-200" />,
  'Mist': <Cloud className="w-16 h-16 text-gray-300" />,
  'Smoke': <Cloud className="w-16 h-16 text-gray-400" />,
  'Haze': <Cloud className="w-16 h-16 text-gray-400" />,
  'Dust': <Cloud className="w-16 h-16 text-yellow-600" />,
  'Fog': <Cloud className="w-16 h-16 text-gray-300" />,
  'Sand': <Cloud className="w-16 h-16 text-yellow-600" />,
  'Ash': <Cloud className="w-16 h-16 text-gray-500" />,
  'Squall': <Wind className="w-16 h-16 text-gray-500" />,
  'Tornado': <Wind className="w-16 h-16 text-red-500" />,
}

export default function CurrentWeather({ weather, isFahrenheit }) {
  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
        <p>Search for a city or use geolocation to see the weather</p>
      </div>
    )
  }

  const { main, weather: weatherDetails, wind, visibility, clouds, sys } = weather
  const temp = isFahrenheit
    ? Math.round((main.temp * 9/5) + 32)
    : Math.round(main.temp)
  const feelsLike = isFahrenheit
    ? Math.round((main.feels_like * 9/5) + 32)
    : Math.round(main.feels_like)
  const tempUnit = isFahrenheit ? '°F' : '°C'
  const mainWeather = weatherDetails[0].main

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Main weather info */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h2 className="text-4xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg opacity-90 mb-6">{weatherDetails[0].description}</p>
          <div className="flex items-center gap-4">
            {weatherIcons[mainWeather] || weatherIcons['Clouds']}
            <div>
              <div className="text-6xl font-bold">{temp}</div>
              <div className="text-lg">Feels like {feelsLike}{tempUnit}</div>
            </div>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={20} />
              <span className="text-sm opacity-80">Humidity</span>
            </div>
            <div className="text-2xl font-semibold">{main.humidity}%</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind size={20} />
              <span className="text-sm opacity-80">Wind Speed</span>
            </div>
            <div className="text-2xl font-semibold">{Math.round(wind.speed)} m/s</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge size={20} />
              <span className="text-sm opacity-80">Pressure</span>
            </div>
            <div className="text-2xl font-semibold">{main.pressure} hPa</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={20} />
              <span className="text-sm opacity-80">Visibility</span>
            </div>
            <div className="text-2xl font-semibold">{(visibility / 1000).toFixed(1)} km</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud size={20} />
              <span className="text-sm opacity-80">Cloudiness</span>
            </div>
            <div className="text-2xl font-semibold">{clouds.all}%</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-sm opacity-80 mb-2">Max Temp</div>
            <div className="text-2xl font-semibold">
              {isFahrenheit ? Math.round((main.temp_max * 9/5) + 32) : Math.round(main.temp_max)}{tempUnit}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
