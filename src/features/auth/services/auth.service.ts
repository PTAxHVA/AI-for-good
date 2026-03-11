export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  name: string;
  password: string;
}

export interface LoggedUser {
  token: string;
  username: string;
  name: string;
}

const parseError = async (response: Response, fallback: string) => {
  try {
    const data = await response.json();
    return data.error || fallback;
  } catch {
    if (response.status === 404) {
      return 'Không tìm thấy endpoint auth. Kiểm tra backend đang chạy đúng cổng 3001 và Vite proxy /api.';
    }
    return fallback;
  }
};

const getNetworkErrorMessage = (error: unknown) => {
  if (error instanceof TypeError) {
    return 'Không kết nối được backend auth. Hãy chạy backend tại http://localhost:3001.';
  }
  return null;
};

export const loginUser = async (credentials: LoginCredentials): Promise<LoggedUser> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const fallback = response.status === 401
        ? 'Sai username hoặc password.'
        : response.status >= 500
          ? 'Lỗi server backend khi đăng nhập.'
          : 'Đăng nhập thất bại.';
      throw new Error(await parseError(response, fallback));
    }

    return response.json();
  } catch (error) {
    const networkError = getNetworkErrorMessage(error);
    if (networkError) {
      throw new Error(networkError);
    }
    throw error instanceof Error ? error : new Error('Đăng nhập thất bại');
  }
};

export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const fallback = response.status >= 500
        ? 'Lỗi server backend khi đăng ký.'
        : 'Đăng ký thất bại.';
      throw new Error(await parseError(response, fallback));
    }
  } catch (error) {
    const networkError = getNetworkErrorMessage(error);
    if (networkError) {
      throw new Error(networkError);
    }
    throw error instanceof Error ? error : new Error('Đăng ký thất bại');
  }
};
