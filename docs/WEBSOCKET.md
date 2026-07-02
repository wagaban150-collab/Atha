# WebSocket Events

## Connection

### Client connects to server
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

## Market Data Events

### Subscribe to ticker updates
```javascript
// Client sends
socket.emit('join-ticker', 'BTC/USD');

// Server broadcasts
socket.on('ticker-update', (data) => {
  console.log(data);
  // {
  //   symbol: 'BTC/USD',
  //   price: 45000.00,
  //   change24h: 1500.00,
  //   changePercent24h: 3.45,
  //   high24h: 46000.00,
  //   low24h: 44000.00,
  //   volume24h: 1000000000
  // }
});
```

### Unsubscribe from ticker
```javascript
socket.emit('leave-ticker', 'BTC/USD');
```

### Subscribe to order book updates
```javascript
// Client sends
socket.emit('join-orderbook', 'BTC/USD');

// Server broadcasts
socket.on('orderbook-update', (data) => {
  console.log(data);
  // {
  //   symbol: 'BTC/USD',
  //   bids: [[45000, 1.5], [44999, 2.0], ...],
  //   asks: [[45001, 1.2], [45002, 1.8], ...],
  //   timestamp: 1234567890000
  // }
});
```

### Subscribe to klines (candlestick data)
```javascript
// Client sends
socket.emit('join-kline', { symbol: 'BTC/USD', interval: '1m' });

// Server broadcasts
socket.on('kline-update', (data) => {
  console.log(data);
  // {
  //   symbol: 'BTC/USD',
  //   interval: '1m',
  //   open: 45000,
  //   high: 45100,
  //   low: 44900,
  //   close: 45050,
  //   volume: 100000,
  //   time: 1234567890000
  // }
});
```

## User-Specific Events

### Order updates
```javascript
// Server broadcasts to user
socket.on('order-update', (order) => {
  console.log(order);
  // {
  //   orderId: 'order-123',
  //   symbol: 'BTC/USD',
  //   type: 'limit',
  //   side: 'buy',
  //   quantity: 1.5,
  //   price: 45000,
  //   status: 'filled',
  //   filledQuantity: 1.5,
  //   averagePrice: 45010,
  //   timestamp: 1234567890000
  // }
});
```

### Trade execution
```javascript
// Server broadcasts to user
socket.on('trade-executed', (trade) => {
  console.log(trade);
  // {
  //   tradeId: 'trade-456',
  //   orderId: 'order-123',
  //   symbol: 'BTC/USD',
  //   side: 'buy',
  //   quantity: 0.5,
  //   price: 45000,
  //   commission: 0.0005,
  //   timestamp: 1234567890000
  // }
});
```

### Balance update
```javascript
// Server broadcasts to user
socket.on('balance-update', (balance) => {
  console.log(balance);
  // {
  //   currency: 'BTC',
  //   available: 1.5,
  //   locked: 0.5,
  //   total: 2.0
  // }
});
```

## Error Handling

```javascript
socket.on('error', (error) => {
  console.error('Socket error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```
