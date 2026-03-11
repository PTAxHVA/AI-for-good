import { FormEvent, useState } from 'react';
import { registerUser } from '../services/auth.service';
import { Button } from '@/shared/ui/button';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await registerUser({ name, username, password });
      setMessage('Đăng ký thành công. Vui lòng đăng nhập.');
      setName('');
      setUsername('');
      setPassword('');
      onSwitchToLogin();
    } catch (err) {
      console.error('Register error:', err);
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
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
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
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
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <p className="text-slate-400 text-sm">
        Đã có tài khoản?{' '}
        <button
          type="button"
          className="text-[#C8A452] hover:underline"
          onClick={onSwitchToLogin}
        >
          Đăng nhập
        </button>
      </p>

      <Button
        type="submit"
        disabled={loading || !username || !password}
        className="w-full bg-[#8B1538] hover:bg-[#A41E3F] text-[#F5ECD7]"
      >
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>
    </form>
  );
}
