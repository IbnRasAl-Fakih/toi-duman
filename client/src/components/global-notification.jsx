import React from "react";
import CloseIcon from "../assets/close.jsx";

function NotificationItem({ notification, onClose }) {
  const isSuccess = notification.type === "success";
  const accentClass = isSuccess ? "bg-[#17a34a]" : "bg-[#f24857]";
  const icon = isSuccess ? "✓" : "!";

  return (
    <div className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-[18px] bg-white shadow-[0_14px_35px_rgba(31,26,23,0.14)]">
      <div className={`absolute inset-y-0 left-0 w-[6px] ${accentClass}`} />

      <div className="flex min-h-[72px] items-center gap-3 px-3 py-3 pl-4">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white ${accentClass}`}>
          {icon}
        </div>

        <div className="flex min-h-[48px] min-w-0 flex-1 items-center">
          <p className="text-[15px] font-medium leading-6 text-[#2c2724]">{notification.message}</p>
        </div>

        <button
          type="button"
          onClick={() => onClose(notification.id)}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f24857] transition hover:bg-[#fff1f3]"
          aria-label="Закрыть уведомление"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function GlobalNotification({ notifications, onClose }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(100%-1.5rem,22rem)] flex-col gap-3 md:bottom-6 md:right-6">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onClose={onClose} />
      ))}
    </div>
  );
}
