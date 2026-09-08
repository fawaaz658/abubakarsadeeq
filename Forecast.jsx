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
  if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="w-10 h-10 text-yellow-400" />
  if (desc.includes('cloud')) return <Cloud className="w-10 h-10 text-gray-400" />
  if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain className="w-10 h-10 text-blue-400" />
  if (desc.includes('snow')) return <Cloud className="w-10 h-10 text-blue-200" />
  if (desc.includes('thunder')) return <CloudRain className="w-10 h-10 text-purple-500" />
  return <Cloud className="w-10 h-10 text-gray-400" />
}

export default function Forecast({ forecast, isFahrenheit }) {
  if (!forecast || forecast.list.length === 0) {
    return null
  }

  // Group forecast by day (noon entry for each day)
  const dailyForecasts = {}
  
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = item
    } else {
      // Keep the one closest to noon
      const existingHour = new Date(dailyForecasts[dateKey].dt * 1000).getHours()
      const currentHour = date.getHours()
      if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
        dailyForecasts[dateKey] = item
      }
    }
  })

  const days = Object.entries(dailyForecasts).slice(0, 5)
  const tempUnit = isFahrenheit ? '°F' : '°C'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {days.map(([date, dayData], index) => {
          const maxTemp = isFahrenheit
            ? Math.round((dayData.main.temp_max * 9/5) + 32)
            : Math.round(dayData.main.temp_max)
          const minTemp = isFahrenheit
            ? Math.round((dayData.main.temp_min * 9/5) + 32)
            : Math.round(dayData.main.temp_min)
          const avgTemp = isFahrenheit
            ? Math.round((dayData.main.temp * 9/5) + 32)
            : Math.round(dayData.main.temp)

          return (
            <div key={index} className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:shadow-lg transition">
              <div className="text-sm font-semibold text-gray-700 mb-3">{date}</div>
              <div className="flex justify-center mb-3">
                {getWeatherIcon(dayData.weather[0].description)}
              </div>
              <div className="text-xs text-gray-600 mb-3 h-8">
                {dayData.weather[0].description}
              </div>
              <div className="space-y-2 mb-3">
                <div className="text-lg font-bold text-gray-800">{avgTemp}{tempUnit}</div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-700">H:</span> {maxTemp}{tempUnit} / <span className="font-semibold text-gray-700">L:</span> {minTemp}{tempUnit}
                </div>
              </div>
              <div className="border-t border-blue-200 pt-2 space-y-1 text-xs">
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <Droplets size={12} />
                  {dayData.main.humidity}%
                </div>
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <Wind size={12} />
                  {Math.round(dayData.wind.speed)} m/s
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
