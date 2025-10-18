import Tooltip from './Tooltip';

interface WeatherDetailsProps {
  pressure: number;
  visibility: number;
  cloud: number;
  windDir: string;
  sunrise?: string;
  sunset?: string;
}

export default function WeatherDetails({ 
  pressure, 
  visibility, 
  cloud, 
  windDir,
  sunrise,
  sunset 
}: WeatherDetailsProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(45, 53, 97, 0.9) 0%, rgba(31, 37, 68, 0.9) 100%)',
      border: '3px solid',
      borderImage: 'linear-gradient(45deg, #4ecdc4, #44a8ff, #ff6b9d) 1',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{
        fontSize: '1.3rem',
        fontFamily: "'VT323', monospace",
        color: '#4ecdc4',
        marginBottom: '1rem',
        textShadow: '0 2px 10px rgba(78, 205, 196, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>📊</span> WEATHER DETAILS
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem'
      }}>
        {/* Pressure */}
        <div style={{
          background: 'rgba(68, 168, 255, 0.1)',
          borderRadius: '8px',
          padding: '1rem',
          border: '2px solid rgba(68, 168, 255, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.8rem'
            }}>🌡️</span>
            <Tooltip text="Atmospheric pressure in millibars. Normal is around 1013 mb." />
          </div>
          <div style={{
            fontSize: '0.9rem',
            fontFamily: "'VT323', monospace",
            color: '#888',
            marginBottom: '0.25rem'
          }}>
            Pressure
          </div>
          <div style={{
            fontSize: '1.4rem',
            fontFamily: "'VT323', monospace",
            color: '#44a8ff',
            fontWeight: 600
          }}>
            {pressure} mb
          </div>
        </div>

        {/* Visibility */}
        <div style={{
          background: 'rgba(78, 205, 196, 0.1)',
          borderRadius: '8px',
          padding: '1rem',
          border: '2px solid rgba(78, 205, 196, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.8rem'
            }}>👁️</span>
            <Tooltip text="How far you can see. Higher is better visibility." />
          </div>
          <div style={{
            fontSize: '0.9rem',
            fontFamily: "'VT323', monospace",
            color: '#888',
            marginBottom: '0.25rem'
          }}>
            Visibility
          </div>
          <div style={{
            fontSize: '1.4rem',
            fontFamily: "'VT323', monospace",
            color: '#4ecdc4',
            fontWeight: 600
          }}>
            {visibility} km
          </div>
        </div>

        {/* Cloud Cover */}
        <div style={{
          background: 'rgba(255, 107, 157, 0.1)',
          borderRadius: '8px',
          padding: '1rem',
          border: '2px solid rgba(255, 107, 157, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.8rem'
            }}>☁️</span>
            <Tooltip text="Percentage of sky covered by clouds." />
          </div>
          <div style={{
            fontSize: '0.9rem',
            fontFamily: "'VT323', monospace",
            color: '#888',
            marginBottom: '0.25rem'
          }}>
            Cloud Cover
          </div>
          <div style={{
            fontSize: '1.4rem',
            fontFamily: "'VT323', monospace",
            color: '#ff6b9d',
            fontWeight: 600
          }}>
            {cloud}%
          </div>
        </div>

        {/* Wind Direction */}
        <div style={{
          background: 'rgba(147, 112, 219, 0.1)',
          borderRadius: '8px',
          padding: '1rem',
          border: '2px solid rgba(147, 112, 219, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.8rem'
            }}>🧭</span>
            <Tooltip text="Direction from which the wind is blowing." />
          </div>
          <div style={{
            fontSize: '0.9rem',
            fontFamily: "'VT323', monospace",
            color: '#888',
            marginBottom: '0.25rem'
          }}>
            Wind Dir
          </div>
          <div style={{
            fontSize: '1.4rem',
            fontFamily: "'VT323', monospace",
            color: '#9370db',
            fontWeight: 600
          }}>
            {windDir}
          </div>
        </div>

        {/* Sunrise */}
        {sunrise && (
          <div style={{
            background: 'rgba(255, 193, 7, 0.1)',
            borderRadius: '8px',
            padding: '1rem',
            border: '2px solid rgba(255, 193, 7, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '1.8rem'
              }}>🌅</span>
              <Tooltip text="Time of sunrise today." />
            </div>
            <div style={{
              fontSize: '0.9rem',
              fontFamily: "'VT323', monospace",
              color: '#888',
              marginBottom: '0.25rem'
            }}>
              Sunrise
            </div>
            <div style={{
              fontSize: '1.4rem',
              fontFamily: "'VT323', monospace",
              color: '#ffc107',
              fontWeight: 600
            }}>
              {sunrise}
            </div>
          </div>
        )}

        {/* Sunset */}
        {sunset && (
          <div style={{
            background: 'rgba(255, 87, 34, 0.1)',
            borderRadius: '8px',
            padding: '1rem',
            border: '2px solid rgba(255, 87, 34, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '1.8rem'
              }}>🌇</span>
              <Tooltip text="Time of sunset today." />
            </div>
            <div style={{
              fontSize: '0.9rem',
              fontFamily: "'VT323', monospace",
              color: '#888',
              marginBottom: '0.25rem'
            }}>
              Sunset
            </div>
            <div style={{
              fontSize: '1.4rem',
              fontFamily: "'VT323', monospace",
              color: '#ff5722',
              fontWeight: 600
            }}>
              {sunset}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
