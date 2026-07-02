import { userRepository } from '../repositories/userRepository';
import { walletRepository } from '../repositories/walletRepository';
import { PasswordService } from './passwordService';
import { generateToken, generateRefreshToken } from '../middleware/auth';
import logger from '../utils/logger';
import { CreateUserInput } from '../types/user';

export class AuthService {
  async register(data: CreateUserInput): Promise<{ token: string; refreshToken: string; user: any }> {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const passwordHash = await PasswordService.hashPassword(data.password);

      // Create user
      const user = await userRepository.create({
        ...data,
        passwordHash
      });

      // Create default wallets
      await walletRepository.createOrUpdate(user.id, 'USD');
      await walletRepository.createOrUpdate(user.id, 'BTC');
      await walletRepository.createOrUpdate(user.id, 'ETH');

      // Generate tokens
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      logger.info(`User registered: ${user.email}`);

      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName
        }
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ token: string; refreshToken: string; user: any }> {
    try {
      // Find user
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check if account is active
      if (user.status !== 'active') {
        throw new Error('Account is not active');
      }

      // Compare passwords
      const isPasswordValid = await PasswordService.comparePassword(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await userRepository.updateLastLogin(user.id);

      // Generate tokens
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      logger.info(`User logged in: ${user.email}`);

      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName
        }
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
