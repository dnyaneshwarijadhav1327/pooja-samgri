'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Set logged in user in localStorage
      localStorage.setItem('pavitra_user', JSON.stringify({
        name: email.split('@')[0] || 'Customer',
        email: email || 'customer@example.com',
        phone: '+91 9876543210',
        role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER'
      }));
      setLoading(false);
      router.push('/account');
    }, 600);
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  };

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center text-2xl mx-auto shadow-md border border-[#D97706]">
            🪔
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            Sign in to access your orders, saved addresses, and sacred wishlist.
          </p>
        </div>

        {forgotSent && (
          <div className="p-3 bg-green-50 text-green-700 text-xs font-semibold rounded-xl border border-green-200 text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            Password reset link has been sent to {email}!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A0E17] mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. yourname@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <Mail className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#4A0E17]">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-[#D97706] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <Lock className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#3A2A20]/60 hover:text-[#4A0E17]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center text-xs text-[#3A2A20]/70 pt-2 border-t border-[#E4D9C5]">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="font-bold text-[#D97706] hover:underline">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}
