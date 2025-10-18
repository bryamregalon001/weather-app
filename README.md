# 🌤️ SkyScope Weather App - 16-Bit Edition

A beautiful, retro-styled weather application with a 16-bit gaming aesthetic. Get real-time weather data for any location worldwide with an interactive map and detailed forecasts.

![16-Bit Weather App](https://img.shields.io/badge/Style-16--Bit-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- 🎮 **16-Bit Retro Design** - SNES/Genesis era aesthetic
- 🌍 **Interactive World Map** - Real geographic data with location markers
- 🌤️ **Real-Time Weather** - Current conditions and detailed metrics
- 📊 **7-Day Forecast** - Extended weather predictions
- 🗺️ **Location Search** - Find weather for any city worldwide
- 📍 **Saved Locations** - Quick access to favorite places
- 💾 **Weather Details** - Pressure, visibility, cloud cover, UV index, and more
- 🌅 **Sunrise/Sunset Times** - Astronomical data
- 🎨 **Dynamic Backgrounds** - Changes based on weather and time of day
- 📱 **Fully Responsive** - Works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/weather_app.git
cd weather_app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[WeatherAPI.com](https://www.weatherapi.com/)** - Weather data provider
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Map data

## 📦 Project Structure

```
weather_app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── DynamicBackground.tsx  # Weather-based backgrounds
│   │   ├── Forecast.tsx           # 7-day forecast
│   │   ├── LocationManager.tsx    # Saved locations
│   │   ├── Logo.tsx               # App logo
│   │   ├── MiniMap.tsx            # Interactive map
│   │   ├── SearchBar.tsx          # Location search
│   │   ├── Tooltip.tsx            # Info tooltips
│   │   ├── WeatherCard.tsx        # Current weather
│   │   └── WeatherDetails.tsx     # Additional metrics
│   └── types/
│       └── weather.ts         # TypeScript types
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## 🎨 Features Breakdown

### Weather Card
- Current temperature and conditions
- Feels-like temperature
- Humidity, wind speed, and direction
- UV index with color-coded levels
- Interactive info tooltips

### Weather Details
- Atmospheric pressure
- Visibility distance
- Cloud cover percentage
- Wind direction compass
- Sunrise and sunset times

### Interactive Map
- Real geographic map with OpenStreetMap
- Location marker
- 16-bit styled overlay
- Compact 300x300px display

### Dynamic Backgrounds
- Changes based on weather conditions (rain, snow, clouds, etc.)
- Time-of-day gradients (dawn, day, dusk, night)
- Animated weather effects (raindrops, snowflakes, stars)

## 🌈 Color Palette

- **Cyan**: `#4ecdc4` - Primary
- **Blue**: `#44a8ff` - Secondary
- **Pink**: `#ff6b9d` - Accent
- **Dark Blue**: `#1a1a2e` - Background

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Map data from [OpenStreetMap](https://www.openstreetmap.org/)
- Retro fonts: Press Start 2P & VT323
- Inspired by 16-bit era gaming aesthetics

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/YOUR_USERNAME/weather_app](https://github.com/YOUR_USERNAME/weather_app)

---

Made with ❤️ and ☕ | Powered by Next.js & WeatherAPI
