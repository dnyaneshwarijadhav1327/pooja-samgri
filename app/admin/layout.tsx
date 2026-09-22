'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, Folders, ShoppingCart, 
  Star, Tag, ArrowLeft, ShieldCheck, Menu, X, Lock, KeyRound, Mail
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Strict Admin Session Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Login Form Input States
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    try {
      const activeAdminSession = sessionStorage.getItem('pavitra_admin_authenticated');
      if (activeAdminSession === 'true') {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (e) {
      setIsAdminAuthenticated(false);
    } finally {
      setCheckingSession(false);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');

    setTimeout(() => {
      // Validate Admin Credentials
      if (
        (adminEmail.trim().toLowerCase() === 'admin@pavitrapooja.com' || adminEmail.trim().toLowerCase() === 'admin') &&
        adminPassword === 'adminpassword123'
      ) {
        sessionStorage.setItem('pavitra_admin_authenticated', 'true');
        setIsAdminAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Invalid Admin Email or Password. Please try again.');
      }
      setLoginLoading(false);
    }, 600);
  };

  const handleAdminLock = () => {
    sessionStorage.removeItem('pavitra_admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center p-4 text-[#D97706] text-xs font-semibold animate-pulse">
        Initializing Security Shield...
      </div>
    );
  }

  // 🔒 SECURITY GATE: If not authenticated, render strict Admin Login Form
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#F5EFE4] rounded-3xl border-2 border-[#E4D9C5] p-8 shadow-2xl space-y-6">
          
          {/* Security Shield Icon Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center text-2xl mx-auto border-2 border-[#D97706] shadow-lg">
              🛡️
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
              Pavitra Admin Authentication
            </h1>
            <p className="text-xs text-[#3A2A20]/75">
              Enter your secret admin email and password to access store management.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 text-center">
              {authError}
            </div>
          )}

          {/* Admin Authentication Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Admin Email</label>
              <div className="relative">
                <input
                  type="text"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@pavitrapooja.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706] font-medium"
                />
                <Mail className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Admin Security Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                />
                <KeyRound className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {loginLoading ? 'Authenticating...' : 'Unlock Admin Panel 🔓'}
            </button>
          </form>

          {/* Helper Credentials Hint */}
          <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] text-[11px] text-[#4A0E17] space-y-1 text-center">
            <span className="font-bold block">💡 Admin Credentials:</span>
            <p>Email: <code className="bg-[#E4D9C5] px-1.5 py-0.5 rounded font-mono font-bold">admin@pavitrapooja.com</code></p>
            <p>Password: <code className="bg-[#E4D9C5] px-1.5 py-0.5 rounded font-mono font-bold">adminpassword123</code></p>
          </div>

          <div className="text-center text-xs">
            <Link href="/" className="text-[#3A2A20]/70 hover:text-[#4A0E17] underline">
              ← Return to Customer Store
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 🔓 AUTHENTICATED ADMIN LAYOUT
  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Products', href: '/admin/products', icon: Package },
    { name: 'Manage Categories', href: '/admin/categories', icon: Folders },
    { name: 'Customer Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Reviews Moderation', href: '/admin/reviews', icon: Star },
    { name: 'Discount Coupons', href: '/admin/coupons', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#4A0E17] text-[#FAF6EE] p-4 flex items-center justify-between border-b border-[#D97706]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D97706]" />
          <span className="font-serif font-bold text-sm">Pavitra Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 text-[#FAF6EE]"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`w-full md:w-64 bg-[#380B12] text-[#FAF6EE] border-r-4 border-[#D97706] p-6 space-y-6 shrink-0 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
        
        <div className="space-y-1 pb-4 border-b border-[#FAF6EE]/15">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <h2 className="text-lg font-serif font-bold text-[#FAF6EE]">
              Pavitra Admin
            </h2>
          </div>
          <span className="text-[10px] text-[#D97706] uppercase tracking-wider font-semibold block">
            Store Management Panel
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#D97706] text-white font-bold shadow-sm'
                    : 'text-[#FAF6EE]/80 hover:bg-[#FAF6EE]/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-[#FAF6EE]/15 space-y-3">
          <button
            onClick={handleAdminLock}
            className="w-full py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-semibold flex items-center justify-center gap-2 border border-red-800/40 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" /> Lock Admin Panel
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#D97706] hover:underline justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Customer Store
          </Link>
        </div>

      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
