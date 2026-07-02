export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'trading' | 'commission';
  currency: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'pending' | 'completed' | 'failed';
  orderId?: string;
  txHash?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deposit {
  id: string;
  userId: string;
  currency: string;
  amount: number;
  address: string;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  requiredConfirmations: number;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface Withdrawal {
  id: string;
  userId: string;
  currency: string;
  amount: number;
  address: string;
  tag?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  txHash?: string;
  fee?: number;
  createdAt: Date;
  processedAt?: Date;
}
