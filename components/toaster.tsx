"use client";

import { Toaster as SonnerToaster, toast } from "sonner";
import { Check, AlertCircle, Heart } from "lucide-react";

export function AppToaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      gap={10}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2.5 rounded-full bg-dusk text-cream pl-2 pr-4 py-2.5 shadow-lg shadow-black/20 text-sm font-medium font-[var(--font-body)] min-w-fit",
        },
      }}
    />
  );
}

const iconWrap = (bg: string, Icon: React.ComponentType<any>) => (
  <span
    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
    style={{ background: bg }}
  >
    <Icon size={13} strokeWidth={2.5} color="#FBF9F4" />
  </span>
);

export const notify = {
  success: (message: string) =>
    toast(message, { icon: iconWrap("var(--color-sage)", Check) }),
  error: (message: string) =>
    toast(message, { icon: iconWrap("var(--color-danger)", AlertCircle) }),
  wishlist: (message: string) =>
    toast(message, { icon: iconWrap("var(--color-clay)", Heart) }),
};
