import { query } from '../config/database';
import { Transaction, Deposit, Withdrawal } from '../types/transaction';
import logger from '../utils/logger';

export class TransactionRepository {
  async findByUserId(userId: string, limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    try {
      const result = await query(
        'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [userId, limit, offset]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error finding transactions:', error);
      throw error;
    }
  }

  async create(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    try {
      const result = await query(
        `INSERT INTO transactions (user_id, type, currency, amount, balance_before, balance_after, status, order_id, tx_hash, description, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
         RETURNING *`,
        [data.userId, data.type, data.currency, data.amount, data.balanceBefore, data.balanceAfter, data.status, data.orderId || null, data.txHash || null, data.description || null]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating transaction:', error);
      throw error;
    }
  }
}

export class DepositRepository {
  async create(data: Omit<Deposit, 'id' | 'createdAt'>): Promise<Deposit> {
    try {
      const result = await query(
        `INSERT INTO deposits (user_id, currency, amount, address, tx_hash, status, confirmations, required_confirmations, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         RETURNING *`,
        [data.userId, data.currency, data.amount, data.address, data.txHash || null, data.status, data.confirmations, data.requiredConfirmations]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating deposit:', error);
      throw error;
    }
  }

  async findByTxHash(txHash: string): Promise<Deposit | null> {
    try {
      const result = await query('SELECT * FROM deposits WHERE tx_hash = $1', [txHash]);
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding deposit:', error);
      throw error;
    }
  }

  async updateConfirmations(id: string, confirmations: number): Promise<Deposit | null> {
    try {
      const status = confirmations >= 6 ? 'confirmed' : 'pending';
      const result = await query(
        `UPDATE deposits SET confirmations = $1, status = $2, confirmed_at = CASE WHEN $2 = 'confirmed' THEN NOW() ELSE NULL END WHERE id = $3 RETURNING *`,
        [confirmations, status, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating confirmations:', error);
      throw error;
    }
  }
}

export class WithdrawalRepository {
  async create(data: Omit<Withdrawal, 'id' | 'createdAt'>): Promise<Withdrawal> {
    try {
      const result = await query(
        `INSERT INTO withdrawals (user_id, currency, amount, address, tag, status, tx_hash, fee, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         RETURNING *`,
        [data.userId, data.currency, data.amount, data.address, data.tag || null, data.status, data.txHash || null, data.fee || null]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating withdrawal:', error);
      throw error;
    }
  }

  async findByUserId(userId: string, limit: number = 50): Promise<Withdrawal[]> {
    try {
      const result = await query(
        'SELECT * FROM withdrawals WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
        [userId, limit]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error finding withdrawals:', error);
      throw error;
    }
  }

  async updateStatus(id: string, status: string, txHash?: string): Promise<Withdrawal | null> {
    try {
      const result = await query(
        `UPDATE withdrawals SET status = $1, tx_hash = COALESCE($2, tx_hash), processed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE NULL END WHERE id = $3 RETURNING *`,
        [status, txHash || null, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating withdrawal status:', error);
      throw error;
    }
  }
}

export const transactionRepository = new TransactionRepository();
export const depositRepository = new DepositRepository();
export const withdrawalRepository = new WithdrawalRepository();
