import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`search-form ${isFocused ? 'focused' : ''}`}
      style={{
        maxWidth: '600px',
        margin: '0 auto 2rem',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        boxShadow: isFocused 
          ? '0 4px 20px rgba(59, 130, 246, 0.3)' 
          : '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '50px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
        border: `2px solid ${isFocused ? '#3b82f6' : 'transparent'}`,
        transition: 'all 0.3s ease'
      }}>
        <div 
          style={{
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onClick={() => inputRef.current?.focus()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: 'all 0.3s ease',
              transform: loading ? 'scale(1.1)' : 'scale(1)',
              opacity: loading ? 0.7 : 1
            }}
          >
            <path 
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
              stroke={isFocused ? '#3b82f6' : '#64748b'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M21 21L16.65 16.65" 
              stroke={isFocused ? '#3b82f6' : '#64748b'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          style={{
            flex: 1,
            padding: '0.8rem 0.5rem 0.8rem 0',
            border: 'none',
            background: 'transparent',
            fontSize: '1rem',
            outline: 'none',
            color: '#1e293b',
            minWidth: '200px'
          }}
          disabled={loading}
        />
        
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.6,
              transition: 'opacity 0.2s',
              color: '#64748b'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        
        <button
          type="submit"
          disabled={!query.trim() || loading}
          style={{
            background: loading ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
            opacity: !query.trim() ? 0.5 : 1,
            pointerEvents: !query.trim() ? 'none' : 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            if (query.trim() && !loading) {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (query.trim() && !loading) {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Searching...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
      
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 640px) {
          .search-form {
            padding: 0 1rem;
          }
          
          input {
            min-width: 120px !important;
          }
        }
      `}</style>
    </form>
  );
}
