import { useState } from 'react';
import type { LoggedUser } from '../services/auth.service';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface LoginPageProps {
  onLoginSuccess: (user: LoggedUser) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <div className="h-screen w-full bg-[#1A1A1A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2D2D2D] border border-[#C8A452]/40 rounded-lg shadow-2xl p-6">
        <div className="mb-6 text-center">
          <h1 className="text-[#F5ECD7] text-2xl" style={{ fontFamily: 'serif' }}>
            AI Học Sử?!
          </h1>
          <p className="text-[#C8A452] text-sm">Đăng nhập để tiếp tục</p>
        </div>

        <div className="flex gap-2 mb-4 bg-slate-900 p-1 rounded-md">
          <button
            className={`flex-1 py-2 rounded text-sm ${
              authMode === 'login' ? 'bg-[#8B1538] text-[#F5ECD7]' : 'text-slate-400'
            }`}
            onClick={() => setAuthMode('login')}
          >
            Đăng nhập
          </button>
          <button
            className={`flex-1 py-2 rounded text-sm ${
              authMode === 'register' ? 'bg-[#8B1538] text-[#F5ECD7]' : 'text-slate-400'
            }`}
            onClick={() => setAuthMode('register')}
          >
            Đăng ký
          </button>
        </div>

        {authMode === 'login' ? (
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    </div>
  );
}
