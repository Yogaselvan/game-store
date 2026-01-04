const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const db = require(path.join(__dirname, '../../server/database'));

const app = express();

app.use(express.json());

// Get all games
app.get('/api/games', (req, res) => {
  db.all('SELECT * FROM games', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get game by ID
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

// Search games
app.get('/api/games/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    res.status(400).json({ error: 'Search query required' });
    return;
  }
  
  db.all(
    'SELECT * FROM games WHERE title LIKE ? OR description LIKE ?',
    [`%${query}%`, `%${query}%`],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

module.exports.handler = serverless(app);
