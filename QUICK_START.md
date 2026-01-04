# Eneba Game Search - Quick Reference

## 🚀 One-Line Setup (After Node.js is installed)
```bash
npm run install-all && npm run setup && npm start
```

Then open: http://localhost:5000

---

## 📋 Required Games Status
✅ FIFA 23  
✅ Red Dead Redemption 2  
✅ Split Fiction

**Bonus Games:**
- Cyberpunk 2077
- Elden Ring  
- Grand Theft Auto V

---

## 🔧 API Endpoints

### Get All Games
```
GET http://localhost:5000/api/list
```

### Search Games (Fuzzy)
```
GET http://localhost:5000/api/list?search=fifa
GET http://localhost:5000/api/list?search=red%20dead
GET http://localhost:5000/api/list?search=split
```

---

## 📁 Project Files

**Frontend (React):**
- `client/src/App.js` - Main app logic
- `client/src/components/Header.js` - Navigation
- `client/src/components/SearchBar.js` - Search input
- `client/src/components/GameCard.js` - Game display

**Backend (Node.js):**
- `server/index.js` - Express server
- `server/routes/games.js` - API routes
- `server/database.js` - SQLite config
- `server/setup.js` - Database seeding

**Documentation:**
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Step-by-step setup
- `AI_PROMPT_HISTORY.md` - AI usage log
- `QUICK_START.md` - This file

---

## 🌐 Deployment Quick Links

**Railway:** https://railway.app  
**Render:** https://render.com  
**Vercel:** https://vercel.com  
**Heroku:** https://heroku.com

---

## ✅ Pre-Submission Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm run install-all`)
- [ ] Database seeded (`npm run setup`)
- [ ] App runs locally (`npm start`)
- [ ] All games searchable
- [ ] API endpoints tested
- [ ] App deployed OR GitHub repo ready
- [ ] AI_PROMPT_HISTORY.md included
- [ ] CV prepared (English)

---

## 📧 Submission

**To:** internship@eneba.com  
**Subject:** Software Engineer Intern Application - [Your Name]

**Include:**
1. Your full name
2. Deployed URL OR GitHub repo
3. AI Prompt History
4. CV (English)

**Deadline:** January 25, 2025

---

## 🆘 Quick Fixes

**Port in use:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Reset database:**
```bash
rm -rf database/ && npm run setup
```

**Reinstall dependencies:**
```bash
rm -rf node_modules client/node_modules && npm run install-all
```

---

## 🎯 Tech Stack

- **Frontend:** React 18
- **Backend:** Node.js + Express
- **Database:** SQLite (better-sqlite3)
- **Search:** Fuse.js (fuzzy matching)
- **Styling:** CSS3 (Grid, Flexbox)

---

Good luck! 🍀
