'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import QuickViewModal, { QuickViewProduct } from '@/components/QuickViewModal';
import { 
  Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, 
  ChevronRight, Plus, Minus, CheckCircle, Info, Sparkles, Share2, Flame 
} from 'lucide-react';

interface FullProduct extends QuickViewProduct {
  stock: number;
  reviewsList: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

interface Props {
  product: FullProduct;
  relatedProducts: QuickViewProduct[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const images = product.images.length > 0 
    ? product.images.map(img => img.url) 
    : ['https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800'];
    
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'howToUse' | 'specs' | 'reviews'>('overview');
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<QuickViewProduct | null>(null);
  
  // New Review Form State
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviewsList);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: selectedImage,
      quantityUnit: product.quantityUnit,
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      userName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      createdAt: 'Just now',
    };

    setReviewsList([newEntry, ...reviewsList]);
    setNewReviewName('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#3A2A20]/70 mb-6">
          <Link href="/" className="hover:text-[#D97706] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#3A2A20]/40" />
          <Link href="/shop" className="hover:text-[#D97706] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#3A2A20]/40" />
          <span className="font-semibold text-[#4A0E17] line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#F5EFE4] p-6 sm:p-8 rounded-3xl border border-[#E4D9C5] shadow-card mb-12">
          
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Active Image Frame */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-stone-100 overflow-hidden border border-[#E4D9C5]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#4A0E17] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#D97706] shadow-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails Bar */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors ${
                      selectedImage === img ? 'border-[#D97706] ring-2 ring-[#D97706]/20' : 'border-[#E4D9C5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Stock Tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#D97706] uppercase tracking-wider">
                  {product.category?.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3" /> In Stock ({product.stock} available)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] leading-tight">
                {product.name}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center text-[#D97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                  <span className="font-bold ml-1.5 text-[#4A0E17]">{product.rating}</span>
                </div>
                <span className="text-[#3A2A20]/40">|</span>
                <span className="text-[#3A2A20]/70 font-medium">
                  {reviewsList.length} Devotee Reviews
                </span>
              </div>

              {/* Price & Quantity Sizing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-bold text-[#4A0E17]">₹{product.price}</span>
                {product.mrp > product.price && (
                  <span className="text-base text-[#3A2A20]/50 line-through">₹{product.mrp}</span>
                )}
                <span className="text-xs text-[#D97706] font-semibold">
                  (Includes all taxes / {product.quantityUnit})
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#3A2A20]/80 leading-relaxed border-t border-[#E4D9C5] pt-3">
                {product.shortDesc}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-serif font-bold text-[#4A0E17]">Quantity:</span>
                <div className="flex items-center rounded-xl border border-[#E4D9C5] bg-[#FAF6EE]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#4A0E17] hover:text-[#D97706] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#4A0E17]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#4A0E17] hover:text-[#D97706] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E4D9C5]">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#4A0E17] hover:bg-[#380B12] text-white text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  ⚡ Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    mrp: product.mrp,
                    image: selectedImage,
                    quantityUnit: product.quantityUnit,
                  })}
                  className={`p-3.5 rounded-xl border border-[#E4D9C5] transition-colors flex items-center justify-center ${
                    inWish ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#FAF6EE] text-[#4A0E17] hover:bg-[#E4D9C5]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Trust Micro Indicators */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-[#3A2A20]/75 pt-3">
                <div className="flex items-center gap-1.5 p-2 bg-[#FAF6EE] rounded-lg border border-[#E4D9C5]">
                  <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>100% Traditional</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-[#FAF6EE] rounded-lg border border-[#E4D9C5]">
                  <Truck className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Doorstep Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-[#FAF6EE] rounded-lg border border-[#E4D9C5]">
                  <RotateCcw className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Easy Support</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Devotional Information Tabs */}
        <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 sm:p-8 mb-12 shadow-card">
          
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-[#E4D9C5] gap-4 overflow-x-auto mb-6">
            {[
              { id: 'overview', label: '📜 Overview & Description' },
              { id: 'howToUse', label: '🪔 How to Use' },
              { id: 'specs', label: '📊 Product Details & Specs' },
              { id: 'reviews', label: `⭐ Devotee Reviews (${reviewsList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-2 text-xs sm:text-sm font-serif font-bold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#D97706] text-[#4A0E17]'
                    : 'border-transparent text-[#3A2A20]/60 hover:text-[#4A0E17]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3A2A20]/85 leading-relaxed">
              <h3 className="text-base font-serif font-bold text-[#4A0E17]">
                Traditional Significance & Description
              </h3>
              <p>{product.description}</p>
              {product.ingredients && (
                <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] mt-4">
                  <span className="font-serif font-bold text-[#4A0E17] block mb-1">
                    🌿 Key Ingredients / Materials:
                  </span>
                  <p className="text-xs">{product.ingredients}</p>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: How to Use */}
          {activeTab === 'howToUse' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3A2A20]/85 leading-relaxed">
              <h3 className="text-base font-serif font-bold text-[#4A0E17] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D97706]" /> Traditional Usage Instructions
              </h3>
              <p>{product.howToUse || 'Sprinkle or use as required during daily morning or evening Aarti.'}</p>
              <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] text-xs text-[#4A0E17] space-y-1">
                <span className="font-semibold block">✨ Storage Guidelines:</span>
                <p>Keep sealed in a cool, dry place away from direct sunlight and moisture to retain natural fragrance and purity.</p>
              </div>
            </div>
          )}

          {/* Tab Content 3: Specs Table */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#4A0E17]">
                Specification Table
              </h3>
              <div className="overflow-hidden rounded-xl border border-[#E4D9C5] bg-[#FAF6EE]">
                <table className="w-full text-left text-xs text-[#3A2A20]">
                  <tbody>
                    <tr className="border-b border-[#E4D9C5]/50">
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4] w-1/3">Product Name</td>
                      <td className="p-3">{product.name}</td>
                    </tr>
                    <tr className="border-b border-[#E4D9C5]/50">
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4]">Category</td>
                      <td className="p-3">{product.category?.name}</td>
                    </tr>
                    <tr className="border-b border-[#E4D9C5]/50">
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4]">Quantity / Sizing</td>
                      <td className="p-3">{product.quantityUnit}</td>
                    </tr>
                    <tr className="border-b border-[#E4D9C5]/50">
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4]">Ingredients</td>
                      <td className="p-3">{product.ingredients || 'Natural Sourcing'}</td>
                    </tr>
                    <tr className="border-b border-[#E4D9C5]/50">
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4]">Country of Origin</td>
                      <td className="p-3">India 🇮🇳</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#4A0E17] bg-[#F5EFE4]">Delivery & Return</td>
                      <td className="p-3">Dispatched within 24 hours. Easy replacement support for damaged transit items.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 4: Reviews & Form */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#4A0E17]">{rev.userName}</span>
                      <span className="text-[10px] text-[#3A2A20]/50">{rev.createdAt}</span>
                    </div>
                    <div className="flex items-center text-[#D97706]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#3A2A20]/80">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] space-y-4">
                <h4 className="text-sm font-serif font-bold text-[#4A0E17]">
                  Write a Customer Review
                </h4>

                {reviewSubmitted && (
                  <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    Thank you! Your review has been added successfully.
                  </p>
                )}

                <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#4A0E17] mb-1">Your Name</label>
                      <input
                        type="text"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Meena Joshi"
                        required
                        className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#4A0E17] mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                      >
                        <option value={5}>5 Stars - Excellent Quality</option>
                        <option value={4}>4 Stars - Good Product</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#4A0E17] mb-1">Your Review Comment</label>
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience using this samagri..."
                      rows={3}
                      required
                      className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#4A0E17] pb-2 border-b border-[#E4D9C5]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onQuickView={(p) => setSelectedProductForQuickView(p)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Quick View Modal for Related Products */}
      {selectedProductForQuickView && (
        <QuickViewModal
          product={selectedProductForQuickView}
          onClose={() => setSelectedProductForQuickView(null)}
        />
      )}
    </div>
  );
}
