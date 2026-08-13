"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import Button from "@/components/button";
import { notify } from "@/components/toaster";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      notify.error("Invalid email or password.");
    } else {
      notify.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-72px)]">
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
          alt="A warmly lit reading corner with a linen armchair"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dusk/20" />
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">Welcome back</p>
          <h1 className="font-display text-3xl text-ink mb-8">Sign in to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-xs text-ink-soft mb-1.5">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
              />
            </label>
            <label className="block">
              <span className="block text-xs text-ink-soft mb-1.5">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
              />
            </label>

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Sign in
            </Button>
          </form>

          <p className="text-sm text-ink-soft text-center mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-clay hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
