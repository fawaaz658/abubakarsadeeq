import React, { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function SearchBar({ onSearch, onGeolocation, loading }) {
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput.trim())
      setSearchInput('')
    }
  }

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onGeolocation(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          alert('Unable to access your location. Please ensure location permissions are enabled.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  return (
    <div className="w-full mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <Search size={20} />
          Search
        </button>
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition"
          title="Use my location"
        >
          <MapPin size={20} />
        </button>
      </form>
    </div>
  )
}
