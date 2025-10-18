import { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

interface WeatherCardProps {
  location: string;
  currentTemp: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  pressure: number;
  visibility: number;
  cloud: number;
  uv: number;
  lastUpdated: string;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return '☀️';
  } else if (conditionLower.includes('cloud')) {
    return '☁️';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return '🌧️';
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return '⛈️';
  } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
    return '❄️';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist') || conditionLower.includes('haze')) {
    return '🌫️';
  } else {
    return '🌈';
  }
};

export default function WeatherCard({ 
  location, 
  currentTemp, 
  condition, 
  icon, 
  feelsLike, 
  humidity, 
  windSpeed, 
  windDir, 
  pressure, 
  visibility, 
  cloud, 
  uv, 
  lastUpdated 
}: WeatherCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const weatherIcon = getWeatherIcon(condition);
  const temp = Math.round(currentTemp);
  const feelsLikeRounded = Math.round(feelsLike);
  
  // Generate a subtle texture based on weather condition
  const getTextureStyle = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return {
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 90%)',
        position: 'relative',
        overflow: 'hidden'
      };
    } else if (conditionLower.includes('snow')) {
      return {
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        position: 'relative',
        overflow: 'hidden'
      };
    } else if (conditionLower.includes('cloud')) {
      return {
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      };
    } else {
      return {
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
        backgroundSize: '20px 20px',
        position: 'relative',
        overflow: 'hidden'
      };
    }
  };

  return (
    <div 
      className="weather-card"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        ...getTextureStyle()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Weather Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1e293b',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.8rem' }}>📍</span>
            {location}
          </h2>
          <p style={{
            color: '#64748b',
            margin: '0.25rem 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}>
            <span>📅</span> {formattedDate}
          </p>
        </div>
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 500,
          color: '#1e40af'
        }}>
          <span>🕒</span> {timeString}
        </div>
      </div>

      {/* Main Weather Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.5rem 0',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '5rem',
            lineHeight: 1,
            marginBottom: '0.5rem',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}>
            {weatherIcon}
          </div>
          
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: '#1e293b',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0.5rem'
            }}>
              {temp}°
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                color: '#64748b',
                marginLeft: '0.25rem',
                marginTop: '0.5rem'
              }}>
                C
              </span>
            </div>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#475569',
              margin: '0.5rem 0',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {condition}
              {feelsLikeRounded !== temp && (
                <span style={{
                  fontSize: '0.9rem',
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#4f46e5',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontWeight: 500
                }}>
                  Feels like {feelsLikeRounded}°
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Weather Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {/* Humidity */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.05)',
            borderRadius: '16px',
            padding: '1.25rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(99, 102, 241, 0.1)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              fontSize: '1.5rem'
            }}>
              💧
            </div>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748b',
              margin: '0 0 0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Humidity
              <Tooltip text="The amount of water vapor in the air. Higher humidity makes it feel warmer." />
            </p>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1e293b',
              margin: 0
            }}>
              {humidity}%
            </p>
          </div>

          {/* Wind */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '16px',
            padding: '1.25rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              fontSize: '1.5rem',
              transform: 'rotate(0deg)',
              transition: 'transform 0.5s ease'
            }}>
              🪁
            </div>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748b',
              margin: '0 0 0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Wind
              <Tooltip text="Wind speed and direction. Higher speeds indicate stronger winds." />
            </p>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1e293b',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}>
              {windSpeed} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>km/h</span>
            </p>
            {windDir && (
              <p style={{
                fontSize: '0.8rem',
                color: '#64748b',
                margin: '0.25rem 0 0',
                fontStyle: 'italic'
              }}>
                {windDir}
              </p>
            )}
          </div>

          {/* Feels Like */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            borderRadius: '16px',
            padding: '1.25rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(245, 158, 11, 0.1)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              fontSize: '1.5rem'
            }}>
              🌡️
            </div>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748b',
              margin: '0 0 0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Feels Like
              <Tooltip text="The apparent temperature considering wind chill and humidity." />
            </p>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1e293b',
              margin: 0
            }}>
              {feelsLikeRounded}°
            </p>
          </div>

          {/* UV Index (if available) */}
          {uv !== undefined && (
            <div style={{
              background: 'rgba(234, 88, 12, 0.05)',
              borderRadius: '16px',
              padding: '1.25rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(234, 88, 12, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'rgba(234, 88, 12, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                fontSize: '1.5rem'
              }}>
                ☀️
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#64748b',
                margin: '0 0 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                UV Index
                <Tooltip text="Measures UV radiation intensity. Higher values mean greater sun exposure risk." />
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1e293b',
                margin: 0
              }}>
                {uv}
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  marginLeft: '0.25rem',
                  color: (() => {
                    if (uv <= 2) return '#22c55e'; // Low
                    if (uv <= 5) return '#f59e0b'; // Moderate
                    if (uv <= 7) return '#f97316'; // High
                    if (uv <= 10) return '#ef4444'; // Very High
                    return '#b91c1c'; // Extreme
                  })()
                }}>
                  {uv <= 2 ? 'Low' : 
                   uv <= 5 ? 'Moderate' : 
                   uv <= 7 ? 'High' : 
                   uv <= 10 ? 'Very High' : 'Extreme'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Background Elements */}
      {condition.toLowerCase().includes('rain') && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
          opacity: 0.3
        }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '10px',
                background: '#3b82f6',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: 'rain 1s linear infinite',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
          <style jsx>{`
            @keyframes rain {
              to {
                transform: translateY(100vh);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
