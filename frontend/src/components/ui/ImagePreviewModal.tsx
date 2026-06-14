"use client";

import React from "react";
import { X, Download } from "lucide-react";
import toast from "react-hot-toast";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  showDownload?: boolean;
}

export default function ImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  showDownload = false,
}: ImagePreviewModalProps) {
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `aura-photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div className="absolute top-6 right-6 flex gap-4">
        {showDownload && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10"
            title="Download Image"
          >
            <Download size={24} />
          </button>
        )}
        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10"
          title="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div
        className="relative flex flex-col items-center gap-4 mt-8 w-auto max-w-[min(92vw,900px)] max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group inline-flex overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
          <img
            src={imageUrl}
            alt={title || "Preview"}
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        {title && (
          <h3 className="text-white font-serif text-xl font-bold tracking-wide animate-in slide-in-from-bottom duration-500 delay-150 text-center">
            {title}
          </h3>
        )}
      </div>
    </div>
  );
}
