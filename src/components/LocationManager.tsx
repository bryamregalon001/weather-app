import { useState, useEffect } from 'react';
import { Location } from '@/types/weather';

interface LocationManagerProps {
  onLocationSelect: (location: Location) => void;
  currentLocation: Location;
}

const defaultLocations: Location[] = [
  { id: 'current', name: 'My Location', country: 'Current', lat: 0, lon: 0, isCurrent: true },
  { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
  { id: 'newyork', name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
];

export default function LocationManager({ onLocationSelect, currentLocation }: LocationManagerProps) {
  const [locations, setLocations] = useState<Location[]>(() => {
    const savedLocations = typeof window !== 'undefined' ? localStorage.getItem('savedLocations') : null;
    return savedLocations ? JSON.parse(savedLocations) : defaultLocations;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);

  // Save locations to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedLocations', JSON.stringify(locations));
    }
  }, [locations]);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation: Location = {
          id: `custom-${Date.now()}`,
          name: 'Current Location',
          country: 'Current',
          lat: latitude,
          lon: longitude,
          isCurrent: true
        };
        
        setLocations(prev => [
          ...prev.filter(loc => !loc.isCurrent),
          newLocation
        ]);
        
        onLocationSelect(newLocation);
        setIsGeolocating(false);
        setIsOpen(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location');
        setIsGeolocating(false);
      }
    );
  };

  const addCustomLocation = () => {
    // This would be implemented with a geocoding service in a real app
    alert('Location search would be implemented with a geocoding service');
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      position: 'relative',
      marginBottom: '1.5rem',
      zIndex: 10
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '50px',
          padding: '0.75rem 1.25rem',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
          fontSize: '1rem',
          fontWeight: 500,
          color: '#1e293b',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }}
      >
        <span>📍</span>
        <span>{currentLocation.name}, {currentLocation.country}</span>
        <span style={{ marginLeft: '0.5rem', fontSize: '0.9em', opacity: 0.7 }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          marginTop: '0.5rem',
          overflow: 'hidden',
          zIndex: 1000,
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: 'rgba(0, 0, 0, 0.02)'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.02)';
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                fontSize: '1.1rem',
                opacity: 0.7
              }}>
                🔍
              </span>
            </div>
          </div>

          <div style={{
            overflowY: 'auto',
            maxHeight: '300px',
            padding: '0.5rem 0'
          }}>
            <button
              onClick={handleGeolocation}
              disabled={isGeolocating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem',
                color: isGeolocating ? '#94a3b8' : '#1e40af',
                transition: 'all 0.2s',
                textAlign: 'left'
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
              <span style={{
                fontSize: '1.2rem',
                opacity: isGeolocating ? 0.7 : 1
              }}>
                {isGeolocating ? '⏳' : '📍'}
              </span>
              <span>
                {isGeolocating ? 'Detecting your location...' : 'Use my current location'}
              </span>
            </button>

            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    onLocationSelect(location);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    background: location.id === currentLocation.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    color: location.id === currentLocation.id ? '#1e40af' : '#1e293b',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    borderLeft: location.id === currentLocation.id ? '3px solid #1e40af' : '3px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    if (location.id !== currentLocation.id) {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (location.id !== currentLocation.id) {
                      e.currentTarget.style.background = 'transparent';
                    } else {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{location.name}</span>
                    <span style={{ fontSize: '0.85em', opacity: 0.7 }}>
                      {location.country}
                      {location.isCurrent && ' • Current Location'}
                    </span>
                  </div>
                  {location.id === currentLocation.id && (
                    <span style={{ color: '#1e40af' }}>✓</span>
                  )}
                </button>
              ))
            ) : (
              <div style={{
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.9rem'
              }}>
                No locations found. Try a different search.
              </div>
            )}
          </div>

          <div style={{
            padding: '0.75rem 1.25rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={addCustomLocation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: '1px dashed rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                fontSize: '0.85rem',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(0, 0, 0, 0.05)';
                target.style.borderColor = 'rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'transparent';
                target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
              }}
            >
              <span>+</span>
              <span>Add Location</span>
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'transparent';
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 900,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
