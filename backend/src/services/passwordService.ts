import bcryptjs from 'bcryptjs';
import logger from '../utils/logger';

const SALT_ROUNDS = 10;

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcryptjs.genSalt(SALT_ROUNDS);
      return await bcryptjs.hash(password, salt);
    } catch (error) {
      logger.error('Error hashing password:', error);
      throw error;
    }
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcryptjs.compare(password, hash);
    } catch (error) {
      logger.error('Error comparing password:', error);
      throw error;
    }
  }
}

export default PasswordService;
