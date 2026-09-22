import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="text-center space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            We Are Here to Assist
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#4A0E17]">
            Contact Customer Support
          </h1>
          <p className="text-xs text-[#3A2A20]/70 max-w-md mx-auto">
            Have questions regarding your order, bulk festival bookings, or product ingredients? Get in touch with our team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Phone className="w-6 h-6 text-[#D97706] mx-auto" />
            <h3 className="font-bold text-[#4A0E17] text-sm">Phone Support</h3>
            <p className="text-[#3A2A20]">Mon - Sat: 9:00 AM - 7:00 PM</p>
            <a href="tel:+919876543210" className="font-bold text-[#D97706] text-sm hover:underline block">
              +91 98765 43210
            </a>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Mail className="w-6 h-6 text-[#D97706] mx-auto" />
            <h3 className="font-bold text-[#4A0E17] text-sm">Email Assistance</h3>
            <p className="text-[#3A2A20]">Guaranteed response within 24 hours</p>
            <a href="mailto:support@pavitrapooja.com" className="font-bold text-[#D97706] text-sm hover:underline block">
              support@pavitrapooja.com
            </a>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <MessageCircle className="w-6 h-6 text-[#25D366] mx-auto" />
            <h3 className="font-bold text-[#4A0E17] text-sm">WhatsApp Help</h3>
            <p className="text-[#3A2A20]">Instant messaging chat support</p>
            <a
              href="https://wa.me/919876543210?text=Hello,%20I%20need%20help%20regarding%20pooja%20products."
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-700 text-sm hover:underline block"
            >
              Start WhatsApp Chat ➔
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
