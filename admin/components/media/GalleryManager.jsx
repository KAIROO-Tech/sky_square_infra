import React, { useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, Video, ArrowUp, ArrowDown, Loader2, Play, Film } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { isVideoMedia, getMediaThumbnail } from '../../../src/utils/mediaUtils';

export const GalleryManager = ({ images = [], onChange }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUpload = async (files) => {
    if (!files || !files.length) return;
    setIsUploading(true);

    try {
      const newItems = [];
      for (const file of Array.from(files)) {
        const res = await mediaService.upload(file);
        if (res.success && res.url) {
          const isVid = isVideoMedia(res.url, res.mediaType || file.type);
          newItems.push({
            url: res.url,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
            type: isVid ? 'video' : 'image',
          });
        }
      }
      onChange([...images, ...newItems]);
    } catch (err) {
      console.error('Gallery upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBlank = () => {
    onChange([
      ...images,
      {
        url: '',
        caption: `Specification Plate 0${images.length + 1}`,
      },
    ]);
  };

  const handleUpdate = (index, field, value) => {
    const next = [...images];
    const current = next[index] || {};
    const updated = { ...current, [field]: value };
    if (field === 'url') {
      const isVid = isVideoMedia(value, current.type);
      if (isVid) updated.type = 'video';
    }
    next[index] = updated;
    onChange(next);
  };

  const handleRemove = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index, direction) => {
    const next = [...images];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Visual Documentation Gallery ({images.length} Plates &amp; Media)
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
            ) : (
              <Plus className="w-3.5 h-3.5 mr-1" />
            )}
            <span>Upload Media (Photos &amp; Videos)</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={handleAddBlank}
            className="font-mono text-xs text-white/60 hover:text-white cursor-pointer"
          >
            Add URL Card
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => {
          const imgUrl = typeof img === 'string' ? img : img.url;
          const caption = typeof img === 'string' ? '' : img.caption;
          const imgType = typeof img === 'string' ? '' : img.type;
          const isVideo = isVideoMedia(imgUrl, imgType);
          const thumb = getMediaThumbnail(typeof img === 'string' ? { url: img } : img);

          return (
            <div
              key={idx}
              className="p-3 bg-[#141416] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
            >
              {/* Media Preview & Order Controls */}
              <div className="relative w-full h-36 bg-black/60 overflow-hidden border border-white/5 flex items-center justify-center">
                {imgUrl ? (
                  isVideo ? (
                    thumb ? (
                      <img
                        src={thumb}
                        alt={caption || `Plate 0${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={imgUrl}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    )
                  ) : (
                    <img
                      src={imgUrl}
                      alt={caption || `Plate 0${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )
                ) : (
                  <div className="text-center text-white/30 text-xs">
                    <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
                    No Media URL
                  </div>
                )}

                {/* Video Play Badge Overlay */}
                {isVideo && imgUrl && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-[#d4af37]/80 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 ml-0.5 text-[#d4af37] fill-[#d4af37]" />
                    </div>
                  </div>
                )}

                {/* Figure badge */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider bg-black/80 px-2 py-0.5 text-[#d4af37] border border-white/10">
                    FIG. 0{idx + 1}
                  </span>
                  {isVideo && (
                    <span className="font-mono text-[8px] uppercase tracking-wider bg-black/80 px-1.5 py-0.5 text-[#d4af37] border border-[#d4af37]/40 flex items-center gap-0.5">
                      <Film className="w-2.5 h-2.5" /> VIDEO
                    </span>
                  )}
                </div>

                {/* Reorder Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 p-0.5 border border-white/10 z-10">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    className="p-1 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move earlier"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === images.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move later"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* URL & Caption Inputs */}
              <div className="space-y-1.5 flex-1">
                <input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => handleUpdate(idx, 'url', e.target.value)}
                  placeholder="Media URL (.mp4, .webm, image, YouTube)..."
                  className="w-full bg-[#18181b] border border-white/10 px-2 py-1 text-[11px] font-mono text-white/80 outline-none focus:border-[#d4af37]"
                />
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => handleUpdate(idx, 'caption', e.target.value)}
                  placeholder="Plate Caption (e.g. Structural Framing Walkthrough)..."
                  className="w-full bg-[#18181b] border border-white/10 px-2 py-1 text-xs font-sans text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-white/40 hover:text-[#ff6b6b] text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Delete Plate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/mp4,video/webm,video/quicktime,video/*"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
};
