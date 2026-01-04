import { Search, X, Heart, ShoppingCart, User, ChevronDown } from 'lucide-react';
import gameImage from 'figma:asset/6b51598735c94a2202a84126f22ecda386a21ed0.png';

export default function App() {
  const products = [
    {
      id: 1,
      title: 'Split Fiction EA App Key (PC) GLOBAL',
      region: 'GLOBAL',
      originalPrice: '€49.99',
      currentPrice: '€40.33',
      discount: '-18%',
      cashback: '€1.15',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 2,
      title: 'Split Fiction (Xbox Series X/S) XBOX LIVE Key EUROPE',
      region: 'EUROPE',
      originalPrice: '€49.99',
      currentPrice: '€36.14',
      discount: '-32%',
      cashback: '€1.3%',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 3,
      title: 'Split Fiction (Xbox Series X/S) XBOX LIVE Key GLOBAL',
      region: 'GLOBAL',
      originalPrice: '€49.99',
      currentPrice: '€36.15',
      discount: '-30%',
      cashback: '€1.67',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 4,
      title: 'Split Fiction (Nintendo Switch 2) eShop Key EUROPE',
      region: 'EUROPE',
      originalPrice: '€49.99',
      currentPrice: '€36.25',
      discount: '-27%',
      cashback: '€3.26',
      tag: 'Switch 2 Notice',
      sold: '500'
    },
    {
      id: 5,
      title: 'Split Fiction EA App Key (PC) GLOBAL',
      region: 'GLOBAL',
      originalPrice: '€49.99',
      currentPrice: '€40.33',
      discount: '-18%',
      cashback: '€1.15',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 6,
      title: 'Split Fiction (Xbox Series X/S) XBOX LIVE Key EUROPE',
      region: 'EUROPE',
      originalPrice: '€49.99',
      currentPrice: '€36.14',
      discount: '-32%',
      cashback: '€1.3%',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 7,
      title: 'Split Fiction (Xbox Series X/S) XBOX LIVE Key GLOBAL',
      region: 'GLOBAL',
      originalPrice: '€49.99',
      currentPrice: '€36.15',
      discount: '-30%',
      cashback: '€1.67',
      tag: 'CASHBACK',
      sold: '500'
    },
    {
      id: 8,
      title: 'Split Fiction (Nintendo Switch 2) eShop Key EUROPE',
      region: 'EUROPE',
      originalPrice: '€49.99',
      currentPrice: '€36.25',
      discount: '-27%',
      cashback: '€3.26',
      tag: 'CASHBACK',
      sold: '500'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#5B3BA6' }}>
      {/* Header */}
      <header className="border-b border-purple-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 -ml-3"></div>
            </div>
            <span className="text-white font-bold text-2xl">eneba</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value="split fiction"
                readOnly
                className="w-full bg-transparent border-2 border-purple-400 rounded-lg pl-10 pr-10 py-2 text-white placeholder-gray-400 outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language/Currency Selector */}
          <button className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-purple-700">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Cpath fill='%230052b4' d='M0 0h640v480H0z'/%3E%3Cpath fill='%23ffd700' d='M0 0h640v320H0z'/%3E%3Cpath fill='%230052b4' d='M0 0h640v160H0z'/%3E%3C/svg%3E" alt="EU Flag" className="w-5 h-4" />
            <span className="text-sm">English EU | EUR</span>
          </button>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-purple-300">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-purple-300">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-purple-300 bg-purple-700 rounded-full p-2">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-white text-sm">Results found: 12</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-purple-800 rounded-lg overflow-hidden hover:bg-purple-700 transition-colors cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={gameImage}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
                
                {/* Badges on Image */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-2">
                  <div className="bg-cyan-400 text-purple-900 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border-2 border-purple-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-purple-900 rounded-full"></div>
                    </div>
                    CASHBACK
                  </div>
                </div>

                {/* Platform Badges */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs">
                    {product.sold}
                  </div>
                </div>

                {/* Top Notice for Switch 2 */}
                {product.id === 4 && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1 text-xs font-semibold">
                    Switch 2 Notice
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-white text-sm mb-2 line-clamp-2 min-h-[40px]">
                  {product.title}
                </h3>
                
                <div className="mb-3">
                  <span className="inline-block bg-purple-600 text-white px-2 py-0.5 rounded text-xs">
                    {product.region}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                  <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                    {product.discount}
                  </span>
                </div>

                <div className="flex items-end justify-between mb-2">
                  <div className="text-white text-2xl font-bold">{product.currentPrice}</div>
                  <button className="text-white hover:text-red-400">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-green-500 text-xs">
                  Cashback <span className="font-semibold">{product.cashback}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
