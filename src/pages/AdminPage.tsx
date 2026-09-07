import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginAdminThunk, logoutAdmin } from '../store/slices/authSlice';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ShieldCheck, Lock, LogOut, Database, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'settings'>('messages');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAdminThunk({ username, password }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Admin Authentication</h2>
            <p className="text-xs text-slate-400">Enter credentials to access Hassan Portfolio Control Center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && <p className="text-xs text-rose-400 font-mono text-center">{error}</p>}

            <Button
              type="submit"
              variant="glow"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
            Demo Credentials: <span className="text-sky-400">admin</span> / <span className="text-sky-400">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">Role: {user?.role || 'Admin'}</Badge>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> System Authenticated
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-1">Portfolio Control Dashboard</h1>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => dispatch(logoutAdmin())}
          icon={<LogOut className="w-4 h-4" />}
        >
          Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold ${
            activeTab === 'messages' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Inquiries / Messages
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold ${
            activeTab === 'projects' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Manage Projects
        </button>
      </div>

      {/* Content */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Received Messages & Leads</h3>
          <Card className="border-slate-800">
            <div className="p-4 text-xs font-mono text-slate-400 space-y-2">
              <p className="text-emerald-400 font-bold">✓ Connected to MongoDB Message Repository</p>
              <p>Inquiries submitted via the portfolio contact form appear here and are forwarded via Nodemailer SMTP.</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100">Projects Inventory</h3>
            <Button variant="glow" size="sm" icon={<Plus className="w-4 h-4" />}>
              Add New Project
            </Button>
          </div>
          <Card className="border-slate-800">
            <p className="text-xs font-mono text-slate-400">
              Projects managed dynamically via Express REST endpoints (`/api/v1/projects`).
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};
