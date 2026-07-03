# Complete Setup Guide for Atha

## 🚀 Quick Setup (Recommended - Using Docker)

If you have Docker installed, this is the fastest way to get the app running.

### Prerequisites
- Docker Desktop or Docker Engine
- Docker Compose

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/wagaban150-collab/Atha.git
   cd Atha
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start all services**
   ```bash
   docker-compose up
   ```
   This will start:
   - PostgreSQL database
   - Redis cache
   - Backend API server
   - (You'll start frontend separately)

4. **In a new terminal, start the frontend**
   ```bash
   cd Atha/frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/health

---

## 📋 Local Setup (Without Docker)

### Prerequisites
- Node.js v18 or higher
- PostgreSQL v14 or higher
- Redis 6+
- npm or yarn

### Step 1: Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download and install from https://www.postgresql.org/download/windows/
- Run installer and follow prompts

### Step 2: Install Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

**Windows:**
- Use Windows Subsystem for Linux (WSL) with Linux commands above
- Or download from: https://github.com/microsoftarchive/redis/releases

### Step 3: Setup Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE atha_db;
CREATE USER atha_user WITH PASSWORD 'atha_password_secure_2026';
ALTER ROLE atha_user SET client_encoding TO 'utf8';
ALTER ROLE atha_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE atha_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE atha_db TO atha_user;

# Exit psql
\q
```

Verify connection:
```bash
psql -U atha_user -d atha_db -h localhost
```

### Step 4: Clone and Setup Backend

```bash
git clone https://github.com/wagaban150-collab/Atha.git
cd Atha/backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Run database migrations
npm run migrate

# Start backend server
npm run dev
```

You should see:
```
Database connected successfully
Redis connected successfully
Server running on port 3001
```

### Step 5: Setup Frontend

Open a new terminal:

```bash
cd Atha/frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server
npm run dev
```

You should see:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## 🧪 Testing the Application

### Test the Backend API

```bash
# Check API health
curl http://localhost:3001/health

# Expected response:
# {"status":"healthy","timestamp":"2026-07-03T..."}
```

### Test in Browser

1. Open http://localhost:5173 in your browser
2. You should see the Atha login page
3. Click "Register" to create a new account
4. Fill in:
   - Email: test@example.com
   - Password: Test@1234
   - Full Name: Test User
5. Click "Register"
6. Login with your credentials
7. You should see the dashboard

---

## 📁 Project Structure

```
Atha/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── index.ts        # Entry point
│   │   ├── config/         # Database & Redis config
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Data access
│   │   ├── migrations/     # Database schema
│   │   └── utils/          # Utilities
│   ├── package.json
│   ├── .env               # Environment variables
│   └── Dockerfile
│
├── frontend/                # React app
│   ├── src/
│   │   ├── main.tsx       # Entry point
│   │   ├── App.tsx        # Root component
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── store/         # State management
│   │   └── utils/         # Utilities
│   ├── package.json
│   ├── .env              # Environment variables
│   └── vite.config.ts
│
├── docker-compose.yml      # Docker orchestration
├── .env.example           # Example env file
└── README.md              # Project overview
```

---

## 🛠️ Common Commands

### Backend Commands
```bash
cd backend

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build

# Database
npm run migrate      # Run migrations

# Testing & Quality
npm test             # Run tests
npm run lint         # Run linter
```

### Frontend Commands
```bash
cd frontend

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run linter
```

### Docker Commands
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis

# Rebuild containers
docker-compose up --build
```

---

## 🔧 Troubleshooting

### Issue: "Port 5432 already in use"
**Solution:**
```bash
# Find and kill process using port 5432
lsof -i :5432
kill -9 <PID>

# Or change port in docker-compose.yml or .env
```

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Database connection failed"
**Solution:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Check .env file has correct credentials
cat backend/.env

# Verify database exists
psql -U postgres -l | grep atha_db
```

### Issue: "Redis connection refused"
**Solution:**
```bash
# Check Redis is running
redis-cli ping

# If not installed:
brew install redis  # macOS
sudo apt-get install redis-server  # Linux

# Start Redis
brew services start redis  # macOS
sudo systemctl start redis-server  # Linux
```

### Issue: "Cannot connect to frontend"
**Solution:**
1. Make sure frontend dev server is running: `npm run dev` in `frontend/` directory
2. Check that it's running on port 5173 (default Vite port)
3. Clear browser cache and reload
4. Check browser console for errors (F12)

### Issue: "VITE_API_URL is undefined"
**Solution:**
```bash
cd frontend
# Create or update .env file
echo 'VITE_API_URL=http://localhost:3001' > .env

# Restart frontend dev server
npm run dev
```

---

## 🔐 Security Checklist

### Before Production:

- [ ] Change `JWT_SECRET` in `.env` to a strong random value
- [ ] Update database password in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Update `CLIENT_URL` to your production domain
- [ ] Enable HTTPS on production
- [ ] Set up proper CORS configuration
- [ ] Implement rate limiting (already in code)
- [ ] Set up authentication tokens properly
- [ ] Use environment-specific configuration
- [ ] Set up SSL certificates

---

## 📚 Additional Resources

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [WebSocket Events](./docs/WEBSOCKET.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Features Roadmap](./FEATURES.md)

---

## 🆘 Getting Help

1. Check the [GitHub Issues](https://github.com/wagaban150-collab/Atha/issues)
2. Review the documentation in the `docs/` folder
3. Check the troubleshooting section above
4. Open a new issue with detailed error information

---

## ✅ Verification Checklist

After setup, verify everything is working:

- [ ] Backend API running on port 3001
- [ ] Frontend app running on port 5173
- [ ] PostgreSQL database connected
- [ ] Redis cache connected
- [ ] Can load frontend in browser
- [ ] Can register a new account
- [ ] Can login with credentials
- [ ] Can see dashboard after login
- [ ] No console errors in browser
- [ ] Backend logs show no errors

---

You're all set! 🎉 The Atha cryptocurrency trading platform is ready for development!
