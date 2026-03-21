"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import OneClickRegisterButton from "@/components/auth/OneClickRegisterButton";
import { Locale } from "@/lib/i18n";

type LoginPageContentProps = {
  locale: Locale;
  dictionary: {
    login: {
      userId: string;
      password: string;
      userIdPlaceholder: string;
      passwordPlaceholder: string;
      button: string;
      loading: string;
      error: string;
      registerLink: string;
    };
    register: {
      button: string;
      loading: string;
      error: string;
      successTitle: string;
      successText: string;
      createdId: string;
      createdPassword: string;
      loginLink: string;
    };
    nav: {
      register: string;
    };
  };
};

export default function LoginPageContent({
  locale,
  dictionary,
}: LoginPageContentProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <LoginForm
        dictionary={dictionary.login}
        locale={locale}
        onPasswordChange={setPassword}
        onUserIdChange={setUserId}
        password={password}
        userId={userId}
      />

      <div className="mt-6 grid gap-3.5">
        <p className="m-0 text-center font-sans text-base font-bold text-[#2d2621]">
          {dictionary.login.registerLink}
        </p>

        <OneClickRegisterButton
          className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
          dictionary={dictionary.register}
          errorClassName="rounded-2xl bg-[rgba(226,72,72,0.08)] px-3.5 py-3 font-sans text-[0.92rem] font-semibold text-[#c24545]"
          label={dictionary.nav.register}
          locale={locale}
          onRegistered={(result) => {
            setUserId(result.id);
            setPassword(result.generatedPassword);
          }}
        />
      </div>
    </>
  );
}
