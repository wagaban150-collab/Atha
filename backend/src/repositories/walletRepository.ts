import { query } from '../config/database';
import { Wallet } from '../types/wallet';
import logger from '../utils/logger';

export class WalletRepository {
  async findByUserIdAndCurrency(userId: string, currency: string): Promise<Wallet | null> {
    try {
      const result = await query(
        'SELECT * FROM wallets WHERE user_id = $1 AND currency = $2',
        [userId, currency]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding wallet:', error);
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<Wallet[]> {
    try {
      const result = await query('SELECT * FROM wallets WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      logger.error('Error finding wallets by user:', error);
      throw error;
    }
  }

  async createOrUpdate(userId: string, currency: string): Promise<Wallet> {
    try {
      const result = await query(
        `INSERT INTO wallets (user_id, currency, available_balance, locked_balance, created_at, updated_at)
         VALUES ($1, $2, 0, 0, NOW(), NOW())
         ON CONFLICT (user_id, currency) DO UPDATE SET updated_at = NOW()
         RETURNING *`,
        [userId, currency]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating/updating wallet:', error);
      throw error;
    }
  }

  async updateBalance(userId: string, currency: string, availableDelta: number, lockedDelta: number = 0): Promise<Wallet | null> {
    try {
      const result = await query(
        `UPDATE wallets 
         SET available_balance = available_balance + $1,
             locked_balance = locked_balance + $2,
             updated_at = NOW()
         WHERE user_id = $3 AND currency = $4
         RETURNING *`,
        [availableDelta, lockedDelta, userId, currency]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating balance:', error);
      throw error;
    }
  }

  async getBalance(userId: string, currency: string): Promise<{ available: number; locked: number } | null> {
    try {
      const result = await query(
        'SELECT available_balance, locked_balance FROM wallets WHERE user_id = $1 AND currency = $2',
        [userId, currency]
      );
      if (result.rows.length === 0) return null;
      return {
        available: result.rows[0].available_balance,
        locked: result.rows[0].locked_balance
      };
    } catch (error) {
      logger.error('Error getting balance:', error);
      throw error;
    }
  }
}

export const walletRepository = new WalletRepository();
