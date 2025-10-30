import { useState } from 'react';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'linear-gradient(135deg, rgba(45, 53, 97, 0.95) 0%, rgba(31, 37, 68, 0.95) 100%)',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        boxShadow: isHovered 
          ? '0 8px 32px rgba(78, 205, 196, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: '2px solid',
        borderImage: 'linear-gradient(45deg, #4ecdc4, #44a8ff, #ff6b9d) 1',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Logo Icon */}
      <div style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Sun */}
        <div style={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 50%, #ff9800 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(255, 235, 59, 0.6), inset -2px -2px 4px rgba(255, 152, 0, 0.5)',
          animation: isHovered ? 'pixelPulse 1s ease-in-out infinite' : 'glow 2s ease-in-out infinite',
          top: '2px',
          left: '2px'
        }} />
        
        {/* Cloud */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          right: '0',
          width: '20px',
          height: '12px',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(187, 222, 251, 0.4), inset -1px -1px 2px rgba(144, 202, 249, 0.5)',
          animation: isHovered ? 'float 2s ease-in-out infinite' : 'none',
          zIndex: 1
        }}>
          {/* Cloud puffs */}
          <div style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: '50%',
            top: '-6px',
            left: '2px'
          }} />
          <div style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: '50%',
            top: '-4px',
            right: '2px'
          }} />
        </div>

        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '6px',
              background: 'linear-gradient(to bottom, #ffd700, transparent)',
              top: '50%',
              left: '50%',
              transformOrigin: '1px 1px',
              transform: `rotate(${i * 45}deg) translateY(-16px)`,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
              animation: isHovered ? `rayPulse 2s ease-in-out infinite ${i * 0.1}s` : 'none'
            }}
          />
        ))}
      </div>

      {/* App Name */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.2
      }}>
        <span style={{
          fontSize: '1.2rem',
          fontWeight: 400,
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a8ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: '\'VT323\', monospace',
          letterSpacing: '1px',
          textShadow: 'none',
          transition: 'all 0.3s ease'
        }}>
          SKYSCOPE
        </span>
        <span style={{
          fontSize: '0.9rem',
          color: '#ff6b9d',
          fontWeight: 400,
          fontFamily: '\'VT323\', monospace',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(255, 107, 157, 0.5)'
        }}>
          16-BIT
        </span>
      </div>

      {/* Animated indicator dot */}
      <div style={{
        width: '10px',
        height: '10px',
        background: 'radial-gradient(circle, #4ecdc4 0%, #44a8ff 100%)',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(78, 205, 196, 0.8)',
        animation: 'glow 2s ease-in-out infinite'
      }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes pixelPulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1.3);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(78, 205, 196, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(78, 205, 196, 1);
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes rayPulse {
          0%, 100% {
            opacity: 0.7;
            height: 6px;
          }
          50% {
            opacity: 1;
            height: 8px;
          }
        }

        @media (max-width: 640px) {
          div {
            padding: 0.5rem 0.75rem !important;
            gap: 0.5rem !important;
          }
          
          span:first-of-type {
            font-size: 0.9rem !important;
          }
          
          span:last-of-type {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </div>
  );
}
