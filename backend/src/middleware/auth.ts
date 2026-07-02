import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
    if (err) {
      logger.warn('Token verification failed:', err.message);
      return res.status(403).json({ error: 'Forbidden', message: 'Invalid or expired token' });
    }
    req.userId = user.id;
    req.user = user;
    next();
  });
};

export const generateToken = (userId: string, expiresIn: string = '7d'): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};
