import { useEffect, useState } from 'react';

interface DynamicBackgroundProps {
  condition: string;
  isDay?: boolean;
}

export default function DynamicBackground({ condition, isDay = true }: DynamicBackgroundProps) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getBackgroundStyle = () => {
    const conditionLower = condition.toLowerCase();
    
    // Determine time of day
    const isDawn = currentHour >= 5 && currentHour < 7;
    const isMorning = currentHour >= 7 && currentHour < 12;
    const isAfternoon = currentHour >= 12 && currentHour < 17;
    const isDusk = currentHour >= 17 && currentHour < 19;
    const isNight = currentHour >= 19 || currentHour < 5;

    // Weather-based backgrounds
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return {
        background: isDay 
          ? 'linear-gradient(to bottom, #4a5568 0%, #718096 50%, #a0aec0 100%)'
          : 'linear-gradient(to bottom, #1a202c 0%, #2d3748 50%, #4a5568 100%)',
        animation: 'rain 20s linear infinite'
      };
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return {
        background: 'linear-gradient(to bottom, #1a202c 0%, #2d3748 30%, #4a5568 70%, #718096 100%)',
        animation: 'thunder 3s ease-in-out infinite'
      };
    } else if (conditionLower.includes('snow')) {
      return {
        background: isDay
          ? 'linear-gradient(to bottom, #cbd5e0 0%, #e2e8f0 50%, #f7fafc 100%)'
          : 'linear-gradient(to bottom, #2d3748 0%, #4a5568 50%, #718096 100%)',
        animation: 'snow 15s linear infinite'
      };
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return {
        background: isDay
          ? 'linear-gradient(to bottom, #7c8ea6 0%, #a8b8d0 50%, #d4dce8 100%)'
          : 'linear-gradient(to bottom, #1e293b 0%, #334155 50%, #475569 100%)'
      };
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return {
        background: 'linear-gradient(to bottom, #9ca3af 0%, #d1d5db 50%, #e5e7eb 100%)',
        animation: 'fog 25s ease-in-out infinite'
      };
    }

    // 16-bit Clear sky - time-based gradients with smoother transitions
    if (isDawn) {
      return {
        background: 'linear-gradient(to bottom, #ff1493 0%, #ff69b4 20%, #ffa500 40%, #ffb347 60%, #87ceeb 80%, #4a90e2 100%)'
      };
    } else if (isMorning) {
      return {
        background: 'linear-gradient(to bottom, #00bfff 0%, #1e90ff 30%, #4169e1 60%, #6495ed 100%)'
      };
    } else if (isAfternoon) {
      return {
        background: 'linear-gradient(to bottom, #1e90ff 0%, #4169e1 25%, #6495ed 50%, #87ceeb 75%, #b0d4f1 100%)'
      };
    } else if (isDusk) {
      return {
        background: 'linear-gradient(to bottom, #ff1493 0%, #ff69b4 20%, #ff6b9d 40%, #9370db 60%, #483d8b 80%, #2c1f4a 100%)'
      };
    } else if (isNight) {
      return {
        background: 'linear-gradient(to bottom, #000033 0%, #000066 25%, #000099 50%, #0f3460 75%, #1a1a2e 100%)'
      };
    }

    // Default 16-bit sunny day
    return {
      background: 'linear-gradient(to bottom, #00bfff 0%, #1e90ff 25%, #4169e1 50%, #6495ed 75%, #87ceeb 100%)'
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        ...backgroundStyle,
        transition: 'background 1s ease-in-out'
      }}>
        {/* Animated elements based on weather */}
        {condition.toLowerCase().includes('rain') && (
          <div className="rain-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {condition.toLowerCase().includes('snow') && (
          <div className="snow-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="snowflake"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  fontSize: `${10 + Math.random() * 10}px`
                }}
              >
                ❄
              </div>
            ))}
          </div>
        )}

        {(currentHour >= 19 || currentHour < 5) && !condition.toLowerCase().includes('rain') && (
          <div className="stars-container">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Sun or Moon */}
        {isDay && !condition.toLowerCase().includes('rain') && !condition.toLowerCase().includes('storm') && (
          <div className="sun" style={{
            position: 'absolute',
            top: currentHour < 12 ? '10%' : '20%',
            right: currentHour < 12 ? '15%' : '10%',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, #ffd700 0%, #ffed4e 50%, transparent 70%)',
            borderRadius: '50%',
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)',
            animation: 'pulse 4s ease-in-out infinite'
          }} />
        )}

        {!isDay && (
          <div className="moon" style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, #f0f0f0 0%, #d0d0d0 50%, transparent 70%)',
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(240, 240, 240, 0.6)',
            animation: 'moonGlow 3s ease-in-out infinite'
          }} />
        )}
      </div>

      <style jsx>{`
        .rain-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .raindrop {
          position: absolute;
          width: 2px;
          height: 15px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
          animation: fall linear infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }

        .snow-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          color: white;
          opacity: 0.8;
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes moonGlow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(240, 240, 240, 0.6);
          }
          50% {
            box-shadow: 0 0 60px rgba(240, 240, 240, 0.8);
          }
        }

        @keyframes thunder {
          0%, 90%, 100% {
            opacity: 1;
          }
          93%, 97% {
            opacity: 0.7;
          }
          95% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
