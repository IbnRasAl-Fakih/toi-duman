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
    <button className="button button--small button--ghost" onClick={handleLogout} type="button">
      {isPending ? "..." : buttonLabel}
    </button>
  );
}
