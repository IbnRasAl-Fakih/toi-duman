import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/admin-auth-context.jsx";

const navigationItems = [
  { to: "/admin/events", label: "Events", end: true },
  { to: "/admin/orders", label: "Orders", end: true },
  { to: "/admin/events/create", label: "Create Event", end: true }
];

export default function AdminShell({ title, description, children }) {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#f4efe8] px-4 py-6 text-[#1f1a17] md:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <header className="w-full rounded-[32px] border border-black/10 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(31,26,23,0.08)] backdrop-blur md:px-8 lg:px-10">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/60">Admin Panel</p>
                <h1 className="mt-4 w-full font-['Georgia','Times_New_Roman',serif] text-5xl leading-[0.92] text-[#7f1118] md:text-6xl lg:text-7xl">
                  {title}
                </h1>
                <p className="mt-5 w-full text-sm leading-7 text-black/65 md:text-base">{description}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118]"
              >
                Log Out
              </button>
            </div>
          </header>

          <div className="w-full rounded-[28px] border border-black/10 bg-white/80 px-4 py-3 shadow-[0_18px_50px_rgba(31,26,23,0.06)] backdrop-blur md:px-6">
            <nav className="overflow-x-auto">
              <div className="flex min-w-max items-end gap-1 border-b border-black/8 pb-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `relative inline-flex items-center whitespace-nowrap px-4 py-3 text-xs uppercase tracking-[0.18em] transition ${
                        isActive ? "text-[#7f1118]" : "text-black/45 hover:text-[#7f1118]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? "font-semibold" : "font-medium"}>{item.label}</span>
                        <span
                          className={`absolute inset-x-3 bottom-[-5px] h-[2px] rounded-full transition ${
                            isActive ? "bg-[#7f1118]" : "bg-transparent"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>

          <div className="rounded-[32px] border border-black/10 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(31,26,23,0.08)] backdrop-blur md:px-8 md:py-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
