'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Search, Check, RefreshCw, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
}

interface ProductItem {
  id: string;
  name: string;
  shortDesc?: string;
  price: number;
  mrp: number;
  stock: number;
  quantityUnit: string;
  categoryId?: string;
  category: { id?: string; name: string };
  images: { url: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states: 'ADD' | 'EDIT' | null
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Image Upload Input Mode: 'FILE' or 'URL'
  const [imageInputMode, setImageInputMode] = useState<'FILE' | 'URL'>('FILE');

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [stock, setStock] = useState('50');
  const [quantityUnit, setQuantityUnit] = useState('1 Pack');
  const [categoryId, setCategoryId] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((cats) => {
        if (Array.isArray(cats)) {
          setCategories(cats);
          if (cats.length > 0) setCategoryId(cats[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setName('');
    setPrice('');
    setMrp('');
    setStock('50');
    setQuantityUnit('1 Pack');
    setShortDesc('');
    setImageUrl('');
    setImagePreview('');
    if (categories.length > 0) setCategoryId(categories[0].id);
    setModalMode('ADD');
  };

  // Open Edit Product Modal pre-filled
  const handleOpenEditModal = (prod: ProductItem) => {
    setEditingProductId(prod.id);
    setName(prod.name);
    setPrice(prod.price.toString());
    setMrp(prod.mrp.toString());
    setStock(prod.stock.toString());
    setQuantityUnit(prod.quantityUnit || '1 Pack');
    setShortDesc(prod.shortDesc || '');

    const currentImg = prod.images?.[0]?.url || '';
    setImageUrl(currentImg);
    setImagePreview(currentImg);
    
    // Set category
    const catId = prod.categoryId || categories.find((c) => c.name === prod.category?.name)?.id || '';
    setCategoryId(catId);

    setModalMode('EDIT');
  };

  // Handle Image File Upload from Computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show immediate local preview
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);

    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
        setImagePreview(data.url);
      } else {
        alert('Failed to upload image file');
      }
    } catch (err) {
      console.error('File Upload Error:', err);
    } finally {
      setUploadingFile(false);
    }
  };

  // Submit Add or Edit Product
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) return;

    setSubmitLoading(true);

    try {
      const finalImage = imageUrl || imagePreview || 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800';

      const method = modalMode === 'EDIT' ? 'PUT' : 'POST';
      const bodyPayload: any = {
        name,
        price,
        mrp: mrp || price,
        stock,
        quantityUnit,
        categoryId,
        shortDesc,
        imageUrl: finalImage,
      };

      if (modalMode === 'EDIT' && editingProductId) {
        bodyPayload.id = editingProductId;
      }

      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        setModalMode(null);
        setName('');
        setPrice('');
        setMrp('');
        setShortDesc('');
        setImageUrl('');
        setImagePreview('');
        fetchProducts();
      } else {
        alert(`Failed to ${modalMode === 'EDIT' ? 'update' : 'add'} product.`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4D9C5]">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
            Manage Products ({products.length})
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            Add new products, edit pricing, stock & photos, or delete products.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F5EFE4] border border-[#E4D9C5] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
          />
          <Search className="w-4 h-4 text-[#D97706] absolute left-3 top-2.5" />
        </div>

        <button
          onClick={fetchProducts}
          className="p-2 rounded-xl bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#E4D9C5] transition-colors"
          title="Refresh products"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 shadow-card">
        {loading ? (
          <p className="text-xs text-[#D97706] py-8 text-center animate-pulse">Loading products database...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-[#3A2A20]/60 py-8 text-center">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#3A2A20]">
              <thead className="bg-[#FAF6EE] text-[#4A0E17] font-serif uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price / MRP</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-center">Edit</th>
                  <th className="p-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4D9C5]/50">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FAF6EE]/60 transition-colors">
                    
                    {/* 1. Product Name & Image */}
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-[#E4D9C5]">
                        <img src={prod.images?.[0]?.url || ''} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-[#4A0E17] block">{prod.name}</span>
                        <span className="text-[10px] text-[#3A2A20]/60">{prod.quantityUnit}</span>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706]">
                        {prod.category?.name}
                      </span>
                    </td>

                    {/* 3. Price / MRP */}
                    <td className="p-3">
                      <span className="font-bold text-[#4A0E17]">₹{prod.price}</span>
                      {prod.mrp > prod.price && (
                        <span className="text-[10px] text-[#3A2A20]/50 line-through ml-1">₹{prod.mrp}</span>
                      )}
                    </td>

                    {/* 4. Stock */}
                    <td className="p-3">
                      <span className="font-semibold text-emerald-700">{prod.stock} Pcs</span>
                    </td>

                    {/* 5. EDIT BUTTON */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#D97706]/10 text-[#D97706] hover:bg-[#D97706] hover:text-white transition-colors font-semibold flex items-center gap-1 mx-auto"
                        title="Edit product details"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                    </td>

                    {/* 6. DELETE BUTTON */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {modalMode !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-900/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setModalMode(null)} />
          <div className="relative w-full max-w-lg bg-[#FAF6EE] rounded-3xl border border-[#E4D9C5] p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C5]">
              <h3 className="text-base font-serif font-bold text-[#4A0E17]">
                {modalMode === 'EDIT' ? '✏️ Edit Product Details' : '➕ Add New Product'}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-[#3A2A20]/60 hover:text-[#4A0E17]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Product Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pure Bhimseni Kapoor"
                  required
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                />
              </div>

              {/* IMAGE SELECTION MODE TOGGLE */}
              <div className="space-y-2 p-3 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5]">
                <div className="flex items-center justify-between">
                  <label className="font-serif font-bold text-[#4A0E17]">Product Image</label>
                  
                  {/* Mode Selector Tabs */}
                  <div className="flex items-center gap-1 bg-[#FAF6EE] p-1 rounded-xl border border-[#E4D9C5]">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('FILE')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        imageInputMode === 'FILE' ? 'bg-[#D97706] text-white' : 'text-[#3A2A20]/70 hover:text-[#4A0E17]'
                      }`}
                    >
                      <Upload className="w-3 h-3" /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('URL')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        imageInputMode === 'URL' ? 'bg-[#D97706] text-white' : 'text-[#3A2A20]/70 hover:text-[#4A0E17]'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" /> Image URL
                    </button>
                  </div>
                </div>

                {/* Option 1: File Input */}
                {imageInputMode === 'FILE' && (
                  <div className="space-y-2 pt-1">
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#E4D9C5] hover:border-[#D97706] bg-[#FAF6EE] rounded-xl cursor-pointer transition-colors text-center">
                      <Upload className="w-6 h-6 text-[#D97706] mb-1" />
                      <span className="font-bold text-[#4A0E17]">
                        {uploadingFile ? 'Uploading photo...' : 'Click to select new photo from computer'}
                      </span>
                      <span className="text-[10px] text-[#3A2A20]/50 mt-0.5">
                        Supports JPG, PNG, WEBP images
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* Option 2: URL Input */}
                {imageInputMode === 'URL' && (
                  <div className="pt-1">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17]"
                    />
                  </div>
                )}

                {/* Live Image Preview */}
                {(imagePreview || imageUrl) && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden border border-[#D97706] shrink-0">
                      <img src={imagePreview || imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[11px] text-[#3A2A20]/80">
                      <span className="font-bold text-emerald-700 block">✓ Image ready</span>
                      <span className="text-[10px] text-[#3A2A20]/50 truncate max-w-[200px] block">
                        {imageUrl || 'Local file attached'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="249"
                    required
                    className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    placeholder="350"
                    className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#4A0E17] mb-1">Stock Level & Sizing</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="50"
                      required
                      className="w-1/2 p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                    />
                    <input
                      type="text"
                      value={quantityUnit}
                      onChange={(e) => setQuantityUnit(e.target.value)}
                      placeholder="1 Pack"
                      className="w-1/2 p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Short Description</label>
                <textarea
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Pure edible-grade Bhimseni camphor crystals..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#F5EFE4] text-[#4A0E17]"
                />
              </div>

              <button
                type="submit"
                disabled={submitLoading || uploadingFile}
                className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase tracking-wider shadow-md"
              >
                {submitLoading
                  ? modalMode === 'EDIT' ? 'Updating Product...' : 'Saving Product...'
                  : modalMode === 'EDIT' ? 'Update Product Changes' : 'Save Product'
                }
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
