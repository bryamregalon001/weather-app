import { useState } from 'react';

interface MiniMapProps {
  location: string;
  lat: number;
  lon: number;
  onLocationSelect?: (city: string) => void;
}

interface Country {
  name: string;
  city: string;
  flag: string;
  x: number;
  y: number;
}

const countries: Country[] = [
  { name: 'USA', city: 'New York', flag: '🇺🇸', x: 20, y: 35 },
  { name: 'Canada', city: 'Toronto', flag: '🇨🇦', x: 22, y: 25 },
  { name: 'Mexico', city: 'Mexico City', flag: '🇲🇽', x: 18, y: 45 },
  { name: 'Brazil', city: 'São Paulo', flag: '🇧🇷', x: 35, y: 65 },
  { name: 'Argentina', city: 'Buenos Aires', flag: '🇦🇷', x: 32, y: 75 },
  { name: 'UK', city: 'London', flag: '🇬🇧', x: 48, y: 28 },
  { name: 'France', city: 'Paris', flag: '🇫🇷', x: 50, y: 32 },
  { name: 'Germany', city: 'Berlin', flag: '🇩🇪', x: 52, y: 30 },
  { name: 'Spain', city: 'Madrid', flag: '🇪🇸', x: 48, y: 36 },
  { name: 'Italy', city: 'Rome', flag: '🇮🇹', x: 53, y: 36 },
  { name: 'Russia', city: 'Moscow', flag: '🇷🇺', x: 60, y: 25 },
  { name: 'China', city: 'Beijing', flag: '🇨🇳', x: 75, y: 35 },
  { name: 'Japan', city: 'Tokyo', flag: '🇯🇵', x: 82, y: 35 },
  { name: 'South Korea', city: 'Seoul', flag: '🇰🇷', x: 80, y: 36 },
  { name: 'India', city: 'Mumbai', flag: '🇮🇳', x: 68, y: 45 },
  { name: 'Australia', city: 'Sydney', flag: '🇦🇺', x: 82, y: 70 },
  { name: 'South Africa', city: 'Cape Town', flag: '🇿🇦', x: 52, y: 72 },
  { name: 'Egypt', city: 'Cairo', flag: '🇪🇬', x: 54, y: 42 },
  { name: 'UAE', city: 'Dubai', flag: '🇦🇪', x: 60, y: 44 },
  { name: 'Thailand', city: 'Bangkok', flag: '🇹🇭', x: 73, y: 48 },
  { name: 'Singapore', city: 'Singapore', flag: '🇸🇬', x: 74, y: 52 },
  { name: 'Indonesia', city: 'Jakarta', flag: '🇮🇩', x: 76, y: 54 },
  { name: 'Turkey', city: 'Istanbul', flag: '🇹🇷', x: 55, y: 36 },
  { name: 'Greece', city: 'Athens', flag: '🇬🇷', x: 54, y: 37 },
  { name: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', x: 50, y: 29 },
  { name: 'Sweden', city: 'Stockholm', flag: '🇸🇪', x: 52, y: 24 },
  { name: 'Norway', city: 'Oslo', flag: '🇳🇴', x: 51, y: 22 },
  { name: 'Poland', city: 'Warsaw', flag: '🇵🇱', x: 54, y: 30 },
  { name: 'Portugal', city: 'Lisbon', flag: '🇵🇹', x: 46, y: 37 },
  { name: 'Chile', city: 'Santiago', flag: '🇨🇱', x: 28, y: 72 },
];

export default function MiniMap({ location, lat, lon, onLocationSelect }: MiniMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country.name);
    if (onLocationSelect) {
      onLocationSelect(country.city);
    }
  };
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(45, 53, 97, 0.9) 0%, rgba(31, 37, 68, 0.9) 100%)',
      border: '3px solid',
      borderImage: 'linear-gradient(45deg, #4ecdc4, #44a8ff, #ff6b9d) 1',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontFamily: "'VT323', monospace",
        color: '#4ecdc4',
        marginBottom: '0.75rem',
        textShadow: '0 2px 10px rgba(78, 205, 196, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>🌍</span> WORLD MAP
      </h3>

      {/* Real Geographic Map */}
      <div style={{
        width: '100%',
        maxWidth: '300px',
        aspectRatio: '1',
        margin: '0 auto',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid rgba(78, 205, 196, 0.3)',
        position: 'relative',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.2)'
      }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          style={{ 
            border: 0,
            filter: 'hue-rotate(200deg) saturate(1.5) brightness(0.9)',
            imageRendering: 'pixelated'
          }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.5},${lat-0.5},${lon+0.5},${lat+0.5}&layer=mapnik&marker=${lat},${lon}`}
          title="Location Map"
        />
        
        {/* Overlay with 16-bit effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.1) 3px)',
          pointerEvents: 'none',
          mixBlendMode: 'overlay'
        }} />

        {/* Corner decorations */}
        <div style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          width: '15px',
          height: '15px',
          borderTop: '2px solid #4ecdc4',
          borderLeft: '2px solid #4ecdc4',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '15px',
          height: '15px',
          borderTop: '2px solid #44a8ff',
          borderRight: '2px solid #44a8ff',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5px',
          left: '5px',
          width: '15px',
          height: '15px',
          borderBottom: '2px solid #ff6b9d',
          borderLeft: '2px solid #ff6b9d',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          width: '15px',
          height: '15px',
          borderBottom: '2px solid #4ecdc4',
          borderRight: '2px solid #4ecdc4',
          opacity: 0.7
        }} />
      </div>

      {/* Location Info */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(78, 205, 196, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(78, 205, 196, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            fontSize: '1.1rem',
            fontFamily: "'VT323', monospace",
            color: '#e8e8e8'
          }}>
            {location}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          fontSize: '0.95rem',
          fontFamily: "'VT323', monospace",
          color: '#4ecdc4'
        }}>
          <div>
            <span style={{ color: '#888' }}>LAT:</span> {lat.toFixed(4)}°
          </div>
          <div>
            <span style={{ color: '#888' }}>LON:</span> {lon.toFixed(4)}°
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '20px',
        height: '20px',
        borderTop: '3px solid #4ecdc4',
        borderRight: '3px solid #4ecdc4',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '20px',
        height: '20px',
        borderBottom: '3px solid #ff6b9d',
        borderLeft: '3px solid #ff6b9d',
        opacity: 0.5
      }} />
    </div>
  );
}
