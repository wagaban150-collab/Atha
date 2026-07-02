# Environment Variables

## Backend (.env)

### Server
```
PORT=3001
NODE_ENV=development|production
```

### Database
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=atha_user
DB_PASSWORD=secure_password
DB_NAME=atha_db
DB_POOL_MIN=2
DB_POOL_MAX=20
```

### Redis
```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

### Authentication
```
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d
```

### External APIs
```
BINANCE_API_KEY=your_key
BINANCE_API_SECRET=your_secret
COINGECKO_API_KEY=your_key
```

### Email Service
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@atha.io
```

### CORS
```
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,https://atha.io
```

### Logging
```
LOG_LEVEL=info|debug|warn|error
LOG_FILE=logs/combined.log
ERROR_LOG_FILE=logs/error.log
```

### Security
```
BCRYPT_ROUNDS=10
SESSION_SECRET=session_secret_key
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=15m
```

## Frontend (.env)

### API
```
VITE_API_URL=http://localhost:3001/api/v1
VITE_WS_URL=ws://localhost:3001
```

### Environment
```
VITE_ENV=development|production
```

### Analytics (Optional)
```
VITE_SENTRY_DSN=
VITE_GA_ID=
```

## Environment File Structure

### Example .env for Development
```env
# Backend Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=atha_user
DB_PASSWORD=atha_password
DB_NAME=atha_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-dev-secret-key-must-be-long-enough
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

### Example .env for Production
```env
# Backend Server
PORT=3001
NODE_ENV=production

# Database
DB_HOST=prod-db.example.com
DB_PORT=5432
DB_USER=atha_user
DB_PASSWORD=strong_secure_password
DB_NAME=atha_db_prod

# Redis
REDIS_HOST=prod-redis.example.com
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# JWT
JWT_SECRET=production_secret_key_very_long_random_string
JWT_EXPIRE=7d

# CORS
CLIENT_URL=https://atha.io

# Logging
LOG_LEVEL=warn
```

## Important Notes

- Never commit actual `.env` files
- Use `.env.example` as template
- Different values for dev/staging/production
- Rotate secrets regularly
- Use strong, random values for secrets
- Keep `.env` files in `.gitignore`
