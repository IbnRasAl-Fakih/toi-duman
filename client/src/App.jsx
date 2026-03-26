import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedAdminRoute from "./components/protected-admin-route.jsx";
import AdminCreateEventPage from "./pages/admin/admin-create-event-page.jsx";
import AdminCreateTemplatePage from "./pages/admin/admin-create-template-page.jsx";
import AdminEventsPage from "./pages/admin/admin-events-page.jsx";
import AdminLoginPage from "./pages/admin/admin-login-page.jsx";
import AdminOrdersPage from "./pages/admin/admin-orders-page.jsx";
import AdminTemplatesPage from "./pages/admin/admin-templates-page.jsx";
import GuestsPage from "./pages/guests-page.jsx";
import InvitationPageResolver from "./pages/invitation-page-resolver.jsx";
import LandingPage from "./pages/landing-page.jsx";
import PaymentPage from "./pages/payment-page.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/payment/:orderId" element={<PaymentPage />} />

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/events" replace />} />
        <Route path="/admin/events/create" element={<AdminCreateEventPage />} />
        <Route path="/admin/templates/create" element={<AdminCreateTemplatePage />} />
        <Route path="/admin/templates" element={<AdminTemplatesPage />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Route>

      <Route path="/:slug/guests" element={<GuestsPage />} />
      <Route path="/:slug" element={<InvitationPageResolver />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
