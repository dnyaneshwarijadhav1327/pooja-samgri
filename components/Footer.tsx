'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Truck, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#380B12] text-[#FAF6EE] pt-16 pb-8 border-t-4 border-[#D97706]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF6EE]/15">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] text-[#4A0E17] flex items-center justify-center font-bold text-xl">
                🪔
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#FAF6EE] tracking-tight">
                  Pooja Sanskar
                </h3>
                <p className="text-[10px] text-[#D97706] tracking-wider uppercase font-medium">
                  Pure Samagri. Sacred Traditions.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">
              Crafted with devotion and deep respect for Indian spiritual traditions. We source purified, natural pooja samagri directly for your daily worship and holy rituals.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#FAF6EE]/10 flex items-center justify-center text-[#FAF6EE] hover:bg-[#D97706] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#FAF6EE]/10 flex items-center justify-center text-[#FAF6EE] hover:bg-[#D97706] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#FAF6EE]/10 flex items-center justify-center text-[#FAF6EE] hover:bg-[#D97706] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D97706] uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6EE]/80">
              <li>
                <Link href="/shop" className="hover:text-[#D97706] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/puja-essentials" className="hover:text-[#D97706] transition-colors">
                  Pooja Essentials
                </Link>
              </li>
              <li>
                <Link href="/category/dhoop-incense" className="hover:text-[#D97706] transition-colors">
                  Dhoop & Incense
                </Link>
              </li>
              <li>
                <Link href="/category/havan-samagri" className="hover:text-[#D97706] transition-colors">
                  Havan Samagri
                </Link>
              </li>
              <li>
                <Link href="/category/gomaya-products" className="hover:text-[#D97706] transition-colors">
                  Gomaya Products
                </Link>
              </li>
              <li>
                <Link href="/category/puja-kits" className="hover:text-[#D97706] transition-colors">
                  Complete Puja Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D97706] uppercase tracking-wider mb-4">
              Information & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6EE]/80">
              <li>
                <Link href="/about" className="hover:text-[#D97706] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D97706] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#D97706] transition-colors">
                  Frequently Asked Questions (FAQs)
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#D97706] transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#D97706] transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#D97706] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D97706] uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <div className="space-y-3 text-xs text-[#FAF6EE]/85">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#FAF6EE]/50 uppercase">Helpline</span>
                  <a href="tel:+919876543210" className="font-semibold hover:text-[#D97706]">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#FAF6EE]/50 uppercase">Email Support</span>
                  <a href="mailto:support@pavitrapooja.com" className="font-semibold hover:text-[#D97706]">
                    support@pavitrapooja.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#FAF6EE]/50 uppercase">Order Lookup</span>
                  <Link href="/track-order" className="font-semibold text-[#D97706] hover:underline">
                    Track Your Order
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EE]/60 gap-4">
          <p>© 2026 Pooja Sanskar. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>🪔</span> Made with Devotion & Respect for Sacred Traditions
          </p>
        </div>

      </div>
    </footer>
  );
}
