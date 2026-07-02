# Project Structure

## Overview

```
Atha/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── index.ts           # Application entry point
│   │   ├── config/            # Configuration files
│   │   │   ├── database.ts    # PostgreSQL connection
│   │   │   └── redis.ts       # Redis client
│   │   ├── middleware/        # Express middleware
│   │   │   └── auth.ts        # JWT authentication
│   │   ├── routes/            # API routes
│   │   │   ├── auth.ts        # Authentication endpoints
│   │   │   ├── market.ts      # Market data endpoints
│   │   │   ├── trading.ts     # Trading endpoints
│   │   │   ├── wallet.ts      # Wallet endpoints
│   │   │   └── user.ts        # User endpoints
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   │   ├── authService.ts
│   │   │   └── passwordService.ts
│   │   ├── repositories/      # Data access layer
│   │   │   ├── userRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   ├── walletRepository.ts
│   │   │   ├── transactionRepository.ts
│   │   │   └── marketRepository.ts
│   │   ├── types/             # TypeScript interfaces
│   │   │   ├── user.ts
│   │   │   ├── order.ts
│   │   │   ├── wallet.ts
│   │   │   ├── transaction.ts
│   │   │   ├── market.ts
│   │   │   └── response.ts
│   │   ├── migrations/        # Database migrations
│   │   │   ├── 001_create_initial_schema.sql
│   │   │   └── run.ts
│   │   └── utils/             # Utility functions
│   │       └── logger.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/                   # React web application
│   ├── src/
│   │   ├── main.tsx           # React entry point
│   │   ├── App.tsx            # Root component
│   │   ├── index.css          # Global styles
│   │   ├── components/        # Reusable components
│   │   │   └── Layout.tsx     # Main layout
│   │   ├── pages/             # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Market.tsx
│   │   │   ├── Trading.tsx
│   │   │   ├── Wallet.tsx
│   │   │   └── Profile.tsx
│   │   └── store/             # State management (Zustand)
│   │       ├── auth.ts
│   │       ├── market.ts
│   │       └── wallet.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── docs/                       # Documentation
│   ├── API.md                 # API endpoints reference
│   ├── DATABASE.md            # Database schema
│   ├── WEBSOCKET.md           # WebSocket events
│   ├── SETUP.md               # Detailed setup guide
│   ├── SECURITY.md            # Security guidelines
│   ├── CONTRIBUTING.md        # Contributing guide
│   ├── ENVIRONMENT.md         # Environment variables
│   └── DEPLOYMENT.md          # Deployment guide
│
├── docker-compose.yml          # Docker services
├── .gitignore                  # Git ignore rules
├── README.md                   # Project overview
├── QUICK_START.md              # Quick start guide
├── PROJECT_STRUCTURE.md        # This file
├── FEATURES.md                 # Feature list
└── LICENSE                     # MIT License
```

## Key Directories

### Backend (`/backend/src`)

#### **config/**
Database and external service configurations.
- `database.ts` - PostgreSQL connection pool
- `redis.ts` - Redis client and cache operations

#### **middleware/**
Express middleware for cross-cutting concerns.
- `auth.ts` - JWT token verification and generation

#### **routes/**
API endpoint definitions organized by feature.
- `auth.ts` - Login, register, token refresh
- `market.ts` - Market data and price feeds
- `trading.ts` - Order management
- `wallet.ts` - Balance and transactions
- `user.ts` - User profile management

#### **services/**
Business logic and external API integrations.
- `authService.ts` - Authentication logic
- `passwordService.ts` - Password hashing and comparison
- Additional services for trading, market data, etc.

#### **repositories/**
Data access layer with database queries.
- `userRepository.ts` - User CRUD operations
- `orderRepository.ts` - Order management
- `walletRepository.ts` - Wallet operations
- `transactionRepository.ts` - Transaction logging
- `marketRepository.ts` - Market data queries

#### **types/**
TypeScript interfaces and types.
- Ensures type safety across the application

#### **migrations/**
Database schema and migration runner.
- `001_create_initial_schema.sql` - Initial tables
- `run.ts` - Migration execution engine

### Frontend (`/frontend/src`)

#### **pages/**
Full-page components representing routes.
- `Login.tsx` - User authentication
- `Dashboard.tsx` - Portfolio overview
- `Market.tsx` - Market data and tickers
- `Trading.tsx` - Order placement
- `Wallet.tsx` - Balance management
- `Profile.tsx` - User settings

#### **components/**
Reusable UI components.
- `Layout.tsx` - Navigation and main layout
- Additional components for charts, tables, forms, etc.

#### **store/**
Zustand store for state management.
- `auth.ts` - Authentication state
- `market.ts` - Market data state
- `wallet.ts` - Wallet state

## Data Flow

### Authentication Flow
1. User submits credentials on Login page
2. `authService.login()` validates credentials
3. JWT token generated and stored in auth store
4. User redirected to dashboard with authenticated routes

### Trading Flow
1. User selects trading parameters
2. Order sent to `/api/v1/trading/orders` endpoint
3. `orderRepository` validates balance
4. Order stored in database
5. Real-time update via WebSocket

### Market Data Flow
1. Frontend requests `/api/v1/market/tickers`
2. `marketRepository` fetches from database or external API
3. Data cached in Redis (5 min TTL)
4. WebSocket broadcasts real-time updates

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: JWT
- **Logging**: Winston

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State**: Zustand
- **HTTP**: Axios
- **Real-time**: Socket.io
- **Icons**: React Icons

## Database Schema

### Core Tables
- **users** - User accounts and profiles
- **wallets** - User cryptocurrency wallets
- **orders** - Trading orders
- **transactions** - Transaction history
- **market_data** - Cryptocurrency prices and statistics
- **deposits** - Cryptocurrency deposits
- **withdrawals** - Cryptocurrency withdrawals
- **audit_logs** - Activity logging

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token

### Market
- `GET /api/v1/market/tickers` - List all tickers
- `GET /api/v1/market/ticker/:symbol` - Get ticker
- `GET /api/v1/market/orderbook/:symbol` - Get order book

### Trading
- `POST /api/v1/trading/orders` - Create order
- `GET /api/v1/trading/orders` - List orders
- `GET /api/v1/trading/orders/:id` - Get order
- `DELETE /api/v1/trading/orders/:id` - Cancel order

### Wallet
- `GET /api/v1/wallet/balance` - Get balance
- `GET /api/v1/wallet/deposit/:currency` - Get deposit address
- `POST /api/v1/wallet/withdraw` - Initiate withdrawal

### User
- `GET /api/v1/user/profile` - Get profile
- `PUT /api/v1/user/profile` - Update profile
- `POST /api/v1/user/2fa/enable` - Enable 2FA
- `POST /api/v1/user/2fa/verify` - Verify 2FA

## Environment Setup

Each directory has `.env.example` files:
- Backend: `backend/.env.example`
- Frontend: `frontend/.env.example`

Copy and configure for your environment.

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes with proper types and tests
3. Commit with clear messages: `git commit -m "Type: description"`
4. Push: `git push origin feature/name`
5. Create Pull Request
6. Code review and merge to main

## Performance Considerations

- **Caching**: Redis for market data (5 min TTL)
- **Pagination**: Limit API responses to 100 items
- **Database Indexes**: On frequently queried columns
- **Connection Pooling**: PostgreSQL with min 2, max 20 connections
- **Code Splitting**: Frontend uses Vite for optimal bundling

## Security Measures

- JWT tokens with 7-day expiration
- Password hashing with bcryptjs (10 rounds)
- CORS configuration
- Rate limiting (100 req/min per IP)
- SQL injection prevention via parameterized queries
- Input validation on all endpoints

## Testing

### Backend
- Unit tests for services and utilities
- Integration tests for API endpoints
- Jest framework

### Frontend
- Component tests with React Testing Library
- E2E tests for critical flows
- Vitest for unit tests

## Deployment

Supported platforms:
- Docker / Docker Compose
- Heroku
- AWS EC2
- DigitalOcean
- Vercel (frontend)

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for details.

## File Naming Conventions

- **Services**: `featureService.ts`
- **Repositories**: `featureRepository.ts`
- **Routes**: `feature.ts` (in routes folder)
- **Types**: `feature.ts` (in types folder)
- **Pages**: `Feature.tsx` (PascalCase)
- **Components**: `Feature.tsx` (PascalCase)
- **Stores**: `feature.ts` (in store folder)

## Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines on:
- Code style
- Git workflow
- Pull request requirements
- Testing
- Documentation
