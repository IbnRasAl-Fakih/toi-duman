"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n";

type LogoutButtonProps = {
  locale: Locale;
  label?: string;
};

export default function LogoutButton({ locale, label }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const buttonLabel = label ?? (locale === "kk" ? "Шығу" : "Выйти");

  async function handleLogout() {
    setIsPending(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.push(`/${locale}`);
      router.refresh();
      setIsPending(false);
    }
  }

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(116,93,72,0.12)] bg-[rgba(255,255,255,0.72)] px-6 text-center font-sans text-[0.95rem] font-semibold text-[#2d2621] shadow-[0_8px_24px_rgba(95,72,50,0.06)] transition duration-300 hover:-translate-y-0.5"
      onClick={handleLogout}
      type="button"
    >
      {isPending ? "..." : buttonLabel}
    </button>
  );
}
