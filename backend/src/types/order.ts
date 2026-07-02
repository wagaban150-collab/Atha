export interface Order {
  id: string;
  userId: string;
  symbol: string;
  type: 'market' | 'limit' | 'stop';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'partial' | 'cancelled';
  filledQuantity: number;
  averagePrice?: number;
  totalValue?: number;
  commissionAmount?: number;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface CreateOrderInput {
  symbol: string;
  type: 'market' | 'limit' | 'stop';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  stopPrice?: number;
}

export interface OrderResponse {
  orderId: string;
  symbol: string;
  type: string;
  side: string;
  quantity: number;
  price?: number;
  status: string;
  filledQuantity: number;
  averagePrice?: number;
  createdAt: Date;
}
