# Deployment Guide

## Deploy to Render (Recommended - Free)

### Prerequisites
1. GitHub account
2. MongoDB Atlas account (free tier)

### Step 1: Prepare MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. In "Network Access", add `0.0.0.0/0` to allow connections from anywhere

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect settings from `render.yaml`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Will be auto-generated
6. Click "Create Web Service"

Your API will be live at: `https://your-app-name.onrender.com`

---

## Alternative: Deploy to Railway

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login and Deploy

```bash
railway login
railway init
railway up
```

### Step 3: Add Environment Variables

```bash
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set JWT_SECRET="your_secret_key"
```

---

## Alternative: Deploy to Heroku

### Step 1: Install Heroku CLI

Download from [heroku.com/cli](https://devcenter.heroku.com/articles/heroku-cli)

### Step 2: Deploy

```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret_key"
git push heroku main
```

---

## Testing Deployed API

Once deployed, test with:

```bash
# Health check
curl https://your-app-name.onrender.com/health

# Register employee
curl -X POST https://your-app-name.onrender.com/api/employees/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"Developer","password":"test123"}'
```

## Important Notes

- Free tier services may sleep after inactivity (takes 30s to wake up)
- Always use MongoDB Atlas for production (not local MongoDB)
- Keep your JWT_SECRET secure
- Update CORS settings if needed for frontend integration
