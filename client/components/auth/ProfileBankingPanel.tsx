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

type ActionKey =
  | "email-verification"
  | "change-password";

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
  const profileSubtitle = currentUser.email ?? (isKk ? "Email көрсетілмеген" : "Email не указан");
  return (
    <div className="profile-bank">
      <section className="profile-settings">
        <header className="profile-settings__head">
          <div className="profile-settings__identity">
            <div className="profile-settings__avatar">
              {currentUser.id.slice(0, 1).toUpperCase()}
            </div>
            <div className="profile-settings__intro">
              <h1>{profileTitle}</h1>
              <p>{profileSubtitle}</p>
            </div>
          </div>

          <div className="profile-settings__status">
            {currentUser.email_verified_at
              ? isKk
                ? "Email расталған"
                : "Email подтвержден"
              : isKk
                ? "Email расталмаған"
                : "Email не подтвержден"}
          </div>
        </header>

        <div className="profile-settings__rows">
          <div className="profile-settings__row">
            <span>{isKk ? "Логин ID" : "Логин ID"}</span>
            <strong>{currentUser.id}</strong>
          </div>
          <div className="profile-settings__row">
            <span>{isKk ? "Email аккаунт" : "Email account"}</span>
            <strong>{currentUser.email ?? (isKk ? "Көрсетілмеген" : "Не указан")}</strong>
          </div>
        </div>

        <div className="profile-settings__actions">
        {actions.map((action) => {
          const state = actionState[action.key];
          const isOpen = activeAction === action.key;

          return (
            <article className="profile-settings__action" key={action.key}>
              <button
                className="profile-settings__action-head"
                onClick={() => {
                  setActiveAction(isOpen ? null : action.key);
                  if (action.key === "email-verification" && isOpen) {
                    setEmailCodeRequested(false);
                    setEmailCode("");
                  }
                }}
                type="button"
              >
                <span className="profile-settings__action-label">{action.title}</span>
                <span className="profile-settings__action-value">{action.subtitle}</span>
              </button>

              {isOpen ? (
                <div className="profile-settings__action-body">
                  {action.key === "email-verification" ? (
                    <div className="profile-settings__verification">
                      {!emailCodeRequested ? (
                        <form
                          className="profile-settings__form"
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
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="email@example.com"
                            type="email"
                            value={email}
                          />
                          <button className="button" disabled={state.loading} type="submit">
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
                          className="profile-settings__form"
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
                            onChange={(event) => setEmailCode(event.target.value)}
                            placeholder={isKk ? "6 таңбалы код" : "6-значный код"}
                            type="text"
                            value={emailCode}
                          />
                          <button className="button" disabled={state.loading} type="submit">
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
                      className="profile-settings__form profile-settings__form--stack"
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
                        onChange={(event) => setOldPassword(event.target.value)}
                        placeholder={
                          isKk ? "Ағымдағы құпиясөз" : "Текущий пароль"
                        }
                        type="password"
                        value={oldPassword}
                      />
                      <input
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder={isKk ? "Жаңа құпиясөз" : "Новый пароль"}
                        type="password"
                        value={newPassword}
                      />
                      <button className="button" disabled={state.loading} type="submit">
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
                    <p className="profile-settings__message profile-settings__message--error">
                      {state.error}
                    </p>
                  ) : null}

                  {state.success ? (
                    <p className="profile-settings__message profile-settings__message--success">
                      {state.success}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
        </div>

        <div className="profile-settings__footer">
          <LogoutButton locale={locale} />
        </div>
      </section>
    </div>
  );
}
