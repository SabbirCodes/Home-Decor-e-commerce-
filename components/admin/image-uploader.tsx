"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, X, Loader2, RefreshCw } from "lucide-react";

export interface PendingImage {
  id: string;
  url: string;
  file?: File;
}

interface ImageUploaderProps {
  images: PendingImage[];
  onChange: (images: PendingImage[]) => void;
  uploadingIds?: Set<string>;
  disabled?: boolean;
}

export default function ImageUploader({
  images,
  onChange,
  uploadingIds,
  disabled,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const image = images[0];

  // Revoke any local blob preview on unmount so we don't leak memory.
  useEffect(() => {
    return () => {
      if (image?.file) URL.revokeObjectURL(image.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (image?.file) URL.revokeObjectURL(image.url);

    onChange([
      {
        id: `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(file),
        file,
      },
    ]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = () => {
    if (image?.file) URL.revokeObjectURL(image.url);
    onChange([]);
  };

  const isUploading = image && uploadingIds?.has(image.id);

  return (
    <div>
      <div className="relative aspect-square w-40 rounded-sm overflow-hidden bg-surface-2 border border-line group">
        <AnimatePresence mode="wait">
          {image ? (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {image.file ? (
                // Local (not-yet-uploaded) preview — next/image can't
                // optimize blob: URLs, so a plain <img> is correct here.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.url}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              )}

              {image.file && !isUploading && (
                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-dusk/80 text-cream text-[9px] px-2 py-0.5">
                  Not uploaded yet
                </span>
              )}

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dusk/50">
                  <Loader2 size={20} className="animate-spin text-cream" />
                </div>
              )}

              {!isUploading && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-dusk/0 group-hover:bg-dusk/40 transition-colors opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-ink hover:bg-cream"
                    aria-label="Replace image"
                  >
                    <RefreshCw size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={disabled}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-danger hover:bg-cream"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.button
              key="empty"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 border border-dashed border-line hover:border-clay text-ink-soft hover:text-clay transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <UploadCloud size={20} strokeWidth={1.5} />
              <span className="text-[10px]">Upload image</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="text-[11px] text-ink-soft mt-2">
        One image per product. It uploads to ImageKit when you save, not when
        you select it.
      </p>
    </div>
  );
}
