import React from "react";
import GlobalNotification from "../components/global-notification.jsx";

const DEFAULT_DURATION = 5000;

const NotificationContext = React.createContext(null);

function buildNotification(type, message, duration) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    message,
    duration: duration ?? DEFAULT_DURATION
  };
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = React.useState([]);

  function closeNotification(id) {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }

  function showNotification(type, message, options = {}) {
    const notification = buildNotification(type, message, options.duration);

    setNotifications((current) => [...current, notification]);
    return notification.id;
  }

  React.useEffect(() => {
    if (!notifications.length) {
      return undefined;
    }

    const timers = notifications.map((notification) =>
      window.setTimeout(() => {
        closeNotification(notification.id);
      }, notification.duration)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [notifications, closeNotification]);

  const value = {
    showNotification,
    closeNotification,
    success(message, options) {
      return showNotification("success", message, options);
    },
    error(message, options) {
      return showNotification("error", message, options);
    }
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <GlobalNotification notifications={notifications} onClose={closeNotification} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
}
