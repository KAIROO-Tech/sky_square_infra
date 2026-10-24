import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Video, Loader2, Link as LinkIcon } from 'lucide-react';
import { mediaService } from '../../services/mediaService';

export const S3Uploader = ({
  label = 'Media Asset',
  value = '',
  onChange,
  mediaType = 'image', // 'image' | 'video' | 'any'
  helperText,
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError(null);
    setIsUploading(true);

    try {
      const res = await mediaService.upload(file);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        throw new Error(res.error || 'Failed to upload media');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      onChange(urlDraft.trim());
      setShowUrlInput(false);
      setUrlDraft('');
    }
  };

  const isVideo =
    value &&
    (value.endsWith('.mp4') ||
      value.endsWith('.webm') ||
      mediaType === 'video' ||
      value.includes('video'));

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="font-mono text-[10px] text-white/50 hover:text-[#d4af37] flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Use File Upload' : 'Direct URL'}</span>
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-white/40 leading-relaxed font-sans">{helperText}</p>
      )}

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste direct HTTPS image or video URL..."
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            className="flex-1 bg-[#141416] border border-white/10 px-3 py-2 text-xs text-white focus:border-[#d4af37] outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 bg-[#d4af37] text-black font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Apply
          </button>
        </div>
      ) : null}

      {/* Preview or Drop Area */}
      {value ? (
        <div className="relative group border border-white/10 bg-[#141416] p-2 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-44 h-28 bg-black/60 flex items-center justify-center overflow-hidden border border-white/5 relative">
            {isVideo ? (
              <video
                src={value}
                controls
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={value}
                alt="Uploaded asset preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1 text-left w-full">
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
              <Check className="w-3 h-3" /> Media Attached
            </span>
            <p className="font-mono text-[11px] text-white/70 truncate block" title={value}>
              {value}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-mono text-[10px] text-[#d4af37] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Replace File
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="font-mono text-[10px] text-[#ff6b6b] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed p-6 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-[#d4af37] bg-[#d4af37]/5'
              : 'border-white/15 bg-[#141416] hover:border-white/30 hover:bg-[#18181c]'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <Loader2 className="w-6 h-6 text-[#d4af37] animate-spin" />
              <p className="font-mono text-xs uppercase tracking-widest text-[#d4af37]">
                Streaming to storage...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-white/5 text-[#d4af37] border border-white/10">
                {mediaType === 'video' ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <p className="font-sans text-xs text-white/80">
                <span className="text-[#d4af37] font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                {mediaType === 'video'
                  ? 'MP4 or WebM up to 100MB'
                  : 'WebP, JPG, PNG or MP4'}
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="font-mono text-[10px] text-[#ff6b6b]">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={
          mediaType === 'video'
            ? 'video/mp4,video/webm'
            : 'image/*,video/mp4,video/webm,.pdf'
        }
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
};
