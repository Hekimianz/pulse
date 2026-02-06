import { useEffect, useState, type ReactNode } from 'react';
import {
  getMe,
  loginUser,
  registerUser,
  type LoginValues,
  type RegisterValues,
} from '../api/auth';
import { AuthContext } from './AuthContext';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const checkAuth = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error has occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (values: LoginValues) => {
    try {
      const response = await loginUser(values);
      localStorage.setItem('token', response.accessToken);
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error has occured');
      }
    }
  };

  const register = async (values: RegisterValues) => {
    try {
      await registerUser(values);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error has occurred');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
