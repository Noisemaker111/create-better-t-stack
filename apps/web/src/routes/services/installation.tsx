import { createFileRoute } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import ServicePageTemplate, {
  createServiceHead,
} from "@/components/service-page-template";

export const Route = createFileRoute("/services/installation")({
  component: InstallationPage,
  head: createServiceHead({
    pageTitle: "Gutter Installation & Replacement",
    metaDescription:
      "Professional seamless gutter installation in Southeast Michigan. Custom-fabricated aluminum gutters, 50+ colors, 4-year warranty. Free estimates!",
    keywords:
      "gutter installation, seamless gutters, gutter replacement, new gutters, aluminum gutters, 6 inch gutters, gutter installation Michigan",
  }),
});

function InstallationPage() {
  return (
    <ServicePage
      benefits={[
        {
          title: "Seamless Design",
          description:
            "No seams means fewer leaks. Our gutters are custom-fabricated on-site for your exact specifications.",
        },
        {
          title: "Superior Materials",
          description:
            "We use only high-grade aluminum that resists rust, warping, and weather damage for lasting performance.",
        },
        {
          title: "Expert Installation",
          description:
            "With 22+ years of combined experience, we know exactly how to install gutters that perform flawlessly.",
        },
        {
          title: "Perfect Fit",
          description:
            "Every home is different. We measure precisely and fabricate gutters that fit your home perfectly.",
        },
        {
          title: "Proper Drainage",
          description:
            "We ensure correct pitch and downspout placement to move water away from your foundation effectively.",
        },
        {
          title: "Lasting Value",
          description:
            "Quality gutters add curb appeal and protect your biggest investment - your home.",
        },
      ]}
      description="Whether you're building a new home or replacing worn-out gutters, BTG Gutters delivers expert installation with premium materials. Our seamless aluminum gutters are custom-fabricated on-site for a perfect fit."
      faqs={[
        {
          question: "How long does gutter installation take?",
          answer:
            "Most residential gutter installations are completed in one day. Larger homes or complex rooflines may take 1-2 days. We'll give you an accurate timeline during your free estimate.",
        },
        {
          question: "What colors are available?",
          answer:
            "We offer over 50 color options to match any home exterior. Popular choices include white, brown, bronze, black, and various shades of gray. We bring color samples to your estimate.",
        },
        {
          question: "Should I choose 5-inch or 6-inch gutters?",
          answer:
            "It depends on your roof size and local rainfall. 5-inch gutters work well for most homes, but 6-inch gutters handle more water and are better for larger roofs or areas with heavy rain. We'll recommend the right size for your home.",
        },
        {
          question: "What happens to my old gutters?",
          answer:
            "We remove and dispose of all old gutters, hangers, and downspouts. Your property is left clean and debris-free.",
        },
        {
          question: "Do you offer financing?",
          answer:
            "We accept all major credit cards, cash, check, Venmo, Zelle, and Apple Pay. Contact us to discuss payment options for your project.",
        },
      ]}
      features={[
        "Custom-fabricated seamless aluminum gutters",
        "5-inch or 6-inch gutter options",
        "50+ color choices to match your home",
        "Concealed hangers every 12-18 inches",
        "High-quality aluminum downspouts",
        "Proper pitch for optimal drainage",
        "Complete cleanup after installation",
        "4-year warranty on materials and labor",
      ]}
      icon={Droplets}
      relatedServices={[
        { name: "Leaf Guards", href: "/services/leaf-guards" },
        { name: "Gutter Repair", href: "/services/repair" },
        { name: "Soffit & Fascia", href: "/services/soffit-fascia" },
      ]}
      serviceSlug="installation"
      subtitle="Professional seamless gutter installation that protects your home for years to come."
      title="Gutter Installation & Replacement"
    />
  );
}

function ServicePage(props: Parameters<typeof ServicePageTemplate>[0]) {
  return <ServicePageTemplate {...props} />;
}
