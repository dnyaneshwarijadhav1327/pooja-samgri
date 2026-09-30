'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import QuickViewModal, { QuickViewProduct } from '@/components/QuickViewModal';
import { Filter, SlidersHorizontal, ChevronRight, RotateCcw, Search } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  initialProducts: QuickViewProduct[];
  categories: CategoryItem[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ShopClient({ initialProducts, categories, initialCategory = '', initialSearch = '' }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category Filter
        if (selectedCategory) {
          const matchedCategory = categories.find(c => c.slug === selectedCategory || c.id === selectedCategory);
          const productCatName = product.category?.name?.toLowerCase().trim();
          const productCatSlug = (product as any).category?.slug;
          const productCatId = (product as any).categoryId;

          const isMatch =
            (matchedCategory && (
              productCatId === matchedCategory.id ||
              productCatSlug === matchedCategory.slug ||
              productCatName === matchedCategory.name.toLowerCase().trim()
            )) ||
            (productCatSlug && productCatSlug === selectedCategory) ||
            (productCatName && productCatName === selectedCategory.toLowerCase().trim());

          if (!isMatch) return false;
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesDesc = product.shortDesc.toLowerCase().includes(q);
          const matchesCat = product.category?.name.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCat) return false;
        }

        // Price Range Filter
        if (selectedPriceRange === 'under-200' && product.price >= 200) return false;
        if (selectedPriceRange === '200-500' && (product.price < 200 || product.price > 500)) return false;
        if (selectedPriceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
        if (selectedPriceRange === 'above-1000' && product.price <= 1000) return false;

        // Rating Filter
        if (selectedRating > 0 && product.rating < selectedRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default / Recommended
      });
  }, [initialProducts, selectedCategory, searchQuery, selectedPriceRange, selectedRating, sortBy, categories]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedPriceRange('all');
    setSelectedRating(0);
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-8 text-black font-['Times_New_Roman',_Times,_serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-black/80 mb-6 font-['Times_New_Roman',_Times,_serif]">
          <Link href="/" className="hover:text-black hover:underline transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black/60" />
          <span className="font-bold text-black">Shop Sacred Samagri</span>
          {selectedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-black/60" />
              <span className="capitalize text-black font-bold">{selectedCategory.replace('-', ' ')}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E4D9C5]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black font-['Times_New_Roman',_Times,_serif]">
              Sacred Pooja Samagri Store
            </h1>
            <p className="text-xs text-black/80 mt-1 font-['Times_New_Roman',_Times,_serif]">
              Showing <strong className="text-black font-bold">{filteredProducts.length}</strong> authentic products
            </p>
          </div>

          {/* Controls Bar: Search, Mobile Filter Toggle, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Bar Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F5EFE4] border border-[#E4D9C5] text-black placeholder-black/50 focus:outline-none focus:border-black font-['Times_New_Roman',_Times,_serif]"
              />
              <Search className="w-4 h-4 text-black absolute left-3 top-2.5" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-[#F5EFE4] text-black border border-[#E4D9C5] text-xs font-semibold flex items-center gap-1.5 font-['Times_New_Roman',_Times,_serif]"
            >
              <Filter className="w-4 h-4 text-black" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-black hidden sm:inline font-['Times_New_Roman',_Times,_serif]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F5EFE4] border border-[#E4D9C5] text-black text-xs font-semibold focus:outline-none focus:border-black font-['Times_New_Roman',_Times,_serif]"
              >
                <option value="recommended">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-['Times_New_Roman',_Times,_serif]">
          
          {/* Left Sidebar Filters */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-[#F5EFE4] p-5 rounded-2xl border border-[#E4D9C5] h-fit sticky top-24`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C5]">
              <h3 className="text-sm font-bold text-black flex items-center gap-2 font-['Times_New_Roman',_Times,_serif]">
                <SlidersHorizontal className="w-4 h-4 text-black" /> Filter Products
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-black hover:underline font-semibold flex items-center gap-1 font-['Times_New_Roman',_Times,_serif]"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black uppercase tracking-wider block font-['Times_New_Roman',_Times,_serif]">
                Categories
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-['Times_New_Roman',_Times,_serif] ${
                    selectedCategory === '' ? 'bg-black text-white font-bold' : 'text-black hover:bg-[#FAF6EE] font-medium'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-['Times_New_Roman',_Times,_serif] ${
                      selectedCategory === cat.slug ? 'bg-black text-white font-bold' : 'text-black hover:bg-[#FAF6EE] font-medium'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 pt-3 border-t border-[#E4D9C5]">
              <label className="text-xs font-bold text-black uppercase tracking-wider block font-['Times_New_Roman',_Times,_serif]">
                Price Range
              </label>
              <div className="space-y-1.5 text-xs text-black font-['Times_New_Roman',_Times,_serif]">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-200', label: 'Under ₹200' },
                  { id: '200-500', label: '₹200 - ₹500' },
                  { id: '500-1000', label: '₹500 - ₹1,000' },
                  { id: 'above-1000', label: 'Above ₹1,000' },
                ].map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer text-black">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                      className="accent-black"
                    />
                    <span className="text-black font-medium">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 pt-3 border-t border-[#E4D9C5]">
              <label className="text-xs font-bold text-black uppercase tracking-wider block font-['Times_New_Roman',_Times,_serif]">
                Minimum Rating
              </label>
              <div className="space-y-1.5 text-xs text-black font-['Times_New_Roman',_Times,_serif]">
                {[0, 4.8, 4.5, 4.0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer text-black">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="accent-black"
                    />
                    <span className="text-black font-medium">{rating === 0 ? 'All Ratings' : `${rating}★ & above`}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] space-y-3 font-['Times_New_Roman',_Times,_serif]">
                <span className="text-3xl">🪔</span>
                <h3 className="text-base font-bold text-black">
                  No products match your selected filters
                </h3>
                <p className="text-xs text-black/80 max-w-sm mx-auto">
                  Try resetting your category or price range selection to explore our full sacred collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-black/80 transition-colors font-['Times_New_Roman',_Times,_serif]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
