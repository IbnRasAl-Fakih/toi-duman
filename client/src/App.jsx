import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedAdminRoute from "./components/protected-admin-route.jsx";
import AdminEventsPage from "./pages/admin/admin-events-page.jsx";
import AdminLoginPage from "./pages/admin/admin-login-page.jsx";
import AdminOrdersPage from "./pages/admin/admin-orders-page.jsx";
import GuestsPage from "./pages/guests-page.jsx";
import InvitationPageResolver from "./pages/invitation-page-resolver.jsx";
import LandingPage from "./pages/landing-page.jsx";
import PaymentPage from "./pages/payment-page.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";
import PrivacyPage from "./pages/privacy-page.jsx";
import TheatreOfLoveFormPage from "./pages/forms/theatre-of-love-form-page.jsx";
import RomanceGardenFormPage from "./pages/forms/romance-garden-form-page.jsx";
import TemplatesPage from "./pages/templates-page.jsx";
import TermsPage from "./pages/terms-page.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/templates" element={<TemplatesPage />} />

      <Route path="/theatre-of-love/form" element={<TheatreOfLoveFormPage />} />
      <Route path="/romance-garden/form" element={<RomanceGardenFormPage />} />

      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/payment/:orderId" element={<PaymentPage />} />

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/events" replace />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Route>

      <Route path="/:slug/guests" element={<GuestsPage />} />
      <Route path="/:slug" element={<InvitationPageResolver />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
