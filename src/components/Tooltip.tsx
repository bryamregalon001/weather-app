import { useState } from 'react';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'help',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#3b82f6',
          padding: 0,
          transition: 'all 0.2s ease',
          marginLeft: '0.25rem'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {children || 'i'}
      </button>
      
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '0.5rem',
          background: 'rgba(30, 41, 59, 0.95)',
          color: 'white',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.2s ease-in-out',
          maxWidth: '200px',
          textAlign: 'center',
          lineHeight: 1.4
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(30, 41, 59, 0.95)'
          }} />
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
