const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const gamesRouter = require('./routes/games');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Check if database has games, if not run setup
db.get('SELECT COUNT(*) as count FROM games', (err, row) => {
  if (err || !row || row.count === 0) {
    console.log('Database is empty, initializing...');
    exec('node server/setup.js', (error, stdout, stderr) => {
      if (error) {
        console.error('Error setting up database:', error);
        return;
      }
      console.log('Database initialized successfully');
    });
  } else {
    console.log(`Database has ${row.count} games`);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', gamesRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/list`);
});
