"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import { Locale } from "@/lib/i18n";

type ProfileBankingPanelProps = {
  locale: Locale;
  currentUser: {
    id: string;
    email: string | null;
    role: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
};

type ActionKey = "email-verification" | "change-password";

type ActionState = {
  loading: boolean;
  error: string;
  success: string;
};

const initialActionState: ActionState = {
  loading: false,
  error: "",
  success: "",
};

export default function ProfileBankingPanel({
  locale,
  currentUser,
}: ProfileBankingPanelProps) {
  const router = useRouter();
  const isKk = locale === "kk";
  const [activeAction, setActiveAction] = useState<ActionKey | null>(null);
  const [actionState, setActionState] = useState<Record<ActionKey, ActionState>>({
    "email-verification": initialActionState,
    "change-password": initialActionState,
  });
  const [email, setEmail] = useState(currentUser.email ?? "");
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeRequested, setEmailCodeRequested] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function setPending(key: ActionKey, loading: boolean) {
    setActionState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        loading,
        error: loading ? "" : prev[key].error,
        success: loading ? "" : prev[key].success,
      },
    }));
  }

  function setMessage(key: ActionKey, type: "error" | "success", value: string) {
    setActionState((prev) => ({
      ...prev,
      [key]: {
        loading: false,
        error: type === "error" ? value : "",
        success: type === "success" ? value : "",
      },
    }));
  }

  async function submitJson(
    key: ActionKey,
    url: string,
    body: Record<string, string>,
    successMessage: string
  ) {
    setPending(key, true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = (await response.json()) as { detail?: string; message?: string };

      if (!response.ok) {
        setMessage(key, "error", data.detail ?? "Request failed");
        return false;
      }

      setMessage(key, "success", data.message ?? successMessage);
      return true;
    } catch {
      setMessage(
        key,
        "error",
        isKk ? "Сұрауды орындау мүмкін болмады" : "Не удалось выполнить запрос"
      );
      return false;
    }
  }

  const actions = [
    {
      key: "email-verification" as const,
      title: isKk ? "Email растау" : "Подтвердить email",
      subtitle: isKk ? "Код сұрау және растау" : "Запросить код и подтвердить",
    },
    {
      key: "change-password" as const,
      title: isKk ? "Құпиясөзді өзгерту" : "Сменить пароль",
      subtitle: isKk ? "Жаңарту" : "Изменить",
    },
  ];

  const profileTitle = currentUser.email ?? currentUser.id;
  const profileSubtitle =
    currentUser.email ?? (isKk ? "Email көрсетілмеген" : "Email не указан");

  return (
    <div className="grid">
      <section className="grid gap-7 rounded-[34px] border border-[rgba(116,93,72,0.08)] bg-white/95 px-10 py-[38px] shadow-[0_24px_64px_rgba(95,72,50,0.08)] max-sm:px-6">
        <header className="flex flex-col justify-between gap-6 border-b border-[rgba(116,93,72,0.1)] pb-7 lg:flex-row lg:items-center">
          <div className="flex items-center gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-[26px] bg-[linear-gradient(135deg,#fff3df,#ffe1b8)] text-[2.8rem] shadow-[0_12px_28px_rgba(95,72,50,0.08)]">
              {currentUser.id.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="m-0 text-[clamp(2rem,3vw,2.8rem)] tracking-[-0.03em]">
                {profileTitle}
              </h1>
              <p className="mt-2 text-[#72675d]">{profileSubtitle}</p>
            </div>
          </div>

          <div className="font-sans text-[0.95rem] font-semibold text-[#9a6f43]">
            {currentUser.email_verified_at
              ? isKk
                ? "Email расталған"
                : "Email подтвержден"
              : isKk
                ? "Email расталмаған"
                : "Email не подтвержден"}
          </div>
        </header>

        <div className="grid gap-5">
          <div className="grid gap-2 border-b border-[rgba(116,93,72,0.08)] pb-5 md:grid-cols-[minmax(180px,0.8fr)_minmax(0,1fr)] md:items-center">
            <span className="font-sans text-[0.98rem] text-[#72675d]">Логин ID</span>
            <strong>{currentUser.id}</strong>
          </div>
          <div className="grid gap-2 border-b border-[rgba(116,93,72,0.08)] pb-5 md:grid-cols-[minmax(180px,0.8fr)_minmax(0,1fr)] md:items-center">
            <span className="font-sans text-[0.98rem] text-[#72675d]">
              {isKk ? "Email аккаунт" : "Email account"}
            </span>
            <strong>{currentUser.email ?? (isKk ? "Көрсетілмеген" : "Не указан")}</strong>
          </div>
        </div>

        <div className="grid gap-5">
          {actions.map((action) => {
            const state = actionState[action.key];
            const isOpen = activeAction === action.key;

            return (
              <article
                className="rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-white/70 p-5"
                key={action.key}
              >
                <button
                  className="grid w-full gap-2 text-left md:grid-cols-[minmax(180px,0.8fr)_minmax(0,1fr)] md:items-center"
                  onClick={() => {
                    setActiveAction(isOpen ? null : action.key);
                    if (action.key === "email-verification" && isOpen) {
                      setEmailCodeRequested(false);
                      setEmailCode("");
                    }
                  }}
                  type="button"
                >
                  <span className="font-sans text-[0.98rem] text-[#72675d]">{action.title}</span>
                  <span className="font-semibold">{action.subtitle}</span>
                </button>

                {isOpen ? (
                  <div className="mt-5 grid gap-4">
                    {action.key === "email-verification" ? (
                      <div className="grid gap-4">
                        {!emailCodeRequested ? (
                          <form
                            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
                            onSubmit={async (event) => {
                              event.preventDefault();
                              const success = await submitJson(
                                action.key,
                                "/api/auth/email/request-code",
                                { email },
                                isKk ? "Код жіберілді" : "Код отправлен"
                              );
                              if (success) {
                                setEmailCodeRequested(true);
                              }
                            }}
                          >
                            <input
                              className="min-h-[52px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-[rgba(250,250,250,0.95)] px-4 outline-none"
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="email@example.com"
                              type="email"
                              value={email}
                            />
                            <button
                              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#b78654] px-6 font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
                              disabled={state.loading}
                              type="submit"
                            >
                              {state.loading
                                ? isKk
                                  ? "Жіберілуде..."
                                  : "Отправка..."
                                : isKk
                                  ? "Код сұрау"
                                  : "Запросить код"}
                            </button>
                          </form>
                        ) : (
                          <form
                            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
                            onSubmit={async (event) => {
                              event.preventDefault();
                              const success = await submitJson(
                                action.key,
                                "/api/auth/email/verify",
                                { code: emailCode },
                                isKk ? "Email расталды" : "Email подтвержден"
                              );
                              if (success) {
                                router.refresh();
                              }
                            }}
                          >
                            <input
                              className="min-h-[52px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-[rgba(250,250,250,0.95)] px-4 outline-none"
                              onChange={(event) => setEmailCode(event.target.value)}
                              placeholder={isKk ? "6 таңбалы код" : "6-значный код"}
                              type="text"
                              value={emailCode}
                            />
                            <button
                              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#b78654] px-6 font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
                              disabled={state.loading}
                              type="submit"
                            >
                              {state.loading
                                ? isKk
                                  ? "Тексерілуде..."
                                  : "Проверка..."
                                : isKk
                                  ? "Растау"
                                  : "Подтвердить"}
                            </button>
                          </form>
                        )}
                      </div>
                    ) : null}

                    {action.key === "change-password" ? (
                      <form
                        className="grid gap-3"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          const success = await submitJson(
                            action.key,
                            "/api/auth/change-password",
                            { oldPassword, newPassword },
                            isKk ? "Құпиясөз жаңартылды" : "Пароль обновлен"
                          );
                          if (success) {
                            setOldPassword("");
                            setNewPassword("");
                          }
                        }}
                      >
                        <input
                          className="min-h-[52px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-[rgba(250,250,250,0.95)] px-4 outline-none"
                          onChange={(event) => setOldPassword(event.target.value)}
                          placeholder={isKk ? "Ағымдағы құпиясөз" : "Текущий пароль"}
                          type="password"
                          value={oldPassword}
                        />
                        <input
                          className="min-h-[52px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-[rgba(250,250,250,0.95)] px-4 outline-none"
                          onChange={(event) => setNewPassword(event.target.value)}
                          placeholder={isKk ? "Жаңа құпиясөз" : "Новый пароль"}
                          type="password"
                          value={newPassword}
                        />
                        <button
                          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#b78654] px-6 font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
                          disabled={state.loading}
                          type="submit"
                        >
                          {state.loading
                            ? isKk
                              ? "Жаңартылуда..."
                              : "Обновление..."
                            : isKk
                              ? "Құпиясөзді өзгерту"
                              : "Сменить пароль"}
                        </button>
                      </form>
                    ) : null}

                    {state.error ? (
                      <p className="rounded-2xl bg-[rgba(226,72,72,0.08)] px-4 py-3 font-sans text-[0.92rem] font-semibold text-[#c24545]">
                        {state.error}
                      </p>
                    ) : null}

                    {state.success ? (
                      <p className="rounded-2xl bg-[rgba(75,176,119,0.1)] px-4 py-3 font-sans text-[0.92rem] font-semibold text-[#248252]">
                        {state.success}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="pt-2">
          <LogoutButton locale={locale} />
        </div>
      </section>
    </div>
  );
}
