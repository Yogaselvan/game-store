# Eneba Game Search Application

A full-stack web application for searching and browsing games, built for the Eneba Software Engineer Intern assignment.

## 🎮 Features

- **Fuzzy Search**: Search for games with intelligent fuzzy matching
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Results**: Instant search results as you type
- **Game Catalog**: Browse games with detailed information including:
  - Game name and cover art
  - Pricing with discount badges
  - Platform and region information
  - Stock availability
  - User ratings

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with modern features (Grid, Flexbox, Gradients)

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite** (better-sqlite3) - SQL database
- **Fuse.js** - Fuzzy search library
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
eneba-game-search/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Header.js
│       │   ├── SearchBar.js
│       │   └── GameCard.js
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── server/                 # Node.js backend
│   ├── routes/
│   │   └── games.js       # API routes
│   ├── database.js        # Database configuration
│   ├── setup.js           # Database seeding script
│   └── index.js           # Server entry point
├── database/              # SQLite database (auto-generated)
│   └── games.db
├── package.json           # Root dependencies
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository**
   ```bash
   cd intern
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up the database**
   ```bash
   npm run setup
   ```

4. **Start the application**
   ```bash
   npm start
   ```

The application will build the frontend and start the server on `http://localhost:5000`

### Development Mode

For development with hot-reload:

```bash
npm run dev
```

This runs:
- Backend server on `http://localhost:5000`
- React dev server on `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Games
```http
GET /api/list
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "FIFA 23",
      "price": 29.99,
      "original_price": 59.99,
      "discount": 50,
      "image_url": "https://...",
      "platform": "PC Origin",
      "region": "Global",
      "stock": 150,
      "rating": 4.2
    }
  ]
}
```

#### 2. Search Games
```http
GET /api/list?search=fifa
```

**Query Parameters:**
- `search` (string): Search query for game name or platform

**Response:**
```json
{
  "success": true,
  "count": 1,
  "query": "fifa",
  "data": [
    {
      "id": 1,
      "name": "FIFA 23",
      "price": 29.99,
      ...
    }
  ]
}
```

**Fuzzy Search Examples:**
- `fifa` → Finds "FIFA 23"
- `red dead` → Finds "Red Dead Redemption 2"
- `split` → Finds "Split Fiction"
- `cyber` → Finds "Cyberpunk 2077"

## 🎯 Games Included

The application includes the following games (as required):

1. **FIFA 23** ⚽
2. **Red Dead Redemption 2** 🤠
3. **Split Fiction** 🎭

**Bonus games:**
4. Cyberpunk 2077
5. Elden Ring
6. Grand Theft Auto V

## 🗄️ Database Schema

```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  original_price REAL,
  discount INTEGER,
  image_url TEXT,
  platform TEXT,
  region TEXT,
  stock INTEGER DEFAULT 100,
  rating REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Deployment Options

### Option 1: Railway (Recommended)

1. Create account at [Railway.app](https://railway.app)
2. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```
3. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

### Option 2: Render

1. Create account at [Render.com](https://render.com)
2. Connect your GitHub repository
3. Configure build command: `npm run install-all && npm run setup && npm run build`
4. Configure start command: `npm start`

### Option 3: Heroku

1. Create account at [Heroku.com](https://heroku.com)
2. Install Heroku CLI and run:
   ```bash
   heroku create eneba-game-search
   git push heroku main
   ```

### Option 4: Vercel + Serverless

For frontend-only deployment with serverless functions, see `DEPLOYMENT.md` (can be created separately).

## 🧪 Testing the API

### Using cURL

```bash
# Get all games
curl http://localhost:5000/api/list

# Search for FIFA
curl "http://localhost:5000/api/list?search=fifa"

# Search for Red Dead
curl "http://localhost:5000/api/list?search=red%20dead"
```

### Using Browser

Simply open:
- All games: `http://localhost:5000/api/list`
- Search: `http://localhost:5000/api/list?search=fifa`

## 🎨 Features Implemented

✅ React frontend  
✅ Node.js backend  
✅ SQL database (SQLite)  
✅ RESTful API with `/list` and `/list?search=<gamename>` endpoints  
✅ Fuzzy search functionality  
✅ Required games: FIFA 23, Red Dead Redemption 2, Split Fiction  
✅ Responsive design  
✅ Clean, modern UI  
✅ Error handling  
✅ Loading states  
✅ Stock management  
✅ Discount badges  
✅ Rating system  

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development
DB_PATH=./database/games.db
```

## 🤖 AI Tools Used

This project was built with assistance from GitHub Copilot and Claude AI for:
- Project architecture planning
- Code generation and optimization
- Best practices implementation
- Documentation writing

## 📦 Scripts

- `npm start` - Build and run in production mode
- `npm run dev` - Run in development mode with hot-reload
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run build` - Build React app for production
- `npm run setup` - Initialize and seed database
- `npm run install-all` - Install all dependencies (root + client)

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database errors
```bash
# Reset database
rm -rf database/
npm run setup
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

## 📄 License

This project is created for the Eneba Software Engineer Intern assignment.

## 👤 Author

**[Your Full Name]**
- Email: [Your Email]
- GitHub: [Your GitHub Profile]

## 📅 Submission Date

[Current Date]

---

**Note**: This application demonstrates proficiency in:
- Full-stack development
- RESTful API design
- Database management
- Modern React patterns
- Responsive web design
- Code organization and best practices
