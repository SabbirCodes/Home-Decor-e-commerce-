"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { RatingDisplay, RatingInput } from "@/components/rating";
import Button from "@/components/button";
import { notify } from "@/components/toaster";
import type { IReview } from "@/types";

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/reviews?product=${productId}`);
      setReviews(data.reviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    load();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return notify.error("Please sign in to leave a review.");
    if (!rating || !comment.trim()) return notify.error("Add a rating and a comment.");

    setSubmitting(true);
    try {
      await axios.post("/api/reviews", { product: productId, rating, comment });
      notify.success("Thanks for your review!");
      setRating(0);
      setComment("");
      load();
    } catch (err: any) {
      notify.error(err.response?.data?.error || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h3 className="font-display text-2xl text-ink mb-5">
          {reviews.length ? `${reviews.length} review${reviews.length > 1 ? "s" : ""}` : "No reviews yet"}
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-surface-2 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {reviews.map((r) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-line pb-5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-ink">{r.userName}</span>
                    <RatingDisplay value={r.rating} size={12} />
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{r.comment}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {!reviews.length && (
              <p className="text-sm text-ink-soft">Be the first to share your thoughts on this piece.</p>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl text-ink mb-5">Write a review</h3>
        <form onSubmit={handleSubmit} className="space-y-4 bg-surface rounded-xl border border-line p-6">
          <div>
            <label className="block text-xs text-ink-soft mb-2">Your rating</label>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <div>
            <label className="block text-xs text-ink-soft mb-2">Your review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share how this piece looks and feels in your space..."
              className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-clay resize-none"
            />
          </div>
          <Button type="submit" variant="clay" loading={submitting} className="w-full">
            Submit review
          </Button>
        </form>
      </div>
    </div>
  );
}
