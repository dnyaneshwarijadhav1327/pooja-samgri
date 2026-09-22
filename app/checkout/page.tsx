'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Truck, CreditCard, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useShop();

  const [customerName, setCustomerName] = useState('Ramesh Sharma');
  const [phone, setPhone] = useState('9123456789');
  const [email, setEmail] = useState('ramesh@example.com');
  const [street, setStreet] = useState('Flat 402, Shiv Shanti Apts, FC Road');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('411005');

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const shippingFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMessage('Your cart is empty');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          street,
          city,
          state,
          pincode,
          paymentMethod,
          items: cart,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        setErrorMessage(data.error || 'Failed to complete checkout');
      }
    } catch (err) {
      setErrorMessage('Network error while creating order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF6EE] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-8 shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#E4D9C5] flex items-center justify-center text-2xl mx-auto text-[#D97706]">
            🪔
          </div>
          <h2 className="text-xl font-serif font-bold text-[#4A0E17]">
            Your cart is empty
          </h2>
          <p className="text-xs text-[#3A2A20]/70">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D97706] text-white text-xs font-bold"
          >
            Explore Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            Secure Doorstep Checkout
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#4A0E17]">
            Complete Your Order
          </h1>
        </div>

        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Shipping Address & Payment Selection */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Address Form Card */}
            <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#4A0E17] pb-3 border-b border-[#E4D9C5] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#D97706]" /> 1. Shipping Address Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A0E17] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A0E17] mb-1">Flat, House No, Building, Street</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">State & Pincode</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      placeholder="State"
                      className="w-1/2 p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                    />
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      placeholder="Pincode"
                      className="w-1/2 p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#4A0E17] pb-3 border-b border-[#E4D9C5] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D97706]" /> 2. Payment Options
              </h2>

              <div className="space-y-3">
                {/* Option A: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'COD'
                      ? 'border-[#D97706] bg-[#FAF6EE]'
                      : 'border-[#E4D9C5] bg-[#F5EFE4] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-[#D97706]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#4A0E17] block">💵 Cash on Delivery (COD)</span>
                    <span className="text-xs text-[#3A2A20]/70">Pay cash directly to the courier agent upon arrival.</span>
                  </div>
                </label>

                {/* Option B: Online Payment */}
                <label
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'ONLINE'
                      ? 'border-[#D97706] bg-[#FAF6EE]'
                      : 'border-[#E4D9C5] bg-[#F5EFE4] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'ONLINE'}
                    onChange={() => setPaymentMethod('ONLINE')}
                    className="accent-[#D97706]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#4A0E17] flex items-center gap-2">
                      💳 Online Payment (UPI / GPay / PhonePe / Cards)
                      <span className="bg-[#D97706]/10 text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Instant Confirmation
                      </span>
                    </span>
                    <span className="text-xs text-[#3A2A20]/70">
                      Supports Google Pay, PhonePe, Paytm, BHIM UPI, NetBanking & Cards.
                    </span>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary & Complete Button */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4 sticky top-24">
              <h3 className="text-base font-serif font-bold text-[#4A0E17] pb-3 border-b border-[#E4D9C5]">
                Order Items ({cart.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-[#E4D9C5]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate text-[#3A2A20] font-medium">
                        {item.quantity}x {item.name}
                      </span>
                    </div>
                    <span className="font-bold text-[#4A0E17] shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#E4D9C5] space-y-2 text-xs text-[#3A2A20]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#4A0E17]">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-emerald-700">FREE</span>
                  ) : (
                    <span className="font-bold text-[#4A0E17]">₹{shippingFee}</span>
                  )}
                </div>
                <div className="pt-2 border-t border-[#E4D9C5] flex justify-between items-baseline text-base font-bold text-[#4A0E17]">
                  <span>Total Payable</span>
                  <span className="text-xl text-[#D97706]">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Creating Order...' : <>Complete Order 🪔 <ArrowRight className="w-4 h-4" /></>}
              </button>

              <div className="text-[10px] text-center text-[#3A2A20]/60 space-y-1">
                <p>🔒 256-Bit SSL Encrypted Checkout</p>
                <p>Carefully Packed & Delivered with Sanctity</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
