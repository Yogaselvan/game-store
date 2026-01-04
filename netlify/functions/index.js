const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const db = require(path.join(__dirname, '../../server/database'));
const Fuse = require('fuse.js');

const app = express();

app.use(express.json());

// GET /api/list - Get all games or search by name
app.get('/api/list', (req, res) => {
  try {
    const searchQuery = req.query.search;
    
    // Get all games from database
    db.all('SELECT * FROM games ORDER BY name', (err, games) => {
      if (err) {
        console.error('Error fetching games:', err);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch games'
        });
      }
      
      if (!searchQuery) {
        // Return all games if no search query
        return res.json({
          success: true,
          count: games.length,
          data: games
        });
      }
      
      // Fuzzy search using Fuse.js
      const fuse = new Fuse(games, {
        keys: ['name', 'platform'],
        threshold: 0.4,
        includeScore: true
      });
      
      const searchResults = fuse.search(searchQuery);
      const filteredGames = searchResults.map(result => result.item);
      
      res.json({
        success: true,
        count: filteredGames.length,
        query: searchQuery,
        data: filteredGames
      });
    });
  } catch (error) {
    console.error('Error in /list route:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/games/:id - Get specific game
app.get('/api/games/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM games WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }
    res.json(row);
  });
});

module.exports.handler = serverless(app);
