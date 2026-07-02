# Database Schema

## Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  kyc_status VARCHAR(50) DEFAULT 'pending',
  kyc_document_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  zip_code VARCHAR(20),
  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

## Wallets Table
```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL,
  available_balance DECIMAL(20, 8) DEFAULT 0,
  locked_balance DECIMAL(20, 8) DEFAULT 0,
  total_balance DECIMAL(20, 8) GENERATED ALWAYS AS (available_balance + locked_balance) STORED,
  deposit_address VARCHAR(255),
  deposit_tag VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, currency),
  INDEX idx_user_id (user_id),
  INDEX idx_currency (currency)
);
```

## Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'market', 'limit', 'stop'
  side VARCHAR(10) NOT NULL, -- 'buy', 'sell'
  quantity DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8),
  stop_price DECIMAL(20, 8),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'filled', 'partial', 'cancelled'
  filled_quantity DECIMAL(20, 8) DEFAULT 0,
  average_price DECIMAL(20, 8),
  total_value DECIMAL(20, 2),
  commission_amount DECIMAL(20, 8),
  commission_rate DECIMAL(5, 4) DEFAULT 0.001,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_symbol (symbol),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

## Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- 'deposit', 'withdrawal', 'trading', 'commission'
  currency VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  balance_before DECIMAL(20, 8),
  balance_after DECIMAL(20, 8),
  status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  order_id UUID REFERENCES orders(id),
  tx_hash VARCHAR(255), -- For blockchain transactions
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_created_at (created_at)
);
```

## Market Data Table
```sql
CREATE TABLE market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  high_24h DECIMAL(20, 8),
  low_24h DECIMAL(20, 8),
  volume_24h DECIMAL(20, 2),
  change_24h DECIMAL(20, 8),
  change_percent_24h DECIMAL(10, 4),
  market_cap DECIMAL(20, 2),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(symbol),
  INDEX idx_symbol (symbol),
  INDEX idx_updated_at (updated_at)
);
```

## Deposits Table
```sql
CREATE TABLE deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  address VARCHAR(255),
  tx_hash VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'failed'
  confirmations INTEGER DEFAULT 0,
  required_confirmations INTEGER DEFAULT 6,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_tx_hash (tx_hash)
);
```

## Withdrawals Table
```sql
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  address VARCHAR(255) NOT NULL,
  tag VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  tx_hash VARCHAR(255),
  fee DECIMAL(20, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);
```

## Audit Log Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id VARCHAR(255),
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_created_at (created_at)
);
```
