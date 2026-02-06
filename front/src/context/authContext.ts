import { createContext } from 'react';

import type { LoginValues, RegisterValues } from '../api/auth';
import type { User } from './AuthProvider';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (values: LoginValues) => Promise<void>;
  register: (values: RegisterValues) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
