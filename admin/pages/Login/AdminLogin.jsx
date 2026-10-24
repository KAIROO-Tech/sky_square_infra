import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminButton } from '../../components/common/AdminButton';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f5f5f7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#111113] border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8">
        {/* Monogram Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 border border-[#d4af37]/60 mx-auto flex items-center justify-center font-serif text-xl text-[#d4af37] bg-white/[0.02]">
            SQ
          </div>
          <div>
            <h1 className="font-serif text-2xl text-white tracking-wide">Sky Square Infra</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
              Administrative Verification
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-[#241212] border border-[#ff6b6b]/40 text-[#ff6b6b] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] block">
              Operator Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-white/30 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#18181b] border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white focus:border-[#d4af37] outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] block">
              Authorization Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/30 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#18181b] border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white focus:border-[#d4af37] outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <AdminButton
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full py-3"
            >
              Verify Credentials
            </AdminButton>
          </div>
        </form>

        <div className="border-t border-white/5 pt-4 text-center">
          <p className="font-mono text-[10px] text-white/40">
            Default credentials: <span className="text-[#d4af37]">admin / admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
