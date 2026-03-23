import React from "react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/admin", label: "Создать event", end: true },
  { to: "/admin/events", label: "Список event-ов" },
  { to: "/admin/orders", label: "Список заказов" }
];

export default function AdminShell({ title, description, children }) {
  return (
    <main className="min-h-screen bg-[#f4efe8] px-4 py-6 text-[#1f1a17] md:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <header className="w-full rounded-[32px] border border-black/10 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(31,26,23,0.08)] backdrop-blur md:px-8 lg:px-10">
            <div className="max-w-5xl">
              <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/60">Admin Panel</p>
              <h1 className="mt-4 w-full font-['Georgia','Times_New_Roman',serif] text-5xl leading-[0.92] text-[#7f1118] md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-5 max-w-5xl text-sm leading-7 text-black/65 md:text-base">{description}</p>
            </div>
          </header>

          <div className="w-full rounded-[28px] border border-black/10 bg-white/80 px-4 py-4 shadow-[0_18px_50px_rgba(31,26,23,0.06)] backdrop-blur md:px-6">
            <nav className="flex flex-wrap gap-3">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex items-center justify-center rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] transition ${
                      isActive
                        ? "bg-[#7f1118] text-white shadow-[0_14px_28px_rgba(127,17,24,0.2)]"
                        : "border border-black/10 bg-[#fcfaf7] text-black/60 hover:border-[#7f1118]/25 hover:text-[#7f1118]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
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
