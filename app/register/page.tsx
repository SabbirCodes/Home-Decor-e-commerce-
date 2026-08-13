"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { motion } from "motion/react";
import Button from "@/components/button";
import { notify } from "@/components/toaster";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (res?.error) throw new Error();
      notify.success("Account created — welcome!");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      notify.error(err.response?.data?.error || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-72px)]">
      <div className="flex items-center justify-center px-6 py-16 order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">Join us</p>
          <h1 className="font-display text-3xl text-ink mb-8">Create your account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-xs text-ink-soft mb-1.5">Full name</span>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
              />
            </label>
            <label className="block">
              <span className="block text-xs text-ink-soft mb-1.5">Email</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
              />
            </label>
            <label className="block">
              <span className="block text-xs text-ink-soft mb-1.5">Password</span>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
              />
            </label>

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Create account
            </Button>
          </form>

          <p className="text-sm text-ink-soft text-center mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-clay hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden md:block order-1 md:order-2">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
          alt="A calm bedroom styled with natural textiles"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dusk/20" />
      </div>
    </div>
  );
}
