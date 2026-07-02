# API Documentation

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}

Response: { token, user }
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "..."
}

Response: { token }
```

### Market Data

#### Get Ticker
```
GET /market/ticker/:symbol
Parameters:
  - symbol: BTC/USD, ETH/USD, etc.

Response: {
  symbol: string,
  price: number,
  change24h: number,
  changePercent24h: number,
  high24h: number,
  low24h: number,
  volume24h: number
}
```

#### Get All Tickers
```
GET /market/tickers?limit=50&offset=0

Response: [
  { symbol, price, change24h, changePercent24h, ... },
  ...
]
```

#### Get Order Book
```
GET /market/orderbook/:symbol
Parameters:
  - limit: 10, 20, 50, 100 (default: 20)

Response: {
  symbol: string,
  bids: [[price, quantity], ...],
  asks: [[price, quantity], ...],
  timestamp: number
}
```

### Trading

#### Create Order
```
POST /trading/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "BTC/USD",
  "type": "market|limit|stop",
  "side": "buy|sell",
  "quantity": 0.5,
  "price": 45000 (required for limit orders),
  "stopPrice": 44000 (required for stop orders)
}

Response: {
  orderId: string,
  symbol: string,
  type: string,
  side: string,
  quantity: number,
  price: number,
  status: "pending|filled|partial|cancelled",
  createdAt: timestamp
}
```

#### Get Order
```
GET /trading/orders/:orderId
Authorization: Bearer <token>

Response: { orderId, symbol, type, side, quantity, price, status, createdAt }
```

#### Get User Orders
```
GET /trading/orders?status=pending&limit=50&offset=0
Authorization: Bearer <token>

Response: [
  { orderId, symbol, type, side, quantity, price, status, createdAt },
  ...
]
```

#### Cancel Order
```
DELETE /trading/orders/:orderId
Authorization: Bearer <token>

Response: { success: true, message: "Order cancelled" }
```

### Wallet

#### Get Wallet Balance
```
GET /wallet/balance
Authorization: Bearer <token>

Response: {
  userId: string,
  balances: {
    "USD": { available: 10000, locked: 500 },
    "BTC": { available: 1.5, locked: 0.1 },
    ...
  }
}
```

#### Get Deposit Address
```
GET /wallet/deposit/:currency
Authorization: Bearer <token>

Response: {
  currency: string,
  address: string,
  tag: string (optional)
}
```

#### Withdraw
```
POST /wallet/withdraw
Authorization: Bearer <token>
Content-Type: application/json

{
  "currency": "BTC",
  "amount": 0.5,
  "address": "1A1z7agoat...",
  "tag": "optional-memo"
}

Response: {
  withdrawalId: string,
  currency: string,
  amount: number,
  address: string,
  status: "pending",
  createdAt: timestamp
}
```

### User

#### Get Profile
```
GET /user/profile
Authorization: Bearer <token>

Response: {
  userId: string,
  email: string,
  fullName: string,
  status: "active|suspended",
  createdAt: timestamp,
  twoFactorEnabled: boolean
}
```

#### Update Profile
```
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phone": "+1234567890"
}

Response: { userId, email, fullName, ... }
```

#### Enable 2FA
```
POST /user/2fa/enable
Authorization: Bearer <token>

Response: {
  secret: string,
  qrCode: string
}
```

#### Verify 2FA
```
POST /user/2fa/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "123456"
}

Response: { success: true }
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": "..."
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "requestId": "..."
}
```

## Rate Limits

- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- WebSocket connections: 10 per user
