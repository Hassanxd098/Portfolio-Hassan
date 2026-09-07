import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 text-center">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 font-mono">404</h1>
        <h2 className="text-xl font-semibold text-slate-300">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested URL path does not exist on Hassan's developer portfolio server.
        </p>

        <Link to="/" className="inline-block w-full">
          <Button variant="glow" size="lg" className="w-full" icon={<Home className="w-4 h-4" />}>
            Return to Portfolio Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
