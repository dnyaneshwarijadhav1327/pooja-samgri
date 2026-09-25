'use client';

import React, { useState, useEffect } from 'react';
import { Video, Plus, Trash2, Play, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Sparkles, Clock, Film } from 'lucide-react';
import Link from 'next/link';

interface MakingVideo {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<MakingVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Diya Wicks');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('1:30 min');
  const [description, setDescription] = useState('');

  const [previewVideo, setPreviewVideo] = useState<MakingVideo | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/videos');
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (e) {
      console.error('Failed to load videos:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) {
      setActionError('Please enter both video title and video URL.');
      return;
    }

    setSubmitting(true);
    setActionError('');
    setActionSuccess('');

    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          videoUrl,
          thumbnail,
          duration,
          description,
        }),
      });

      if (res.ok) {
        setActionSuccess('Product making video added successfully! It is now live in Section 4 on the homepage.');
        setTitle('');
        setVideoUrl('');
        setThumbnail('');
        setDuration('1:30 min');
        setDescription('');
        fetchVideos();
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to add video.');
      }
    } catch (e) {
      setActionError('Network error while saving video.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVideo = async (id: string, videoTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${videoTitle}" from the product making section?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setActionSuccess(`"${videoTitle}" removed successfully.`);
        fetchVideos();
      } else {
        setActionError('Failed to remove video.');
      }
    } catch (e) {
      setActionError('Network error while deleting video.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4D9C5]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center font-bold">
              🎥
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
              Product Making Videos ({videos.length})
            </h1>
          </div>
          <p className="text-xs text-[#3A2A20]/75 mt-0.5">
            Manage videos shown in the 4th section (&quot;How Our Sacred Products Are Made&quot;) on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-white hover:bg-[#D97706] hover:text-white text-[#4A0E17] border border-[#E4D9C5] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Preview on Homepage
          </Link>
          <button
            onClick={fetchVideos}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-[#4A0E17] border border-[#E4D9C5] transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Alerts */}
      {actionSuccess && (
        <div className="p-3.5 bg-green-50 text-green-800 text-xs font-semibold rounded-2xl border border-green-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-stone-500 hover:text-stone-800">✕</button>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError('')} className="text-stone-500 hover:text-stone-800">✕</button>
        </div>
      )}

      {/* Main Grid: Form on Left, Active Videos on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ADD VIDEO FORM */}
        <div className="lg:col-span-5 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E4D9C5]">
            <Plus className="w-4 h-4 text-[#D97706]" />
            <h3 className="text-base font-serif font-bold text-[#4A0E17]">
              Add New Making Video
            </h3>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pure Hand-Rolled Cotton Diya Wicks"
                required
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Craft Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                >
                  <option value="Diya Wicks">Diya Wicks</option>
                  <option value="Camphor & Dhoop">Camphor & Dhoop</option>
                  <option value="Sacred Pastes">Sacred Pastes</option>
                  <option value="Havan Samagri">Havan Samagri</option>
                  <option value="Incense Sticks">Incense Sticks</option>
                  <option value="Brass Utensils">Brass Utensils</option>
                  <option value="Puja Kits Crafting">Puja Kits Crafting</option>
                  <option value="Spiritual Powders">Spiritual Powders</option>
                  <option value="Other Sacred Craft">Other Sacred Craft</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Duration Tag</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 1:45 min"
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">
                Video URL (MP4 Link / YouTube Link) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://... or YouTube URL or /videos/filename.mp4"
                required
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
              <p className="text-[10px] text-[#3A2A20]/60 mt-1">
                Supports Direct MP4 link, YouTube link (e.g. <code>https://www.youtube.com/watch?v=...</code>), or local files in <code>/public/videos/</code>.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">
                Thumbnail Image URL (Optional)
              </label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Craft Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the sacred making technique, authentic materials used, and traditional methods..."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              {submitting ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Adding Video...</>
              ) : (
                <><Plus className="w-4 h-4" /> Add Video to Section 4</>
              )}
            </button>
          </form>
        </div>

        {/* ACTIVE VIDEOS LIST */}
        <div className="lg:col-span-7 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4D9C5]">
            <h3 className="text-base font-serif font-bold text-[#4A0E17]">
              Current Making Videos ({videos.length})
            </h3>
            <span className="text-[11px] font-semibold text-[#D97706]">
              Live in Section 4
            </span>
          </div>

          {videos.length === 0 ? (
            <div className="p-8 text-center bg-[#FAF6EE] rounded-2xl border border-dashed border-[#E4D9C5]">
              <Film className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-xs text-stone-500 font-semibold">No videos added yet.</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Use the form on the left to add product making videos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full bg-black">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#4A0E17] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#D97706]/40 shadow-xs">
                          {vid.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#D97706]" /> {vid.duration}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3.5 space-y-1">
                      <h4 className="text-xs font-serif font-bold text-[#4A0E17] line-clamp-1">
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-[#3A2A20]/70 line-clamp-2 leading-tight">
                        {vid.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 border-t border-[#E4D9C5] flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                    <span className="text-[10px] text-[#3A2A20]/60 font-mono truncate max-w-[140px]" title={vid.videoUrl}>
                      {vid.videoUrl}
                    </span>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold"
                      title="Delete Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
