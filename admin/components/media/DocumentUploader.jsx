import React, { useState, useRef } from 'react';
import { FileText, Upload, Trash2, Plus, Loader2, Download } from 'lucide-react';
import { mediaService } from '../../services/mediaService';

export const DocumentUploader = ({ documents = [], onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setError(null);
    setIsUploading(true);

    try {
      const res = await mediaService.upload(file);
      if (res.success && res.url) {
        const sizeFormatted = `${(res.size / (1024 * 1024)).toFixed(1)} MB`;
        const newDoc = {
          title: file.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
          fileUrl: res.url,
          fileSize: sizeFormatted,
        };
        onChange([...documents, newDoc]);
      } else {
        throw new Error(res.error || 'Failed to upload document');
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (index) => {
    const next = documents.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleTitleChange = (index, title) => {
    const next = [...documents];
    next[index] = { ...next[index], title };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Architectural Dossiers &amp; Blueprints (PDF)
        </label>
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
          <span>Attach PDF File</span>
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="p-6 border border-dashed border-white/10 bg-[#141416] text-center">
          <FileText className="w-6 h-6 text-white/30 mx-auto mb-2" />
          <p className="font-sans text-xs text-white/50">
            No technical dossiers or PDF brochures attached.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#141416] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                <div className="p-2 bg-[#0c0c0c] text-[#d4af37] border border-white/10 flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={doc.title}
                    onChange={(e) => handleTitleChange(idx, e.target.value)}
                    placeholder="Document Title (e.g. Master Layout Blueprint)"
                    className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#d4af37] text-xs font-serif text-white py-0.5 outline-none"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                      {doc.fileSize || 'PDF'}
                    </span>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[#d4af37] hover:underline flex items-center gap-1"
                    >
                      <Download className="w-2.5 h-2.5" /> View
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-1.5 text-white/40 hover:text-[#ff6b6b] transition-colors cursor-pointer self-end sm:self-auto"
                title="Remove Document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="font-mono text-[10px] text-[#ff6b6b]">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
};
