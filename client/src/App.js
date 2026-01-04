import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import GameCard from './components/GameCard';
import Header from './components/Header';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import GameDetail from './components/GameDetail';
import NotFound from './components/NotFound';
import { currencies } from './components/CurrencyDropdown';
import API_BASE_URL from './config';

// Game Detail Page Component
function GameDetailPage() {
  const { id } = useParams();
  return <GameDetailWrapper gameId={parseInt(id)} />;
}

// Game Detail Wrapper to access context
function GameDetailWrapper({ gameId }) {
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      const gamesData = response.data.data || [];
      setGames(gamesData);
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }, []);

  useEffect(() => {
    fetchGames();
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    // Load currency from localStorage
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency) || currencies[0];
      setSelectedCurrency(currency);
    }
  }, [fetchGames]);

  const game = games.find(g => g.id === gameId);

  if (!game && games.length > 0) {
    return <NotFound />;
  }

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCart = (game) => {
    const existing = cart.find(item => item.id === game.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item => 
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...game, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showNotificationMessage(`${game.name} added to cart!`);
  };

  if (!game) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading game details...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className={`notification ${showNotification ? 'show' : ''}`}>
        {notificationMessage}
      </div>
      <GameDetail 
        game={game} 
        cart={cart} 
        setCart={setCart} 
        currency={selectedCurrency}
        onAddToCart={addToCart}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
        <Route path="/login" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]); // Default to INR

  const fetchGames = useCallback(async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const url = query 
        ? `${API_BASE_URL}/list?search=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/list`;
      
      const response = await axios.get(url);
      const gamesData = response.data.data || [];
      setGames(gamesData);
      setFilteredGames(gamesData);
    } catch (err) {
      setError('Failed to fetch games. Please try again.');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCurrency = localStorage.getItem('currency');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency) || currencies[0];
      setSelectedCurrency(currency);
    }
  }, [fetchGames]);

  useEffect(() => {
    let result = [...games];
    
    if (filterPlatform !== 'all') {
      result = result.filter(game => 
        game.platform?.toLowerCase().includes(filterPlatform.toLowerCase()) ||
        game.platform_type?.toLowerCase().includes(filterPlatform.toLowerCase())
      );
    }
    
    setFilteredGames(result);
  }, [games, filterPlatform]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchGames(query);
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCart = (game) => {
    const existing = cart.find(item => item.id === game.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item => 
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...game, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showNotificationMessage(`${game.name} added to cart!`);
  };

  const toggleWishlist = (game) => {
    let newWishlist;
    if (wishlist.find(item => item.id === game.id)) {
      newWishlist = wishlist.filter(item => item.id !== game.id);
      showNotificationMessage(`Removed from wishlist`);
    } else {
      newWishlist = [...wishlist, game];
      showNotificationMessage(`Added to wishlist ❤️`);
    }
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (game) => {
    const newWishlist = wishlist.filter(item => item.id !== game.id);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    showNotificationMessage(`${game.name} removed from wishlist`);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('currency', currency.code);
    showNotificationMessage(`Currency changed to ${currency.name}`);
  };

  const platforms = [
    { id: 'all', name: 'All Platforms', count: games.length },
    { id: 'steam', name: 'Steam', count: games.filter(g => g.platform_type?.toLowerCase() === 'steam').length },
    { id: 'gog', name: 'GOG.com', count: games.filter(g => g.platform_type?.toLowerCase() === 'gog').length },
    { id: 'xbox', name: 'Xbox Live', count: games.filter(g => g.platform?.toLowerCase().includes('xbox')).length },
    { id: 'switch', name: 'Nintendo', count: games.filter(g => g.platform?.toLowerCase().includes('switch')).length },
  ];

  return (
    <div className="App">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlist.length} 
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        resultsCount={filteredGames.length}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      
      {showCart && (
        <Cart cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />
      )}
      
      {showWishlist && (
        <Wishlist 
          wishlist={wishlist} 
          onClose={() => setShowWishlist(false)}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
      )}
      
      <div className={`notification ${showNotification ? 'show' : ''}`}>
        {notificationMessage}
      </div>
      
      {/* Main Content */}
      <main className="main-content">
        {/* Results Header */}
        <div className="results-header">
          <span className="results-count">
            Results found: <strong>{filteredGames.length}</strong>
          </span>
        </div>
        
        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading games...</p>
          </div>
        )}
        
        {/* Error */}
        {error && (
          <div className="error-message">
            <h3>⚠️ Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => fetchGames()} className="retry-btn">Try Again</button>
          </div>
        )}
        
        {/* No Results */}
        {!loading && !error && filteredGames.length === 0 && (
          <div className="no-results">
            <h3>🎮 No games found</h3>
            <p>{searchQuery ? `No results for "${searchQuery}"` : 'Try different filters'}</p>
            <button onClick={() => { setSearchQuery(''); setFilterPlatform('all'); fetchGames(); }} className="reset-btn">
              Show All Games
            </button>
          </div>
        )}
        
        {/* Games Grid */}
        {!loading && !error && filteredGames.length > 0 && (
          <div className="games-grid">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some(item => item.id === game.id)}
                selectedCurrency={selectedCurrency}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
