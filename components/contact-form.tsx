"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import Button from "@/components/button";

const SUBJECTS = ["General question", "Order support", "Wholesale / trade", "Press", "Something else"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="rounded-xl border border-line bg-surface p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 mb-4">
          <CheckCircle2 size={22} strokeWidth={1.5} className="text-sage-dark" />
        </div>
        <h3 className="font-display text-xl text-ink mb-2">Message sent</h3>
        <p className="text-sm text-ink-soft mb-6">
          Thanks for reaching out — we usually reply within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
            setSent(false);
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-xs text-ink-soft mb-1.5">Name</span>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
            />
          </label>
          <label className="block">
            <span className="block text-xs text-ink-soft mb-1.5">Email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-xs text-ink-soft mb-1.5">What&apos;s this about?</span>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors cursor-pointer"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-xs text-ink-soft mb-1.5">Message</span>
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors resize-none"
          />
        </label>

        <Button type="submit" variant="primary" loading={sending} className="w-full sm:w-auto">
          Send message
          <Send size={14} />
        </Button>
      </motion.form>
    </AnimatePresence>
  );
}