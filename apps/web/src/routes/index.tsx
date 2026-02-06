import { createFileRoute } from "@tanstack/react-router";
import {
  CTABanner,
  Hero,
  ProjectShowcase,
  QuoteForm,
  ServiceAreasSection,
  ServicesGrid,
  Testimonials,
  TrustBar,
  WhyChooseUs,
} from "@/components/sections";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return <HomePageContent />;
}

export function HomePageContent() {
  return (
    <>
      {/* Hero Section - Above the fold with dual CTA */}
      <Hero />

      {/* Trust Bar - Quick trust signals */}
      <TrustBar />

      {/* Services Grid - What we offer (with project images) */}
      <ServicesGrid />

      {/* Project Showcase - Real project images */}
      <ProjectShowcase />

      {/* Why Choose Us - Our differentiators */}
      <WhyChooseUs />

      {/* CTA Banner - Mid-page conversion point */}
      <CTABanner />

      {/* Testimonials - Social proof (with project images) */}
      <Testimonials />

      {/* Service Areas - Local SEO + geographic coverage */}
      <ServiceAreasSection />

      {/* Quote Form - Primary conversion point */}
      <QuoteForm />
    </>
  );
}
