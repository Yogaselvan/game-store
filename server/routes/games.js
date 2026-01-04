const express = require('express');
const router = express.Router();
const db = require('../database');
const Fuse = require('fuse.js');

// GET /api/list - Get all games or search by name
router.get('/list', (req, res) => {
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
        threshold: 0.4, // 0 = perfect match, 1 = match anything
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
      error: 'Failed to fetch games'
    });
  }
});

module.exports = router;
