export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  status: 'active' | 'suspended' | 'deleted';
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  kycDocumentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  fullName: string;
}

export interface UpdateUserInput {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}
