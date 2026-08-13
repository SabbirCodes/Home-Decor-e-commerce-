"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Red/destructive styling vs. the neutral clay accent. Defaults to true. */
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Escape to dismiss, and lock background scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, loading, onCancel]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-200 flex items-center justify-center p-4"
        >
          <motion.div
            className="absolute inset-0 bg-dusk/60 backdrop-blur-[2px]"
            onClick={() => !loading && onCancel()}
          />

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            aria-describedby={description ? "confirm-modal-description" : undefined}
            className="relative w-full max-w-sm rounded-xl bg-cream border border-line shadow-2xl shadow-black/25 p-6"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full mb-4 ${
                danger ? "bg-danger/10" : "bg-clay/10"
              }`}
            >
              <AlertTriangle
                size={20}
                strokeWidth={1.5}
                className={danger ? "text-danger" : "text-clay"}
              />
            </div>

            <h2 id="confirm-modal-title" className="font-display text-xl text-ink mb-2">
              {title}
            </h2>
            {description && (
              <p id="confirm-modal-description" className="text-sm text-ink-soft leading-relaxed mb-6">
                {description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2">
              <Button variant="outline" onClick={onCancel} disabled={loading} className="flex-1">
                {cancelLabel}
              </Button>
              <Button
                variant={danger ? "danger" : "clay"}
                onClick={onConfirm}
                loading={loading}
                className="flex-1"
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}