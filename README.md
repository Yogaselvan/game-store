# Game Store

A full-stack web application for browsing and purchasing video games with currency conversion support.

## Features

- **Game Catalog**: Browse a collection of video games
- **Search Functionality**: Search games by name
- **Game Details**: View detailed information about each game
- **Shopping Cart**: Add/remove games from your cart
- **Wishlist**: Save games for later
- **Currency Conversion**: Support for multiple currencies
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React.js** - UI library
- **CSS3** - Styling
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database

## Project Structure

```
game-store/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Images and logos
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── database.js       # Database configuration
│   ├── index.js          # Server entry point
│   └── package.json
├── database/             # Database files
│   └── games.db
└── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Yogaselvan/game-store.git
cd game-store
```

2. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

3. **Start the application:**

**Development mode:**
```bash
# Terminal 1 - Start backend server (runs on port 5000)
cd server
npm start

# Terminal 2 - Start frontend (runs on port 3000)
cd client
npm start
```

**Production mode:**
```bash
npm run build
npm run serve
```

## API Endpoints

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game by ID
- `GET /api/games/search?q=:query` - Search games

## Components

### Frontend Components
- **Header** - Navigation and branding
- **GameCard** - Individual game display
- **GameDetail** - Detailed game information
- **GameModal** - Modal for game details
- **SearchBar** - Search functionality
- **Cart** - Shopping cart display
- **Wishlist** - Saved games list
- **CurrencyDropdown** - Currency selection

## Database

The application uses SQLite with a `games` table containing:
- Game ID
- Title
- Description
- Price
- Genre
- Release Date
- Image URL

## Deployment

The application can be deployed to:
- **Railway** - Using `railway.json`
- **Render** - Using `render.yaml`

## Contributing

Feel free to fork this repository and submit pull requests for improvements.

## License

This project is open source and available under the MIT License.

## Author

**Yoga Selvan**

## Support

For issues or questions, please open an issue on the GitHub repository.
