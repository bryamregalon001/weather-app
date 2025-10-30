'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { WeatherData, ForecastDay, Location } from '@/types/weather';

// Dynamically import components
const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });
const WeatherCard = dynamic(() => import('@/components/WeatherCard'), { ssr: false });
const Forecast = dynamic(() => import('@/components/Forecast'), { ssr: false });
const LocationManager = dynamic(() => import('@/components/LocationManager'), { ssr: false });
const DynamicBackground = dynamic(() => import('@/components/DynamicBackground'), { ssr: false });
const Logo = dynamic(() => import('@/components/Logo'), { ssr: false });
const MiniMap = dynamic(() => import('@/components/MiniMap'), { ssr: false });
const WeatherDetails = dynamic(() => import('@/components/WeatherDetails'), { ssr: false });

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: 'london',
    name: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278,
    isCurrent: false
  });

  const fetchWeatherData = async (location: Location | string) => {
    setLoading(true);
    setError(null);

    try {
      const query = typeof location === 'string' ? location : `${location.lat},${location.lon}`;
      
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=no`),
        fetch(`${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=7&aqi=no&alerts=no`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('Failed to fetch weather data. Please check your API key.');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData.current);
      setForecast(forecastData.forecast.forecastday);
      
      // Update current location
      if (typeof location === 'object') {
        setCurrentLocation({
          ...location,
          name: weatherData.location.name,
          country: weatherData.location.country
        });
      } else {
        setCurrentLocation({
          id: `${weatherData.location.lat},${weatherData.location.lon}`,
          name: weatherData.location.name,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          isCurrent: false
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a location');
      return;
    }
    await fetchWeatherData(query);
  };

  const handleLocationSelect = (location: Location) => {
    setCurrentLocation(location);
    fetchWeatherData(location);
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(currentLocation);
  }, []);

  return (
    <>
      <Logo />
      {weather && (
        <DynamicBackground 
          condition={weather.condition.text} 
          isDay={new Date().getHours() >= 6 && new Date().getHours() < 19}
        />
      )}
      <main className="min-h-screen p-4 md:p-8" style={{ position: 'relative', background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8" style={{
          background: 'linear-gradient(135deg, rgba(45, 53, 97, 0.9) 0%, rgba(31, 37, 68, 0.9) 100%)',
          border: '3px solid',
          borderImage: 'linear-gradient(45deg, #4ecdc4, #44a8ff, #ff6b9d) 1',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a8ff 50%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            textShadow: 'none',
            fontFamily: '\'VT323\', monospace',
            lineHeight: 1.2,
            animation: 'shimmer 3s linear infinite',
            backgroundSize: '200% auto'
          }}>
            ✦ WEATHER FORECAST ✦
          </h1>
          <p style={{
            color: '#4ecdc4',
            fontSize: '1.2rem',
            fontFamily: '\'VT323\', monospace',
            lineHeight: 1.4,
            textShadow: '0 2px 10px rgba(78, 205, 196, 0.5)'
          }}>
            ▸ 16-BIT WEATHER SYSTEM ◂
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <SearchBar onSearch={handleSearch} loading={loading} />
            <LocationManager 
              onLocationSelect={handleLocationSelect}
              currentLocation={currentLocation} 
            />
            {weather && currentLocation && (
              <MiniMap 
                location={currentLocation.name}
                lat={currentLocation.lat}
                lon={currentLocation.lon}
                onLocationSelect={handleSearch}
              />
            )}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading weather data...</p>
              </div>
            ) : weather ? (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <WeatherCard 
                    location={currentLocation.name}
                    currentTemp={weather.temp_c}
                    condition={weather.condition.text}
                    icon={weather.condition.icon}
                    feelsLike={weather.feelslike_c}
                    humidity={weather.humidity}
                    windSpeed={weather.wind_kph}
                    windDir={weather.wind_dir}
                    pressure={weather.pressure_mb}
                    visibility={weather.vis_km}
                    cloud={weather.cloud}
                    uv={weather.uv}
                    lastUpdated={weather.last_updated}
                  />
                  
                  <WeatherDetails 
                    pressure={weather.pressure_mb}
                    visibility={weather.vis_km}
                    cloud={weather.cloud}
                    windDir={weather.wind_dir}
                    sunrise={forecast[0]?.astro?.sunrise}
                    sunset={forecast[0]?.astro?.sunset}
                  />
                </div>
                
                {forecast.length > 0 && (
                  <Forecast 
                    forecast={forecast}
                    onDaySelect={(index) => {
                      console.log('Selected day:', index);
                    }}
                    selectedDayIndex={0}
                  />
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-6xl mb-4 opacity-50">🌤️</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Weather Information
                </h2>
                <p className="text-gray-600">
                  {error || 'Search for a location to see the weather forecast'}
                </p>
              </div>
            )}
            
            <footer className="mt-12 text-center text-sm text-gray-500">
              <p>Weather data provided by{' '}
                <a 
                  href="https://www.weatherapi.com/" 
                  className="text-blue-500 hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  WeatherAPI.com
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
