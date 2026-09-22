'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('pavitra_user', JSON.stringify({
        name,
        email,
        phone,
        role: 'CUSTOMER'
      }));
      setLoading(false);
      router.push('/account');
    }, 800);
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
            Create Account
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            Join Pavitra Pooja for doorstep delivery of pure spiritual samagri.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A0E17] mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Sharma"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <User className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#4A0E17] mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <Mail className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#4A0E17] mb-1">Mobile Number</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9123456789"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <Phone className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#4A0E17] mb-1">Create Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <Lock className="w-4 h-4 text-[#D97706] absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : <>Register Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center text-xs text-[#3A2A20]/70 pt-2 border-t border-[#E4D9C5]">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#D97706] hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
