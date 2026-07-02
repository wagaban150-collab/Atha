import { query } from '../config/database';
import { MarketData } from '../types/market';
import logger from '../utils/logger';

export class MarketRepository {
  async findBySymbol(symbol: string): Promise<MarketData | null> {
    try {
      const result = await query(
        'SELECT * FROM market_data WHERE symbol = $1',
        [symbol]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding market data:', error);
      throw error;
    }
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<MarketData[]> {
    try {
      const result = await query(
        'SELECT * FROM market_data ORDER BY symbol ASC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error finding all market data:', error);
      throw error;
    }
  }

  async updateOrCreate(data: Omit<MarketData, 'id' | 'updatedAt'>): Promise<MarketData> {
    try {
      const result = await query(
        `INSERT INTO market_data (symbol, price, high_24h, low_24h, volume_24h, change_24h, change_percent_24h, market_cap, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         ON CONFLICT (symbol) DO UPDATE SET 
           price = EXCLUDED.price,
           high_24h = EXCLUDED.high_24h,
           low_24h = EXCLUDED.low_24h,
           volume_24h = EXCLUDED.volume_24h,
           change_24h = EXCLUDED.change_24h,
           change_percent_24h = EXCLUDED.change_percent_24h,
           market_cap = EXCLUDED.market_cap,
           updated_at = NOW()
         RETURNING *`,
        [data.symbol, data.price, data.high24h, data.low24h, data.volume24h, data.change24h, data.changePercent24h, data.marketCap || null]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating market data:', error);
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      const result = await query('SELECT COUNT(*) FROM market_data');
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      logger.error('Error counting market data:', error);
      throw error;
    }
  }
}

export const marketRepository = new MarketRepository();
