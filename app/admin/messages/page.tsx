"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Trash2, ChevronDown } from "lucide-react";
import ConfirmModal from "@/components/modal";
import { notify } from "@/components/toaster";
import type { IContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/admin/messages");
    setMessages(data.messages);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const toggleOpen = async (msg: IContactMessage) => {
    const opening = openId !== msg._id;
    setOpenId(opening ? msg._id : null);

    if (opening && !msg.read) {
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
      try {
        await axios.put(`/api/admin/messages/${msg._id}`, { read: true });
      } catch {
        // non-critical — leave optimistic state as-is
      }
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/messages/${deleteTarget._id}`);
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      notify.success("Message deleted.");
      setDeleteTarget(null);
    } catch {
      notify.error("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Messages</h1>
        {unreadCount > 0 && (
          <span className="rounded-full bg-clay text-cream text-xs font-medium px-3 py-1">
            {unreadCount} unread
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-surface-2 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-surface overflow-hidden">
          <AnimatePresence>
            {messages.map((msg) => {
              const open = openId === msg._id;
              return (
                <motion.div
                  key={msg._id}
                  layout
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-line last:border-0"
                >
                  <button
                    onClick={() => toggleOpen(msg)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-2 transition-colors"
                  >
                    {msg.read ? (
                      <MailOpen size={16} className="text-ink-soft shrink-0" />
                    ) : (
                      <Mail size={16} className="text-clay shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm truncate ${msg.read ? "text-ink-soft" : "text-ink font-medium"}`}>
                          {msg.name}
                        </p>
                        <span className="text-xs text-ink-soft shrink-0">· {msg.subject}</span>
                      </div>
                      <p className="text-xs text-ink-soft truncate">{msg.email}</p>
                    </div>
                    <span className="text-xs text-ink-soft shrink-0 hidden sm:block">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-ink-soft shrink-0"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[3.1rem]">
                          <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-wrap mb-4">
                            {msg.message}
                          </p>
                          <div className="flex items-center gap-3">
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs font-medium text-clay hover:underline"
                            >
                              Reply by email
                            </a>
                            <button
                              onClick={() => setDeleteTarget(msg)}
                              className="flex items-center gap-1 text-xs text-danger hover:underline"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {!messages.length && (
            <p className="text-sm text-ink-soft p-6 text-center">No messages yet.</p>
          )}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this message?"
        description="This can't be undone."
        confirmLabel="Delete message"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}