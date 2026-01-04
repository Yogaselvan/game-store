import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions] = useState([
    'FIFA 23', 'Red Dead Redemption 2', 'Split Fiction',
    'Cyberpunk 2077', 'Elden Ring', 'Grand Theft Auto V'
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setFilteredSuggestions([]);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setFilteredSuggestions([]);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setFilteredSuggestions([]);
  };

  const quickSearches = [
    { label: '🔥 Hot Deals', query: '' },
    { label: '⚽ FIFA 23', query: 'fifa' },
    { label: '🤠 Red Dead', query: 'red dead' },
    { label: '🎭 Split Fiction', query: 'split' }
  ];

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <div className="search-input-wrapper">
          <span className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          <span className="btn-text">Search</span>
          <span className="btn-icon">→</span>
        </button>
        
        {/* Suggestions Dropdown */}
        {isFocused && filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">🎮</span>
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </form>
      
      {/* Quick Search Tags */}
      <div className="quick-searches">
        <span className="quick-label">Quick search:</span>
        {quickSearches.map((item, index) => (
          <button
            key={index}
            className="quick-tag"
            onClick={() => {
              setQuery(item.query);
              onSearch(item.query);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
