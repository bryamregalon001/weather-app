import { useState, useEffect } from 'react';
import { ForecastDay } from '@/types/weather';

const getWeatherIcon = (condition: string, isDay: boolean = true) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || (conditionLower.includes('clear') && isDay)) {
    return '☀️';
  } else if (conditionLower.includes('clear') && !isDay) {
    return '🌙';
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

const getWeekdayName = (dateString: string, index: number) => {
  const date = new Date(dateString);
  const today = new Date();
  
  if (index === 0) return 'Today';
  if (date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface ForecastProps {
  forecast: ForecastDay[];
  onDaySelect?: (day: ForecastDay) => void;
  selectedDayIndex?: number;
}

export default function Forecast({ forecast, onDaySelect, selectedDayIndex = 0 }: ForecastProps) {
  const [selectedDay, setSelectedDay] = useState<number>(selectedDayIndex);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [showHourly, setShowHourly] = useState<boolean>(false);

  useEffect(() => {
    if (forecast && forecast[selectedDay]?.hour) {
      setHourlyForecast(forecast[selectedDay].hour);
    }
  }, [selectedDay, forecast]);

  if (!forecast || forecast.length === 0) return null;

  const handleDayClick = (index: number, day: ForecastDay) => {
    setSelectedDay(index);
    setShowHourly(false);
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  const toggleHourlyView = () => {
    setShowHourly(!showHourly);
  };

  const selectedDayData = forecast[selectedDay] || forecast[0];
  const weatherIcon = getWeatherIcon(selectedDayData.day.condition.text, true);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginTop: '1.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1e293b',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>📅</span> Forecast
        </h2>
        
        <button
          onClick={toggleHourlyView}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            color: '#1e40af',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.background = 'rgba(59, 130, 246, 0.2)';
          }}
          onMouseOut={(e) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.background = 'rgba(59, 130, 246, 0.1)';
          }}
        >
          {showHourly ? (
            <>
              <span>🌡️</span>
              <span>Hourly Forecast</span>
            </>
          ) : (
            <>
              <span>📅</span>
              <span>Daily Forecast</span>
            </>
          )}
        </button>
      </div>

      {showHourly ? (
        <div style={{
          marginTop: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            paddingBottom: '0.5rem',
            minWidth: 'max-content'
          }}>
            {hourlyForecast.slice(0, 24).map((hour, index) => {
              const hourTime = new Date(hour.time_epoch * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true });
              const isDay = hour.is_day === 1;
              const weatherIcon = getWeatherIcon(hour.condition.text, isDay);
              
              return (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  padding: '1rem',
                  minWidth: '80px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 12px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                }}
                >
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    {hourTime}
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    margin: '0.5rem 0',
                    lineHeight: 1
                  }}>
                    {weatherIcon}
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginTop: '0.5rem'
                  }}>
                    {Math.round(hour.temp_c)}°
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    marginTop: '0.25rem'
                  }}>
                    {hour.chance_of_rain}% 🌧️
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Daily Forecast Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}>
            {forecast.slice(0, 7).map((day, index) => {
              const isSelected = index === selectedDay;
              const dayName = getWeekdayName(day.date, index);
              const dayWeatherIcon = getWeatherIcon(day.day.condition.text, true);
              
              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(index, day)}
                  style={{
                    flex: '1',
                    minWidth: '100px',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                    color: isSelected ? '#1e40af' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: isSelected ? '2px solid #1e40af' : '2px solid transparent',
                    fontWeight: isSelected ? 600 : 500
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    if (!isSelected) {
                      target.style.background = 'rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    if (!isSelected) {
                      target.style.background = 'rgba(0, 0, 0, 0.02)';
                    } else {
                      target.style.background = 'rgba(59, 130, 246, 0.1)';
                    }
                  }}
                >
                  <span style={{
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {dayName}
                  </span>
                  <span style={{
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    margin: '0.25rem 0'
                  }}>
                    {dayWeatherIcon}
                  </span>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ fontWeight: 600 }}>{Math.round(day.day.maxtemp_c)}°</span>
                    <span style={{ opacity: 0.7 }}>{Math.round(day.day.mintemp_c)}°</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Details */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  margin: '0 0 0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{getWeekdayName(selectedDayData.date, selectedDay)}</span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: '#64748b',
                    opacity: 0.8
                  }}>
                    {getFormattedDate(selectedDayData.date)}
                  </span>
                </h3>
                <p style={{
                  color: '#64748b',
                  margin: 0,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{selectedDayData.day.condition.text}</span>
                  {selectedDayData.day.daily_chance_of_rain > 0 && (
                    <span style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#1e40af',
                      fontSize: '0.8rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      💧 {selectedDayData.day.daily_chance_of_rain}%
                    </span>
                  )}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  marginRight: '0.5rem'
                }}>
                  {weatherIcon}
                </div>
                <div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    {Math.round(selectedDayData.day.avgtemp_c)}°
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.25rem'
                  }}>
                    <span>🌡️ H: {Math.round(selectedDayData.day.maxtemp_c)}°</span>
                    <span>L: {Math.round(selectedDayData.day.mintemp_c)}°</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <div style={{
                background: 'rgba(99, 102, 241, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>💨</span> Wind
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1e293b'
                }}>
                  {selectedDayData.day.maxwind_kph} km/h
                </div>
                {selectedDayData.day.maxwind_kph > 20 && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#ef4444',
                    marginTop: '0.25rem'
                  }}>
                    Windy conditions
                  </div>
                )}
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>💧</span> Humidity
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1e293b'
                }}>
                  {selectedDayData.day.avghumidity}%
                </div>
                <div style={{
                  height: '4px',
                  background: '#e2e8f0',
                  borderRadius: '2px',
                  marginTop: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${selectedDayData.day.avghumidity}%`,
                    height: '100%',
                    background: '#3b82f6',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>

              <div style={{
                background: 'rgba(234, 88, 12, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>☀️</span> UV Index
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: (() => {
                    const uv = selectedDayData.day.uv;
                    if (uv <= 2) return '#22c55e'; // Low
                    if (uv <= 5) return '#f59e0b'; // Moderate
                    if (uv <= 7) return '#f97316'; // High
                    if (uv <= 10) return '#ef4444'; // Very High
                    return '#b91c1c'; // Extreme
                  })()
                }}>
                  {selectedDayData.day.uv}
                  <span style={{
                    fontSize: '0.8rem',
                    marginLeft: '0.25rem',
                    opacity: 0.8
                  }}>
                    {selectedDayData.day.uv <= 2 ? 'Low' : 
                     selectedDayData.day.uv <= 5 ? 'Moderate' : 
                     selectedDayData.day.uv <= 7 ? 'High' : 
                     selectedDayData.day.uv <= 10 ? 'Very High' : 'Extreme'}
                  </span>
                </div>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>🌅</span> Sunrise/Sunset
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  gap: '0.5rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}>
                      {selectedDayData.astro.sunrise}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b'
                    }}>
                      Sunrise
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}>
                      {selectedDayData.astro.sunset}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b'
                    }}>
                      Sunset
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Look at Next Days */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#64748b',
              margin: '0 0 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📅</span> Next Days
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '0.75rem'
            }}>
              {forecast.slice(1, 5).map((day, index) => {
                const dayName = getWeekdayName(day.date, index + 1);
                const weatherIcon = getWeatherIcon(day.day.condition.text, true);
                
                return (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 4px 12px -1px rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                  }}
                  onClick={() => handleDayClick(index + 1, day)}
                  >
                    <div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#1e293b',
                        marginBottom: '0.25rem'
                      }}>
                        {dayName}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        {day.day.daily_chance_of_rain > 0 && (
                          <span>💧 {day.day.daily_chance_of_rain}%</span>
                        )}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '1.2rem',
                        lineHeight: 1,
                        marginBottom: '0.25rem'
                      }}>
                        {weatherIcon}
                      </span>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}>
                        <span>{Math.round(day.day.maxtemp_c)}°</span>
                        <span style={{ opacity: 0.6 }}>{Math.round(day.day.mintemp_c)}°</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
