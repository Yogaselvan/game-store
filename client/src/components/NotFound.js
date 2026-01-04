import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-animation">
          <div className="error-code">404</div>
          <div className="error-glitch">404</div>
          <div className="error-glitch">404</div>
        </div>
        
        <div className="error-message">
          <h1>Oops! Page Not Found</h1>
          <p>The page you're looking for seems to have gone on an adventure without us!</p>
          <p className="error-subtitle">
            Maybe it's busy playing games or got lost in our vast game library.
          </p>
        </div>

        <div className="error-actions">
          <button className="home-button" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Back to Home
          </button>
          
          <button className="search-button" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search Games
          </button>
        </div>

        <div className="error-suggestions">
          <h3>What you can do:</h3>
          <ul>
            <li>🎮 Browse our amazing game collection</li>
            <li>🔍 Search for your favorite games</li>
            <li>💰 Check out the latest deals and discounts</li>
            <li>❤️ Add games to your wishlist</li>
          </ul>
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-game game-1">🎮</div>
        <div className="floating-game game-2">🕹️</div>
        <div className="floating-game game-3">🎯</div>
        <div className="floating-game game-4">⚡</div>
        <div className="floating-game game-5">🚀</div>
      </div>
    </div>
  );
}

export default NotFound;