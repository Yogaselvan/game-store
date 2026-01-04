import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as EnebaLogo } from '../assets/eneba-logo-official.svg';
import CurrencyDropdown from './CurrencyDropdown';

function Header({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onCartClick, 
  onWishlistClick,
  onSearch, 
  searchQuery = '', 
  resultsCount = 0,
  selectedCurrency,
  onCurrencyChange 
}) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="eneba-header">
      <div className="header-container">
        {/* Eneba Logo */}
        <Link to="/" className="eneba-logo">
          <EnebaLogo />
        </Link>

        {/* Navigation Links */}
        <nav className="header-nav">
          <a href="/" className="nav-link active">Store</a>
          <span className="nav-link">Games</span>
        </nav>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSubmit}>
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for games, top-ups and more"
            className="search-input"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputValue && (
            <button type="button" className="search-clear" onClick={handleClear}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </form>

        {/* Right Section */}
        <div className="header-right">
          {/* Language/Currency Selector */}
          <div className="language-currency-section">
            <img 
              src="https://flagcdn.com/w20/gb.png" 
              alt="English" 
              className="flag-icon"
            />
            <span className="language-text">English EU</span>
            <span className="divider">|</span>
            <CurrencyDropdown 
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>
          
          {/* Wishlist */}
          <button className="header-icon-btn wishlist-btn" onClick={onWishlistClick}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          
          {/* Cart */}
          <button className="header-icon-btn cart-btn" onClick={onCartClick}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          
          {/* User */}
          <Link to="/login" className="header-icon-btn user-btn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
