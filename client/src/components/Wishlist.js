import React from 'react';
import './Wishlist.css';

function Wishlist({ wishlist, onClose, onRemoveFromWishlist, onAddToCart }) {
  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <h2>My Wishlist ({wishlist.length})</h2>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Wishlist Content */}
        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h3>Your wishlist is empty</h3>
              <p>Save your favorite games here and they will appear in this list.</p>
              <button className="browse-btn" onClick={onClose}>
                Browse Games
              </button>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlist.map((game) => (
                <div key={game.id} className="wishlist-item">
                  <div className="game-image-container">
                    <img src={game.image} alt={game.name} className="game-image" />
                    <div className="image-overlay">
                      <button 
                        className="quick-add-btn"
                        onClick={() => onAddToCart && onAddToCart(game)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="game-info">
                    <h4 className="game-title">{game.name}</h4>
                    <p className="game-platform">{game.platform}</p>
                    
                    <div className="game-price-section">
                      <span className="current-price">₹{game.price}</span>
                      {game.discount > 0 && (
                        <>
                          <span className="original-price">₹{(game.price / (1 - game.discount / 100)).toFixed(2)}</span>
                          <span className="discount-badge">-{game.discount}%</span>
                        </>
                      )}
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart && onAddToCart(game)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Add to Cart
                      </button>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(game)}
                        title="Remove from wishlist"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="wishlist-footer">
            <div className="wishlist-summary">
              <span>Total items: {wishlist.length}</span>
            </div>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;