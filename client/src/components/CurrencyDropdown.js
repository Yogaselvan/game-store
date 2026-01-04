import React, { useState } from 'react';
import './CurrencyDropdown.css';

const currencies = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: 'https://flagcdn.com/w20/us.png',
    rate: 1 // Base currency (prices in database are in USD)
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    flag: 'https://flagcdn.com/w20/in.png',
    rate: 90 // 1 USD = 90 INR
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: 'https://flagcdn.com/w20/eu.png',
    rate: 0.92 // 1 USD = 0.92 EUR
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: 'https://flagcdn.com/w20/gb.png',
    rate: 0.79 // 1 USD = 0.79 GBP
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: 'https://flagcdn.com/w20/jp.png',
    rate: 149 // 1 USD = 149 JPY
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: 'https://flagcdn.com/w20/ca.png',
    rate: 1.36 // 1 USD = 1.36 CAD
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: 'https://flagcdn.com/w20/au.png',
    rate: 1.50 // 1 USD = 1.50 AUD
  }
];

function CurrencyDropdown({ selectedCurrency, onCurrencyChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  const formatPrice = (basePrice, currency) => {
    if (!currency || !basePrice) return `$${basePrice || 0}`;
    
    const convertedPrice = basePrice * currency.rate;
    return `${currency.symbol}${currency.code === 'JPY' ? Math.round(convertedPrice) : convertedPrice.toFixed(2)}`;
  };

  return (
    <div className="currency-dropdown">
      <button 
        className="currency-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={selectedCurrency.flag} 
          alt={selectedCurrency.code}
          className="currency-flag"
        />
        <span className="currency-code">{selectedCurrency.code}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24" 
          width="14" 
          height="14" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="currency-dropdown-menu">
          <div className="currency-header">
            <h4>Select Currency</h4>
            <span className="exchange-note">* Approximate exchange rates</span>
          </div>
          
          <div className="currency-list">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                className={`currency-option ${selectedCurrency.code === currency.code ? 'active' : ''}`}
                onClick={() => handleCurrencySelect(currency)}
              >
                <div className="currency-flag-name">
                  <img 
                    src={currency.flag} 
                    alt={currency.code}
                    className="currency-flag"
                  />
                  <div className="currency-details">
                    <span className="currency-code-full">{currency.code}</span>
                    <span className="currency-name">{currency.name}</span>
                  </div>
                </div>
                
                <div className="currency-rate">
                  <span className="conversion-example">
                    ₹100 = {formatPrice(100, currency)}
                  </span>
                </div>
                
                {selectedCurrency.code === currency.code && (
                  <svg 
                    className="check-icon" 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          
          <div className="currency-footer">
            <p>Exchange rates are updated regularly and may vary slightly from actual market rates.</p>
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="currency-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export { currencies };
export default CurrencyDropdown;