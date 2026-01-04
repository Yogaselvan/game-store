#!/bin/bash

# Git Repository Setup Script for Eneba Game Search Application
# This script initializes a git repository and prepares it for GitHub

echo "🚀 Eneba Game Search - Git Repository Setup"
echo "==========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "❌ Git is not installed. Please install git first:"
    echo "   brew install git"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already a git repository
if [ -d .git ]; then
    echo "⚠️  This directory is already a git repository."
    read -p "Do you want to reinitialize? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        rm -rf .git
        echo "✅ Removed existing git repository"
    else
        echo "Exiting..."
        exit 0
    fi
fi

# Initialize git repository
echo "📦 Initializing git repository..."
git init
echo "✅ Git repository initialized"
echo ""

# Create .gitignore if it doesn't exist (should already exist)
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
client/node_modules/

# Production
client/build/

# Database
*.db
database/

# Environment
.env

# Misc
.DS_Store
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
EOF
    echo "✅ .gitignore created"
fi

# Add all files
echo "📁 Adding files to git..."
git add .
echo "✅ Files added"
echo ""

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Eneba Game Search Application

Features:
- React frontend with search functionality
- Node.js backend with Express
- SQLite database
- Fuzzy search with Fuse.js
- Required games: FIFA 23, Red Dead Redemption 2, Split Fiction
- Additional games: Cyberpunk 2077, Elden Ring, GTA V
- API endpoints: /api/list and /api/list?search=<query>
- Responsive design
- Complete documentation

Built for Eneba Software Engineer Intern assignment"

echo "✅ Initial commit created"
echo ""

# Set default branch to main
git branch -M main
echo "✅ Default branch set to 'main'"
echo ""

echo "🎉 Git repository setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create a new repository on GitHub:"
echo "   → Go to https://github.com/new"
echo "   → Name: eneba-game-search (or any name you prefer)"
echo "   → Keep it public for the assignment"
echo "   → Don't initialize with README (we already have one)"
echo ""
echo "2. Connect your local repository to GitHub:"
echo "   → git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git"
echo "   → git push -u origin main"
echo ""
echo "3. Example commands:"
echo "   git remote add origin https://github.com/johndoe/eneba-game-search.git"
echo "   git push -u origin main"
echo ""
echo "📝 Your repository will include:"
echo "   ✅ All source code"
echo "   ✅ Documentation (README.md, SETUP_GUIDE.md)"
echo "   ✅ AI Prompt History"
echo "   ✅ Deployment configs (railway.json, render.yaml)"
echo ""
echo "🔗 After pushing, your GitHub repo URL will be:"
echo "   https://github.com/YOUR-USERNAME/YOUR-REPO-NAME"
echo ""
echo "Good luck with your submission! 🍀"
