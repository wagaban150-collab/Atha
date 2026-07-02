# Project Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=atha_user
DB_PASSWORD=your_password
DB_NAME=atha_db
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### 3. Setup Database

#### With Docker
```bash
docker-compose up -d postgres redis
```

#### Manual Setup
```bash
# Create database
psql -U postgres
CREATE DATABASE atha_db;
CREATE USER atha_user WITH PASSWORD 'atha_password';
ALTER ROLE atha_user SET client_encoding TO 'utf8';
ALTER ROLE atha_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE atha_user SET default_transaction_deferrable TO on;
ALTER ROLE atha_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE atha_db TO atha_user;
```

### 4. Run Migrations
```bash
npm run migrate
```

### 5. Start Backend Server
```bash
npm run dev
```

Server will be available at `http://localhost:3001`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:3000`

## Docker Setup (Recommended)

### Start All Services
```bash
docker-compose up
```

This will start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 3001)

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
npm run build
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

## Troubleshooting

### Database Connection Issues

1. Check PostgreSQL is running
   ```bash
   psql -U atha_user -d atha_db -h localhost
   ```

2. Check environment variables in `.env`

3. Review backend logs for detailed error messages

### Redis Connection Issues

1. Check Redis is running
   ```bash
   redis-cli ping
   ```
   Should return `PONG`

2. Check Redis configuration in `.env`

### Port Already in Use

1. Find process using port:
   ```bash
   lsof -i :3000  # Frontend
   lsof -i :3001  # Backend
   lsof -i :5432  # PostgreSQL
   lsof -i :6379  # Redis
   ```

2. Kill process:
   ```bash
   kill -9 <PID>
   ```

## Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and commit
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

3. Push to GitHub
   ```bash
   git push origin feature/your-feature
   ```

4. Create a Pull Request

## Useful Commands

### View Database Schema
```bash
# Connect to database
psql -U atha_user -d atha_db -h localhost

# List tables
\dt

# View table structure
\d table_name
```

### Clear Redis Cache
```bash
redis-cli FLUSHALL
```

### Format Code
```bash
# Backend
cd backend && npm run lint -- --fix

# Frontend
cd frontend && npm run lint -- --fix
```
