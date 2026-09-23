'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Flame } from 'lucide-react';

export default function Header() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6EE] border-b border-[#E4D9C5] shadow-xs">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#4A0E17] text-[#FAF6EE] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
        <span>Pure & Authentic Pooja Samagri | Delivered to Your Doorstep</span>
        <Flame className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A0E17] hover:text-[#D97706] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Spiritual Emblem Icon */}
            <div className="w-10 h-10 rounded-full bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center border border-[#D97706] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl">🪔</span>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17] tracking-tight block leading-none">
                Pooja Sanskar
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#D97706] tracking-wider uppercase block mt-0.5">
                Pure Samagri. Sacred Traditions.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-semibold text-[#4A0E17] hover:text-[#D97706] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-semibold text-[#3A2A20] hover:text-[#D97706] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/category/puja-kits"
              className="text-sm font-semibold text-[#3A2A20] hover:text-[#D97706] transition-colors"
            >
              Puja Kits
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-[#3A2A20] hover:text-[#D97706] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#3A2A20] hover:text-[#D97706] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A0E17] hover:text-[#D97706] hover:bg-[#F5EFE4] rounded-full transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account / Login */}
            <Link
              href="/account"
              className="p-2 text-[#4A0E17] hover:text-[#D97706] hover:bg-[#F5EFE4] rounded-full transition-colors hidden sm:block"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 text-[#4A0E17] hover:text-[#D97706] hover:bg-[#F5EFE4] rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D97706] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon & Badge Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#4A0E17] hover:text-[#D97706] hover:bg-[#F5EFE4] rounded-full transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#4A0E17] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FAF6EE]">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5EFE4] border-t border-[#E4D9C5] px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-bold text-[#4A0E17] py-2 border-b border-[#E4D9C5]/50"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-semibold text-[#3A2A20] py-2 border-b border-[#E4D9C5]/50"
          >
            Shop All Samagri
          </Link>
          <Link
            href="/category/puja-kits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-semibold text-[#3A2A20] py-2 border-b border-[#E4D9C5]/50"
          >
            Complete Puja Kits
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-semibold text-[#3A2A20] py-2 border-b border-[#E4D9C5]/50"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-semibold text-[#3A2A20] py-2 border-b border-[#E4D9C5]/50"
          >
            Contact Support
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif font-semibold text-[#D97706] py-2"
          >
            📦 Track Your Order
          </Link>
        </div>
      )}

    </header>
  );
}
