'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Flame } from 'lucide-react';

export default function Header() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EA580C] text-white border-b border-[#C2410C] shadow-md">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-amber-200 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Spiritual Emblem Icon */}
            <div className="w-10 h-10 rounded-full bg-white text-[#EA580C] flex items-center justify-center border border-amber-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl">🪔</span>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight block leading-none">
                Pooja Sanskar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              prefetch={true}
              className="text-sm font-semibold text-white/95 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              prefetch={true}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/category/puja-kits"
              prefetch={true}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Puja Kits
            </Link>
            <Link
              href="/about"
              prefetch={true}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              prefetch={true}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account / Login */}
            <Link
              href="/account"
              prefetch={true}
              className="p-2 text-white hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              prefetch={true}
              className="p-2 text-white hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-[#EA580C] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon & Badge Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-white hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-[#EA580C] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#EA580C] border-t border-[#C2410C] px-6 py-4 space-y-2.5 shadow-lg animate-in slide-in-from-top-2 text-white">
          <Link
            href="/"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-bold text-white py-2.5 border-b border-white/20"
          >
            Home
          </Link>
          <Link
            href="/shop"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-semibold text-white/90 py-2.5 border-b border-white/20"
          >
            Shop All Samagri
          </Link>
          <Link
            href="/category/puja-kits"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-semibold text-white/90 py-2.5 border-b border-white/20"
          >
            Complete Puja Kits
          </Link>
          <Link
            href="/about"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-semibold text-white/90 py-2.5 border-b border-white/20"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-semibold text-white/90 py-2.5 border-b border-white/20"
          >
            Contact Support
          </Link>
          <Link
            href="/account"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-semibold text-white/90 py-2.5 border-b border-white/20"
          >
            👤 My Account
          </Link>
          <Link
            href="/track-order"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif font-bold text-amber-200 py-2.5"
          >
            📦 Track Your Order
          </Link>
        </div>
      )}

    </header>
  );
}
