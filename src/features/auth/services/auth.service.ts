/**
 * Tầng gọi API auth của frontend.
 * Tách riêng service giúp component form tập trung vào UI/state và không chứa chi tiết request HTTP.
 */
import type { LoggedUser, LoginCredentials, RegisterPayload } from '../types/auth.types';

export type { LoggedUser, LoginCredentials, RegisterPayload };

const parseError = async (response: Response, fallback: string) => {
  // Ưu tiên message từ backend để hiển thị đúng nguyên nhân cho người dùng.
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
  // fetch sẽ ném TypeError khi backend không reachable (không phải lỗi business).
  if (error instanceof TypeError) {
    return 'Không kết nối được backend auth. Hãy chạy backend tại http://localhost:3001.';
  }
  return null;
};

export const loginUser = async (credentials: LoginCredentials): Promise<LoggedUser> => {
  try {
    // Contract login giữ nguyên: POST /api/login với username/password.
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Mapping fallback theo status để đảm bảo luôn có thông báo thân thiện.
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
    // Contract register giữ nguyên: POST /api/users.
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
