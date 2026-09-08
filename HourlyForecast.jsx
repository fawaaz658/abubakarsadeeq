import React from 'react'
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
} from 'lucide-react'

const getWeatherIcon = (description) => {
  const desc = description.toLowerCase()
  if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="w-8 h-8 text-yellow-400" />
  if (desc.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />
  if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain className="w-8 h-8 text-blue-400" />
  if (desc.includes('snow')) return <Cloud className="w-8 h-8 text-blue-200" />
  if (desc.includes('thunder')) return <CloudRain className="w-8 h-8 text-purple-500" />
  return <Cloud className="w-8 h-8 text-gray-400" />
}

export default function HourlyForecast({ forecast, isFahrenheit }) {
  if (!forecast || forecast.list.length === 0) {
    return null
  }

  const next24Hours = forecast.list.slice(0, 8) // 8 * 3-hour intervals = 24 hours
  const tempUnit = isFahrenheit ? '°F' : '°C'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Hourly Forecast (Next 24 Hours)</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {next24Hours.map((hour, index) => {
            const date = new Date(hour.dt * 1000)
            const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            const temp = isFahrenheit
              ? Math.round((hour.main.temp * 9/5) + 32)
              : Math.round(hour.main.temp)

            return (
              <div key={index} className="flex-shrink-0 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4 text-center min-w-max">
                <div className="text-sm font-semibold text-gray-700 mb-2">{timeString}</div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(hour.weather[0].description)}
                </div>
                <div className="text-lg font-bold text-gray-800 mb-2">{temp}{tempUnit}</div>
                <div className="flex items-center justify-center gap-1 text-xs text-blue-600 mb-1">
                  <Droplets size={12} />
                  {hour.main.humidity}%
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                  <Wind size={12} />
                  {Math.round(hour.wind.speed)} m/s
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
