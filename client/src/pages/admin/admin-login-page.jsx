import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HidePasswordIcon from "../../assets/hide-password.jsx";
import ShowPasswordIcon from "../../assets/show-password.jsx";
import { useAdminAuth } from "../../context/admin-auth-context.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();
  const notification = useNotification();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/events" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(username.trim(), password);
      notification.success("Вход выполнен");
      navigate(location.state?.from || "/admin/events", { replace: true });
    } catch (submitError) {
      notification.error(submitError instanceof Error ? submitError.message : "Не удалось войти");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4efe8] px-4 py-6 text-[#1f1a17] md:px-6">
      <div className="w-full max-w-xl rounded-[36px] border border-black/10 bg-white/85 px-6 py-8 shadow-[0_24px_80px_rgba(31,24,21,0.08)] backdrop-blur-xl md:px-8">
        <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/60">Admin Panel</p>
        <h1 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-5xl leading-[0.92] text-[#7f1118] md:text-6xl">
          Вход
        </h1>
        <p className="mt-4 text-sm leading-7 text-black/65 md:text-base">
          Введите логин и пароль администратора, чтобы открыть управление шаблонами, событиями и заказами.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">Логин</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition focus:border-[#7f1118]/40 focus:bg-white"
              autoComplete="username"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">Пароль</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#7f1118]/40 focus:bg-white"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-5 inline-flex items-center justify-center text-black/45 transition hover:text-[#7f1118]"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <HidePasswordIcon className="h-5 w-5" /> : <ShowPasswordIcon className="h-5 w-5" />}
              </button>
            </div>
          </label>

          <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !username.trim() || !password}
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.14em] text-white transition ${
                isSubmitting || !username.trim() || !password ? "cursor-default bg-[#7f1118]/50" : "bg-[#7f1118] hover:bg-[#5d0b11]"
              }`}
            >
              {isSubmitting ? "Вход..." : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
