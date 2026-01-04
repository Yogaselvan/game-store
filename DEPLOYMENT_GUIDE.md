# Deployment Guide

This guide will help you deploy the Game Store application to Netlify (frontend) and Render (backend).

## Option 1: Full Setup (Recommended)

### Deploy Backend to Render (Free Tier)

1. **Sign up at [Render.com](https://render.com)**
   - Create a free account

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (`game-store`)
   - Select `main` branch

3. **Configure the Service**
   - **Name:** `game-store-api`
   - **Runtime:** Node
   - **Build command:** `npm install && node server/setup.js`
   - **Start command:** `npm start`
   - **Region:** Choose closest to you
   - Click "Create Web Service"

4. **Wait for Deployment**
   - Render will deploy your backend
   - You'll get a URL like `https://game-store-api.onrender.com`
   - Copy this URL

5. **Update Netlify Environment Variables**
   - Go to your Netlify site dashboard
   - Click "Site settings" → "Build & deploy" → "Environment"
   - Add new variable:
     - **Key:** `REACT_APP_API_URL`
     - **Value:** `https://game-store-api.onrender.com/api`
   - Click "Deploy site"

### Update Frontend on Netlify

1. **Go to Netlify Dashboard**
   - Open your `game-store` site
   - Click "Deploys"
   - Click "Trigger deploy" → "Deploy site"

2. **Verify Everything Works**
   - Your Netlify URL should now show games
   - Search should work
   - Cart and wishlist should function properly

---

## Option 2: Quick Fix (For Current Issue)

If you just want to get games loading immediately:

### Update Client Build Locally (Optional)

```bash
cd client
npm install
npm run build
```

### Deploy Updated Build to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the `client/build` folder
3. Get your temporary deploy link

---

## Environment Variables Explained

- **Development:** Uses `REACT_APP_API_URL=http://localhost:5000/api`
- **Production:** Set via Netlify environment variables to point to Render backend

---

## Troubleshooting

**Games still not loading after deployment?**
- Check browser console (F12) for API URL being used
- Verify Render backend is running
- Confirm `REACT_APP_API_URL` environment variable is set in Netlify

**Render backend shows "Service is sleeping"?**
- Render suspends free services after 15 min of inactivity
- Ping the service to wake it up
- Upgrade to paid plan for always-on service

---

## Architecture

```
┌─────────────────────┐
│   Netlify Frontend  │ ← React App (game-store.netlify.app)
└──────────────┬──────┘
               │ API Calls to
               │ (REACT_APP_API_URL)
               ▼
┌─────────────────────┐
│   Render Backend    │ ← Node.js API (game-store-api.onrender.com)
│   - /api/list       │
│   - /api/games/:id  │
└──────────────┬──────┘
               │ Database Queries
               ▼
         ┌─────────────┐
         │   SQLite    │
         │  games.db   │
         └─────────────┘
```
