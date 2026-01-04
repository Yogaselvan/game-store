# 🚀 Complete Setup Guide - Eneba Game Search Application

## Prerequisites Installation

### Step 1: Install Node.js

**Option A: Using Homebrew (Recommended for macOS)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node

# Verify installation
node --version  # Should show v18.x or higher
npm --version   # Should show v9.x or higher
```

**Option B: Download from Official Website**
1. Visit https://nodejs.org/
2. Download the LTS version (Long Term Support)
3. Run the installer
4. Follow installation prompts

**Verify Installation:**
```bash
node --version
npm --version
```

---

## Project Setup

### Step 2: Navigate to Project Directory
```bash
cd /Users/yogaselvan/Desktop/intern
```

### Step 3: Install All Dependencies
```bash
# This installs both backend and frontend dependencies
npm run install-all
```

**This will:**
- Install backend packages (Express, SQLite, Fuse.js, etc.)
- Navigate to client folder
- Install React and frontend packages
- Return to root directory

**Alternative (Manual Installation):**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 4: Set Up Database
```bash
npm run setup
```

**This will:**
- Create `database` folder
- Create `games.db` SQLite database
- Seed database with 6 games including FIFA 23, Red Dead Redemption 2, Split Fiction

**Expected Output:**
```
✅ Database seeded with 6 games
Games added:
  - FIFA 23
  - Red Dead Redemption 2
  - Split Fiction
  - Cyberpunk 2077
  - Elden Ring
  - Grand Theft Auto V
```

### Step 5: Start the Application
```bash
npm start
```

**This will:**
1. Build the React frontend (creates optimized production build)
2. Start the Node.js server on port 5000
3. Serve the application at http://localhost:5000

**Expected Output:**
```
Server is running on port 5000
API available at http://localhost:5000/api/list
```

### Step 6: Open in Browser
```
http://localhost:5000
```

---

## Development Mode (Optional)

For development with hot-reload:

```bash
npm run dev
```

**This will:**
- Start backend server on http://localhost:5000
- Start React dev server on http://localhost:3000
- Changes to code will auto-reload

**Use Development Mode When:**
- Making changes to code
- Testing new features
- Debugging

**Use Production Mode (npm start) When:**
- Testing deployment build
- Performance testing
- Final testing before deployment

---

## Testing the API

### Test Backend API Directly

**Get all games:**
```bash
curl http://localhost:5000/api/list
```

**Search for FIFA:**
```bash
curl "http://localhost:5000/api/list?search=fifa"
```

**Search for Red Dead:**
```bash
curl "http://localhost:5000/api/list?search=red%20dead"
```

**Or open in browser:**
- All games: http://localhost:5000/api/list
- Search: http://localhost:5000/api/list?search=fifa

---

## Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js (see Step 1 above)

### Problem: "Port 5000 already in use"
**Solution:** 
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
# Edit .env file and change PORT=5000 to PORT=3001
```

### Problem: Database errors
**Solution:**
```bash
# Delete database and recreate
rm -rf database/
npm run setup
```

### Problem: "Cannot find module" errors
**Solution:**
```bash
# Reinstall all dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

### Problem: React app won't start
**Solution:**
```bash
# Check if client dependencies are installed
cd client
npm install
cd ..

# Try starting again
npm start
```

---

## Project Structure Quick Reference

```
intern/
├── server/              # Backend
│   ├── index.js        # Main server file
│   ├── database.js     # DB connection
│   ├── setup.js        # Seed script
│   └── routes/
│       └── games.js    # API endpoints
├── client/              # Frontend
│   ├── public/
│   └── src/
│       ├── App.js      # Main React component
│       └── components/
├── database/            # Auto-generated
│   └── games.db
├── package.json         # Dependencies
├── .env                # Configuration
└── README.md           # Documentation
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install all dependencies (backend + frontend) |
| `npm start` | Build and run in production mode |
| `npm run dev` | Run in development mode with hot-reload |
| `npm run setup` | Initialize and seed database |
| `npm run server` | Run backend only |
| `npm run client` | Run frontend only |
| `npm run build` | Build React app for production |

---

## Next Steps: Deployment

Once your app is working locally, you can deploy it:

### Option 1: Railway (Easiest)
1. Create account at https://railway.app
2. Connect GitHub repo or use Railway CLI
3. Railway auto-detects and deploys

### Option 2: Render
1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Build: `npm run install-all && npm run setup && npm run build`
5. Start: `npm start`

### Option 3: Create GitHub Repository
```bash
cd /Users/yogaselvan/Desktop/intern
git init
git add .
git commit -m "Initial commit - Eneba game search app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## Submission Checklist

Before submitting to internship@eneba.com:

- [ ] Application runs locally with `npm start`
- [ ] All 3 required games are searchable (FIFA 23, Red Dead Redemption 2, Split Fiction)
- [ ] API endpoints work: `/api/list` and `/api/list?search=query`
- [ ] Fuzzy search is functional
- [ ] App is deployed OR GitHub repo is ready with clear instructions
- [ ] AI Prompt History is included (AI_PROMPT_HISTORY.md)
- [ ] CV is prepared in English
- [ ] Full name is included in submission

**Email Template:**
```
To: internship@eneba.com
Subject: Software Engineer Intern Application - [Your Full Name]

Dear Gabriele and Eneba Team,

Please find attached my completed homework assignment for the Software Engineer Intern position.

Included:
- Deployed application URL: [your-url] OR GitHub repository: [your-repo-url]
- AI Prompt History (AI_PROMPT_HISTORY.md)
- CV (English)
- Full Name: [Your Full Name]

The application includes:
✅ React frontend
✅ Node.js backend with Express
✅ SQLite database
✅ /list and /list?search=<gamename> API endpoints
✅ Fuzzy search functionality
✅ FIFA 23, Red Dead Redemption 2, Split Fiction + 3 bonus games

Local setup is as simple as:
npm run install-all && npm run setup && npm start

Thank you for this opportunity. I look forward to hearing from you.

Best regards,
[Your Full Name]
```

---

## Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review the README.md for detailed documentation
3. Check that Node.js and npm are properly installed
4. Ensure you're in the correct directory
5. Try the manual installation steps

Good luck with your application! 🚀
