# API Testing Guide

## Testing the Atha API

This guide explains how to test the Atha API endpoints using cURL, Postman, or other tools.

## Prerequisites

- Backend running on `http://localhost:3001`
- cURL installed (or Postman)

## API Base URL

```
http://localhost:3001/api/v1
```

## Health Check

First, verify the API is running:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-03T..."
}
```

## Authentication Endpoints

### Register User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "fullName": "Test User"
  }'
```

Expected response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "fullName": "Test User"
  }
}
```

### Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

Expected response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "fullName": "Test User"
  }
}
```

**Save the token for authenticated requests:**
```bash
export TOKEN="your-token-here"
```

## Market Endpoints

### Get Market Data

```bash
curl http://localhost:3001/api/v1/market/tickers \
  -H "Authorization: Bearer $TOKEN"
```

### Get Price for Symbol

```bash
curl http://localhost:3001/api/v1/market/tickers/BTCUSD \
  -H "Authorization: Bearer $TOKEN"
```

## Wallet Endpoints

### Get User Wallets

```bash
curl http://localhost:3001/api/v1/wallet/balances \
  -H "Authorization: Bearer $TOKEN"
```

### Get Wallet by Currency

```bash
curl http://localhost:3001/api/v1/wallet/balances/BTC \
  -H "Authorization: Bearer $TOKEN"
```

### Deposit (Simulate)

```bash
curl -X POST http://localhost:3001/api/v1/wallet/deposit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "BTC",
    "amount": 1.5
  }'
```

### Withdraw (Simulate)

```bash
curl -X POST http://localhost:3001/api/v1/wallet/withdraw \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "BTC",
    "amount": 0.5
  }'
```

## Trading Endpoints

### Place Order

```bash
curl -X POST http://localhost:3001/api/v1/trading/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSD",
    "type": "limit",
    "side": "buy",
    "quantity": 0.1,
    "price": 40000
  }'
```

### Get Orders

```bash
curl http://localhost:3001/api/v1/trading/orders \
  -H "Authorization: Bearer $TOKEN"
```

### Get Order by ID

```bash
curl http://localhost:3001/api/v1/trading/orders/order-id \
  -H "Authorization: Bearer $TOKEN"
```

### Cancel Order

```bash
curl -X DELETE http://localhost:3001/api/v1/trading/orders/order-id \
  -H "Authorization: Bearer $TOKEN"
```

## User Endpoints

### Get Profile

```bash
curl http://localhost:3001/api/v1/user/profile \
  -H "Authorization: Bearer $TOKEN"
```

### Update Profile

```bash
curl -X PUT http://localhost:3001/api/v1/user/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "New Name",
    "phone": "+1234567890",
    "address": "123 Street",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  }'
```

## Using Postman

1. **Import Collection:**
   - Open Postman
   - Click "Import"
   - Choose file or paste raw JSON

2. **Set Environment Variables:**
   - Click "Environments"
   - Create new environment
   - Set `base_url` = `http://localhost:3001/api/v1`
   - Set `token` = (leave empty initially)

3. **First Request - Register:**
   - Method: POST
   - URL: `{{base_url}}/auth/register`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "Test@1234",
       "fullName": "Test User"
     }
     ```

4. **Second Request - Login:**
   - Method: POST
   - URL: `{{base_url}}/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "Test@1234"
     }
     ```
   - In "Tests" tab, add:
     ```javascript
     pm.environment.set("token", pm.response.json().token);
     ```

5. **Authenticated Requests:**
   - Add header: `Authorization` = `Bearer {{token}}`
   - Token will be automatically set from login response

## Response Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Common Errors

### "Invalid token"
- Solution: Make sure token is not expired and is properly formatted

### "Insufficient balance"
- Solution: Deposit funds first or check wallet balance

### "Invalid symbol"
- Solution: Use valid trading pairs like BTCUSD, ETHUSD, etc.

### "Port 3001 not listening"
- Solution: Make sure backend is running with `npm run dev`

## Testing Workflow

1. **Register new user**
2. **Login and get token**
3. **Check wallet balances**
4. **Deposit funds (test)**
5. **Place orders**
6. **Check order status**
7. **View transactions**
8. **Update profile**

## WebSocket Testing

### Price Updates

Connect to WebSocket to receive real-time price updates:

```javascript
const socket = io('http://localhost:3001');

// Join price feed for Bitcoin
socket.emit('join-ticker', 'BTCUSD');

// Listen for price updates
socket.on('ticker:BTCUSD', (data) => {
  console.log('Price update:', data);
});

// Leave price feed
socket.emit('leave-ticker', 'BTCUSD');
```

## Performance Testing

Test API response times:

```bash
for i in {1..100}; do
  time curl http://localhost:3001/api/v1/market/tickers \
    -H "Authorization: Bearer $TOKEN"
done
```

## Security Testing

1. **Try without token:**
   ```bash
   curl http://localhost:3001/api/v1/user/profile
   # Should return 401 Unauthorized
   ```

2. **Try with invalid token:**
   ```bash
   curl http://localhost:3001/api/v1/user/profile \
     -H "Authorization: Bearer invalid-token"
   # Should return 401 Unauthorized
   ```

3. **Test rate limiting:**
   ```bash
   for i in {1..150}; do
     curl http://localhost:3001/api/v1/market/tickers
   done
   # Should be rate limited after 100 requests
   ```

## Next Steps

- Review API documentation: `docs/API.md`
- Check WebSocket events: `docs/WEBSOCKET.md`
- Explore database schema: `docs/DATABASE.md`
