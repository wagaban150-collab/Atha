import { query } from '../config/database';
import { User, CreateUserInput, UpdateUserInput } from '../types/user';
import logger from '../utils/logger';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const result = await query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding user by ID:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding user by email:', error);
      throw error;
    }
  }

  async create(data: CreateUserInput & { passwordHash: string }): Promise<User> {
    try {
      const result = await query(
        `INSERT INTO users (email, password_hash, full_name, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING *`,
        [data.email, data.passwordHash, data.fullName, 'active']
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateUserInput): Promise<User | null> {
    try {
      const setClause: string[] = [];
      const values: any[] = [id];
      let paramCount = 2;

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          setClause.push(`${dbKey} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      });

      setClause.push(`updated_at = NOW()`);

      const result = await query(
        `UPDATE users SET ${setClause.join(', ')} WHERE id = $1 RETURNING *`,
        values
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  async updateLastLogin(id: string): Promise<void> {
    try {
      await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [id]);
    } catch (error) {
      logger.error('Error updating last login:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await query('UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2', ['deleted', id]);
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
