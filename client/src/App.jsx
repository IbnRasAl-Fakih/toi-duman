import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/admin/admin-page.jsx";
import AdminEventsPage from "./pages/admin/admin-events-page.jsx";
import AdminOrdersPage from "./pages/admin/admin-orders-page.jsx";
import { InvitationTemplate1Route, template1RoutePath } from "./pages/templates/invitation-page_template_1.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path={template1RoutePath} element={<InvitationTemplate1Route />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/events" element={<AdminEventsPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
