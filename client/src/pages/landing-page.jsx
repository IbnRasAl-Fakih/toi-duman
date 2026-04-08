import React from "react";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingFaq from "../components/landing/landing-faq.jsx";
import LandingCta from "../components/landing/landing-cta.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";
import LandingHero from "../components/landing/landing-hero.jsx";
import LandingHowItWorks from "../components/landing/landing-how-it-works.jsx";
import LandingPricing from "../components/landing/landing-pricing.jsx";
import LandingServices from "../components/landing/landing-services.jsx";
import LandingTestimonials from "../components/landing/landing-testimonials.jsx";
import LandingTemplates from "../components/landing/landing-templates.jsx";

export default function LandingPage() {
  return (
    <main
      id="top"
      className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#2b2b31]"
    >
      <LandingHeader />

      <section id="terms" className="h-px w-full" />
      <section id="privacy" className="h-px w-full" />
      <section id="templates" className="flex-1">
        <LandingHero />
        <LandingServices />
        <LandingTemplates />
        <LandingHowItWorks />
        <LandingPricing />
        <LandingTestimonials />
        <LandingFaq />
        <LandingCta />
      </section>

      <LandingFooter />
    </main>
  );
}
