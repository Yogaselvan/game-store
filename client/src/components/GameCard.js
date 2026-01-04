import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

function GameCard({ game, onAddToCart, onToggleWishlist, isWishlisted, selectedCurrency }) {
  
  const formatPrice = (basePrice, currency) => {
    if (!currency || !basePrice) return `$${basePrice || 0}`;
    
    const convertedPrice = basePrice * currency.rate;
    return `${currency.symbol}${currency.code === 'JPY' ? Math.round(convertedPrice) : convertedPrice.toFixed(2)}`;
  };

  const getPlatformInfo = (platformType) => {
    const platforms = {
      'steam': { name: 'Steam', icon: 'https://products.eneba.games/drms/v1/steam.svg', color: '#1b2838' },
      'ea app': { name: 'EA App', icon: null, color: '#ff4444' },
      'xbox live': { name: 'Xbox Live', icon: null, color: '#107c10' },
      'eshop': { name: 'Nintendo eShop', icon: null, color: '#e60012' },
      'gog': { name: 'GOG.com', icon: null, color: '#86328a' },
      'rockstar': { name: 'Rockstar', icon: null, color: '#fcaf17' },
      'origin': { name: 'Origin', icon: null, color: '#f56c2d' },
      'psn': { name: 'PlayStation', icon: null, color: '#003087' },
      'ubisoft': { name: 'Ubisoft Connect', icon: null, color: '#0070ff' },
    };
    return platforms[platformType?.toLowerCase()] || { name: platformType || 'PC', icon: null, color: '#00d4aa' };
  };

  const platformInfo = getPlatformInfo(game.platform_type);
  const wishlistCount = Math.floor(Math.random() * 10000) + 500;

  return (
    <Link to={`/game/${game.id}`} className="game-card-link">
      <div className="eneba-card">
        {/* Card Image */}
        <div className="card-image-wrapper">
          <img 
            src={game.image_url} 
            alt={game.name}
            className="card-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/280x370/1a1a2e/ffffff?text=' + encodeURIComponent(game.name);
            }}
          />
          
          {/* Platform Badge */}
          <div className="platform-badge">
            <span className="platform-dot" style={{ background: platformInfo.color }}></span>
            <span className="platform-name">{platformInfo.name}</span>
          </div>

          {/* Cashback Badge */}
          {game.cashback > 0 && (
            <div className="cashback-badge">
              <div className="cashback-icon"></div>
              <span>CASHBACK</span>
            </div>
          )}

          {/* Nintendo Switch Banner */}
          {game.platform === 'Switch' && (
            <div className="switch-corner-badge">
              Switch 2 Notice
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="card-body">
          {/* Title */}
          <h3 className="card-title">
            {game.name} {game.edition && `${game.edition}`} Key {game.region}
          </h3>
          
          {/* Region Tag */}
          <div className="region-tag">{game.region}</div>

          {/* Price Section */}
          <div className="price-section">
            {game.original_price && game.discount > 0 && (
              <div className="price-row">
                <span className="price-from">From</span>
                <span className="original-price">{formatPrice(game.original_price, selectedCurrency)}</span>
                <span className="discount-badge">-{game.discount}%</span>
              </div>
            )}
            <div className="current-price">{formatPrice(game.price, selectedCurrency)}</div>
          </div>

          {/* Cashback Text */}
          {game.cashback > 0 && (
            <div className="cashback-text">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="#00d4aa">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              Cashback: €{(game.cashback * 5).toFixed(2)}
            </div>
          )}

          {/* Wishlist Row */}
          <div className="wishlist-row">
            <button 
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleWishlist(game);
              }}
              aria-label="Add to wishlist"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <span className="wishlist-count">{wishlistCount.toLocaleString()}</span>
          </div>

          {/* Add to Cart Button */}
          <button 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(game);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
