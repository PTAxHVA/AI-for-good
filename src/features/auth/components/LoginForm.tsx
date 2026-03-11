import { FormEvent, useState } from 'react';
import type { LoggedUser } from '../services/auth.service';
import { loginUser } from '../services/auth.service';
import { Button } from '@/shared/ui/button';

interface LoginFormProps {
  onLoginSuccess: (user: LoggedUser) => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await loginUser({ username, password });
      onLoginSuccess(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#C8A452]"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#C8A452]"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <p className="text-slate-400 text-sm">
        Bạn chưa có tài khoản?{' '}
        <button
          type="button"
          className="text-[#C8A452] hover:underline"
          onClick={onSwitchToRegister}
        >
          Đăng ký
        </button>
      </p>

      <Button
        type="submit"
        disabled={loading || !username || !password}
        className="w-full bg-[#8B1538] hover:bg-[#A41E3F] text-[#F5ECD7]"
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </form>
  );
}
