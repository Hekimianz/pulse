import type { User } from '../context/AuthProvider';

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confPassword: string;
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export async function loginUser(values: LoginValues): Promise<LoginResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: LoginResponse = await res.json();
  return data;
}

export async function registerUser(
  values: RegisterValues,
): Promise<RegisterResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    }),
  });
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: RegisterResponse = await res.json();
  return data;
}

export async function getMe(): Promise<User> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: User = await res.json();
  return data;
}
