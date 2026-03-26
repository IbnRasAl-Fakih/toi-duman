import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App.jsx";
import { AdminAuthProvider } from "./context/admin-auth-context.jsx";
import { NotificationProvider } from "./context/notification-context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
