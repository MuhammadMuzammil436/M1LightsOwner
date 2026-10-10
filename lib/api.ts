
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'rideglow_auth_token';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function getAuthToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  authenticated?: boolean;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      'API URL is not configured. Set EXPO_PUBLIC_API_URL in your .env file.',
    );
  }

  const {
    method = 'GET',
    body,
    authenticated = true,
    headers = {},
  } = options;

  const token = authenticated ? await getAuthToken() : null;

  const response = await fetch(
    `${API_BASE_URL}/${path.replace(/^\/+/, '')}`,
    {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    },
  );

  const responseText = await response.text();
  let data: unknown = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : `API request failed (${response.status})`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}
