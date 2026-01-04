import React, { useEffect } from 'react';
import './GameModal.css';

function GameModal({ 
  game, 
  onClose, 
  onAddToCart, 
  onToggleWishlist,
  isInWishlist,
  isInCart 
}) {
  const hasDiscount = game.discount && game.discount > 0;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img 
              src={game.image_url} 
              alt={game.name}
              className="modal-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x500/1a1a2e/667eea?text=' + encodeURIComponent(game.name);
              }}
            />
            {hasDiscount && (
              <div className="modal-discount">-{game.discount}% OFF</div>
            )}
          </div>
          
          <div className="modal-info-section">
            <div className="modal-platform">
              <span className="platform-badge">{game.platform}</span>
              <span className="region-badge">{game.region}</span>
            </div>
            
            <h2 className="modal-title">{game.name}</h2>
            
            <div className="modal-rating">
              <div className="stars-large">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star-large ${star <= Math.round(game.rating) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">{game.rating?.toFixed(1)} out of 5</span>
            </div>
            
            <p className="modal-description">
              Experience the ultimate gaming adventure with {game.name}. 
              Available now on {game.platform} with instant key delivery.
              Join millions of players worldwide and dive into an unforgettable experience.
            </p>
            
            <div className="modal-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Instant Delivery</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure Purchase</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <span>{game.region} Region</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📦</span>
                <span>{game.stock} In Stock</span>
              </div>
            </div>
            
            <div className="modal-price-section">
              <div className="price-display">
                {hasDiscount && (
                  <span className="modal-original-price">${game.original_price?.toFixed(2)}</span>
                )}
                <span className="modal-current-price">${game.price.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="savings">You save ${(game.original_price - game.price).toFixed(2)}!</span>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className={`modal-cart-btn ${isInCart ? 'in-cart' : ''}`}
                onClick={onAddToCart}
                disabled={game.stock === 0}
              >
                {isInCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <button 
                className={`modal-wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={onToggleWishlist}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="modal-trust">
              <span>🛡️ 100% Secure Payment</span>
              <span>📧 24/7 Support</span>
              <span>↩️ Refund Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameModal;
