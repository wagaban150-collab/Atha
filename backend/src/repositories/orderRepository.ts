import { query } from '../config/database';
import { Order, CreateOrderInput } from '../types/order';
import logger from '../utils/logger';

export class OrderRepository {
  async findById(id: string): Promise<Order | null> {
    try {
      const result = await query('SELECT * FROM orders WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding order by ID:', error);
      throw error;
    }
  }

  async findByUserIdAndStatus(userId: string, status?: string): Promise<Order[]> {
    try {
      let sql = 'SELECT * FROM orders WHERE user_id = $1';
      const params: any[] = [userId];

      if (status) {
        sql += ' AND status = $2';
        params.push(status);
      }

      sql += ' ORDER BY created_at DESC';

      const result = await query(sql, params);
      return result.rows;
    } catch (error) {
      logger.error('Error finding orders by user:', error);
      throw error;
    }
  }

  async create(userId: string, data: CreateOrderInput): Promise<Order> {
    try {
      const result = await query(
        `INSERT INTO orders (user_id, symbol, type, side, quantity, price, stop_price, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING *`,
        [userId, data.symbol, data.type, data.side, data.quantity, data.price || null, data.stopPrice || null, 'pending']
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating order:', error);
      throw error;
    }
  }

  async updateStatus(id: string, status: string, filledQuantity?: number, averagePrice?: number): Promise<Order | null> {
    try {
      const result = await query(
        `UPDATE orders 
         SET status = $1, 
             filled_quantity = COALESCE($2, filled_quantity),
             average_price = COALESCE($3, average_price),
             updated_at = NOW(),
             completed_at = CASE WHEN $1 IN ('filled', 'cancelled') THEN NOW() ELSE NULL END
         WHERE id = $4
         RETURNING *`,
        [status, filledQuantity || null, averagePrice || null, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating order status:', error);
      throw error;
    }
  }

  async cancel(id: string): Promise<Order | null> {
    try {
      return await this.updateStatus(id, 'cancelled');
    } catch (error) {
      logger.error('Error cancelling order:', error);
      throw error;
    }
  }
}

export const orderRepository = new OrderRepository();
