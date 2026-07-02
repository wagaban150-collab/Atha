export interface Wallet {
  id: string;
  userId: string;
  currency: string;
  availableBalance: number;
  lockedBalance: number;
  totalBalance: number;
  depositAddress?: string;
  depositTag?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletBalance {
  [currency: string]: {
    available: number;
    locked: number;
    total: number;
  };
}
