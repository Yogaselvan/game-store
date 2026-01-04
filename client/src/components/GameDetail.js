import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameDetail.css';

function GameDetail({ game, currency, onAddToCart }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (basePrice, curr) => {
    if (!curr || !basePrice) return `$${basePrice || 0}`;
    
    const convertedPrice = basePrice * curr.rate;
    return `${curr.symbol}${curr.code === 'JPY' ? Math.round(convertedPrice) : convertedPrice.toFixed(2)}`;
  };

  const screenshots = [
    game?.image_url || 'https://via.placeholder.com/800x450/1a1a2e/ffffff?text=Game+Image',
    'https://images.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg',
    'https://images.rawg.io/media/screenshots/847/8478ccf6ae903e6620b05b5bf7ffcc64.jpg',
    'https://images.rawg.io/media/screenshots/d8f/d8f82e1b6d4fefb22e851c23efde5b68.jpg'
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(game);
    }
  };

  if (!game) {
    return (
      <div className="game-not-found">
        <h2>Game Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Store</button>
      </div>
    );
  }

  return (
    <div className="game-detail">
      {/* Header */}
      <div className="game-detail-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Store
        </button>
      </div>

      <div className="game-detail-content">
        {/* Media Section */}
        <div className="game-media">
          <div className="main-image">
            <img src={screenshots[selectedImage]} alt={game.name} />
          </div>
          
          <div className="screenshot-gallery">
            {screenshots.map((image, index) => (
              <button
                key={index}
                className={`screenshot-thumb ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`Screenshot ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Game Info */}
        <div className="game-info">
          <div className="game-header">
            <h1>{game.name}</h1>
            <div className="game-meta">
              <span className="platform-badge">{game.platform}</span>
              <span className="region-badge">{game.region || 'Global'}</span>
              {game.edition && <span className="edition-badge">{game.edition}</span>}
            </div>
          </div>

          <div className="game-description">
            <h3>About this game</h3>
            <p>
              {game.name === 'FIFA 23' ? 
                'FIFA 23 brings The World\'s Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, both the men\'s and women\'s FIFA World Cup™, cross-play features, and more ways to play your favorite modes.' :
                game.name === 'Red Dead Redemption 2' ?
                'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age.' :
                game.name === 'Split Fiction' ?
                'Split Fiction is an innovative co-op adventure that takes you on a journey through fantastical worlds where creativity has no limits. Work together to solve puzzles and overcome challenges.' :
                `Experience the ultimate gaming adventure with ${game.name}. Immerse yourself in stunning graphics, compelling gameplay, and an unforgettable story that will keep you engaged for hours.`
              }
            </p>
            
            <div className="game-features">
              <h4>Key Features:</h4>
              <ul>
                <li>Stunning high-definition graphics</li>
                <li>Immersive gameplay experience</li>
                <li>Rich storyline and character development</li>
                <li>Multiplayer support</li>
                <li>Regular content updates</li>
              </ul>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="purchase-section">
            <div className="price-section">
              {game.discount > 0 && (
                <div className="original-price">
                  <span className="crossed-price">{formatPrice(game.original_price, currency)}</span>
                  <span className="discount-badge">-{game.discount}%</span>
                </div>
              )}
              <div className="current-price">{formatPrice(game.price, currency)}</div>
              {game.cashback > 0 && (
                <div className="cashback-info">
                  <span className="cashback-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {game.cashback}% Cashback
                  </span>
                </div>
              )}
            </div>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="purchase-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to Cart
              </button>
              
              <button className="buy-now-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Buy Now
              </button>
            </div>

            <div className="payment-methods">
              <h4>Accepted Payment Methods</h4>
              <div className="payment-icons">
                <div className="payment-method">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                </div>
                <div className="payment-method">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                </div>
                <div className="payment-method">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" />
                </div>
                <div className="payment-method">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" />
                </div>
              </div>
            </div>

            <div className="security-features">
              <div className="security-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure Payment
              </div>
              <div className="security-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Instant Delivery
              </div>
              <div className="security-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4" />
                  <rect x="2" y="9" width="20" height="12" rx="2" ry="2" />
                </svg>
                Money Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;