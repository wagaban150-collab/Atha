# Quick Start Guide

Get Atha running in 5 minutes!

## Option 1: Docker (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/wagaban150-collab/Atha.git
   cd Atha
   ```

2. **Start services**
   ```bash
   docker-compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api/v1

4. **Stop services**
   ```bash
   docker-compose down
   ```

## Option 2: Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Create database** (if PostgreSQL not running)
   ```bash
   createdb atha_db
   ```

5. **Run migrations**
   ```bash
   npm run migrate
   ```

6. **Start server**
   ```bash
   npm run dev
   ```

   Backend available at: http://localhost:3001

### Frontend Setup (New Terminal)

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend available at: http://localhost:3000

## Test the Application

1. **Open browser** → http://localhost:3000

2. **Create account**
   - Click "Register"
   - Enter email, password, and full name
   - Click "Register"

3. **Login**
   - Use your credentials
   - You'll be redirected to dashboard

4. **Explore features**
   - View market data
   - Check wallet balances
   - Place test orders
   - View profile settings

## Common Issues

### Port Already in Use
```bash
# Kill process on port
lsof -i :3000  # Frontend
lsof -i :3001  # Backend

kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Create database if needed
createdb atha_db
```

### Redis Connection Error
```bash
# Check Redis is running
redis-cli ping
# Should return: PONG
```

## Environment Configuration

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=atha_user
DB_PASSWORD=atha_password
DB_NAME=atha_db
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-dev-secret-key
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_WS_URL=ws://localhost:3001
```

## Next Steps

- Read [SETUP.md](./docs/SETUP.md) for detailed setup
- Check [API.md](./docs/API.md) for API documentation
- Review [CONTRIBUTING.md](./docs/CONTRIBUTING.md) to contribute
- Visit [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) to understand the codebase

## Support

For issues or questions:
1. Check [GitHub Issues](https://github.com/wagaban150-collab/Atha/issues)
2. Review documentation
3. Open a new issue with details

## Development Commands

### Backend
```bash
cd backend
npm run dev        # Start dev server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run linter
npm run migrate    # Run database migrations
```

### Frontend
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

Happy trading! 🚀
