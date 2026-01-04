const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Ensure database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'games.db');
const db = new sqlite3.Database(dbPath);

// Sample game data with reliable image URLs - matching Eneba screenshot
const games = [
  {
    name: 'FIFA 23',
    edition: 'Standard Edition',
    price: 40.93,
    original_price: 69.99,
    discount: 41,
    cashback: 0.82,
    image_url: 'https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg',
    platform: 'PC',
    platform_type: 'Origin',
    region: 'GLOBAL',
    seller: 'GAMINGIMPERIUM',
    stock: 150,
    rating: 4.2
  },
  {
    name: 'Red Dead Redemption 2',
    edition: 'Standard Edition',
    price: 34.14,
    original_price: 59.99,
    discount: 43,
    cashback: 0.68,
    image_url: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    platform: 'PC',
    platform_type: 'Rockstar',
    region: 'GLOBAL',
    seller: 'GAMINGIMPERIUM',
    stock: 200,
    rating: 4.8
  },
  {
    name: 'Split Fiction',
    edition: 'EA App Key',
    price: 40.93,
    original_price: 59.99,
    discount: 32,
    cashback: 0.82,
    image_url: 'https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg',
    platform: 'PC',
    platform_type: 'EA App',
    region: 'GLOBAL',
    seller: 'GAMINGIMPERIUM',
    stock: 75,
    rating: 4.5
  },
  {
    name: 'Split Fiction',
    edition: 'Xbox Series X|S',
    price: 34.14,
    original_price: 59.99,
    discount: 43,
    cashback: 0.68,
    image_url: 'https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg',
    platform: 'Xbox',
    platform_type: 'Xbox Live',
    region: 'EUROPE',
    seller: 'GGMAX',
    stock: 120,
    rating: 4.5
  },
  {
    name: 'Split Fiction',
    edition: 'Nintendo Switch',
    price: 36.25,
    original_price: 59.99,
    discount: 40,
    cashback: 0.73,
    image_url: 'https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg',
    platform: 'Switch',
    platform_type: 'eShop',
    region: 'EUROPE',
    seller: 'KEYSFORGAMES',
    stock: 80,
    rating: 4.5
  },
  {
    name: 'Cyberpunk 2077',
    edition: 'Standard Edition',
    price: 24.99,
    original_price: 49.99,
    discount: 50,
    cashback: 0.50,
    image_url: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    platform: 'PC',
    platform_type: 'GOG',
    region: 'GLOBAL',
    seller: 'GAMINGIMPERIUM',
    stock: 180,
    rating: 4.3
  },
  {
    name: 'Elden Ring',
    edition: 'Standard Edition',
    price: 44.99,
    original_price: 59.99,
    discount: 25,
    cashback: 0.90,
    image_url: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
    platform: 'PC',
    platform_type: 'Steam',
    region: 'GLOBAL',
    seller: 'GGMAX',
    stock: 220,
    rating: 4.9
  },
  {
    name: 'Grand Theft Auto V',
    edition: 'Premium Edition',
    price: 19.99,
    original_price: 29.99,
    discount: 33,
    cashback: 0.40,
    image_url: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
    platform: 'PC',
    platform_type: 'Rockstar',
    region: 'GLOBAL',
    seller: 'GAMINGIMPERIUM',
    stock: 300,
    rating: 4.7
  }
];

// Clear existing data and insert new games
db.serialize(() => {
  // Drop and recreate table
  db.run(`DROP TABLE IF EXISTS games`, (err) => {
    if (err) console.error('Error dropping table:', err);
    
    db.run(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        edition TEXT,
        price REAL NOT NULL,
        original_price REAL,
        discount INTEGER,
        cashback REAL,
        image_url TEXT,
        platform TEXT,
        platform_type TEXT,
        region TEXT,
        seller TEXT,
        stock INTEGER DEFAULT 100,
        rating REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Error creating table:', err);
        process.exit(1);
      }
      
      const stmt = db.prepare(`
        INSERT INTO games (name, edition, price, original_price, discount, cashback, image_url, platform, platform_type, region, seller, stock, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      let count = 0;
      games.forEach(game => {
        stmt.run(
          game.name,
          game.edition,
          game.price,
          game.original_price,
          game.discount,
          game.cashback,
          game.image_url,
          game.platform,
          game.platform_type,
          game.region,
          game.seller,
          game.stock,
          game.rating,
          (err) => {
            if (err) {
              console.error('❌ Error inserting game:', err);
            } else {
              count++;
              if (count === games.length) {
                console.log(`✅ Database seeded with ${games.length} games`);
                console.log('Games added:');
                games.forEach(game => console.log(`  - ${game.name} (${game.edition}) - ${game.platform}`));
                stmt.finalize();
                db.close(() => {
                  process.exit(0);
                });
              }
            }
          }
        );
      });
    });
  });
});
