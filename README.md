# Weather App

A modern, responsive weather application built with React and Tailwind CSS. Get real-time weather information including current conditions, hourly forecasts, and 5-day forecasts for any location.

## Features

✨ **Current Weather Display** - Real-time temperature, humidity, wind speed, pressure, and more
📍 **Geolocation Support** - Get weather for your current location with one click
🔍 **City Search** - Search weather by city name
📊 **Hourly Forecast** - 24-hour forecast with detailed weather conditions
📅 **5-Day Forecast** - Extended forecast for planning ahead
🌡️ **Temperature Toggle** - Switch between Celsius and Fahrenheit
💾 **Local Storage** - Remembers your last searched city
🎨 **Beautiful UI** - Clean, modern design with Tailwind CSS
📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **OpenWeatherMap API** - Weather data provider

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

## Installation

1. **Clone or download the project**
   ```bash
   cd "weather app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your free API key
   - Create a `.env` file in the root directory:
     ```
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate to that address manually

## Usage

### Search for a City
1. Type a city name in the search box
2. Click the "Search" button or press Enter
3. Weather information will be displayed

### Use Your Current Location
1. Click the green location button (📍)
2. Grant location permission when prompted
3. Weather for your location will be displayed

### Toggle Temperature Unit
- Click the temperature toggle button (°C/°F) in the top right
- Temperature will switch between Celsius and Fahrenheit throughout the app

### View Forecasts
- **Current Weather**: Displays current conditions and detailed metrics
- **Hourly Forecast**: Shows weather for the next 24 hours (in 3-hour intervals)
- **5-Day Forecast**: Displays high/low temperatures and conditions for the next 5 days

## Project Structure

```
weather app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input and geolocation button
│   │   ├── CurrentWeather.jsx      # Current weather display card
│   │   ├── HourlyForecast.jsx      # 24-hour forecast component
│   │   └── Forecast.jsx            # 5-day forecast component
│   ├── utils/
│   │   └── weatherApi.js           # OpenWeatherMap API integration
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind and global styles
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Project dependencies
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## API Key Setup

### Free OpenWeatherMap Account

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up"
3. Create your account
4. Go to API keys section in your account
5. Copy your default API key
6. Paste it in your `.env` file as shown above

The free tier includes:
- Current weather data
- 5-day forecasts
- 60 calls/minute
- 1,000 calls/day

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist` folder with optimized files ready for deployment.

## Deploying

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable `VITE_OPENWEATHER_API_KEY`
5. Deploy with one click

### Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect your repository
4. Add environment variable `VITE_OPENWEATHER_API_KEY` in Site settings
5. Deploy

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## Troubleshooting

### "API key is not set" warning
- Make sure you've created a `.env` file in the root directory
- Check that `VITE_OPENWEATHER_API_KEY` is spelled correctly
- Restart the development server after adding the key

### Geolocation not working
- Check that your browser has permission to access location
- Ensure you're using HTTPS (required for geolocation in production)
- Check browser console for specific error messages

### No weather data appears
- Verify your API key is correct and active
- Check browser console for API errors
- Ensure the city name is spelled correctly

## Future Enhancements

- Weather alerts and warnings
- Air quality index
- UV index information
- Precipitation probability
- Multiple location tracking
- Weather charts and graphs
- Dark mode toggle
- PWA support for offline access
- Internationalization (multiple languages)

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Verify your API key and .env file
3. Try searching for your city again
4. Clear browser cache and reload

Enjoy! ☀️🌧️⛅
