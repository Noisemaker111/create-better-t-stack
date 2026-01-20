import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import ServicePageTemplate, {
  createServiceHead,
} from "@/components/service-page-template";

export const Route = createFileRoute("/services/commercial")({
  component: CommercialPage,
  head: createServiceHead({
    pageTitle: "Commercial Gutter Services",
    metaDescription:
      "Professional commercial gutter solutions for businesses in Southeast Michigan. Offices, warehouses, retail spaces. Minimal disruption, scheduled around your hours.",
    keywords:
      "commercial gutters, business gutter installation, commercial gutter repair, warehouse gutters, retail building gutters, property management gutters, commercial gutter maintenance",
  }),
});

function CommercialPage() {
  return (
    <ServicePage
      benefits={[
        {
          title: "Minimal Disruption",
          description:
            "We schedule work around your business hours to avoid interrupting your operations or customers.",
        },
        {
          title: "Scaled Solutions",
          description:
            "From small storefronts to large warehouses, we have the capacity to handle any size project.",
        },
        {
          title: "Durable Systems",
          description:
            "Commercial-grade materials and proper sizing ensure your gutters handle high water volumes.",
        },
        {
          title: "Property Protection",
          description:
            "Properly functioning gutters protect your building, parking lots, and landscaping from water damage.",
        },
        {
          title: "Maintenance Programs",
          description:
            "We offer scheduled maintenance programs to keep your commercial gutters performing year-round.",
        },
        {
          title: "Licensed & Insured",
          description:
            "Full insurance coverage protects your property and business during any work we perform.",
        },
      ]}
      description="We understand commercial properties have unique needs. BTG Gutters provides tailored solutions for offices, warehouses, retail spaces, and multi-unit buildings with minimal disruption to your business."
      faqs={[
        {
          question: "Can you work outside business hours?",
          answer:
            "Yes! We can schedule installation and repairs for early mornings, evenings, or weekends to avoid disrupting your business operations.",
        },
        {
          question: "Do you handle multi-building properties?",
          answer:
            "Absolutely. We work with property management companies and can handle multiple buildings or units efficiently with consistent quality.",
        },
        {
          question: "What size gutters do commercial buildings need?",
          answer:
            "Commercial buildings often require larger 6-inch or 7-inch gutters with oversized downspouts to handle greater roof areas and water volumes. We'll assess your specific needs.",
        },
        {
          question: "Do you offer maintenance contracts?",
          answer:
            "Yes, we offer scheduled maintenance programs for commercial properties. Regular cleaning and inspections prevent problems and extend the life of your gutter system.",
        },
        {
          question: "How do you handle liability on commercial properties?",
          answer:
            "We carry full liability insurance and can provide certificates of insurance. We also follow all safety protocols required for commercial job sites.",
        },
      ]}
      features={[
        "Large-scale gutter systems",
        "Heavy-duty commercial-grade materials",
        "Custom sizing and configurations",
        "Scheduled around your business hours",
        "Multi-building projects",
        "Property management partnerships",
        "Regular maintenance programs",
        "Fast project completion",
      ]}
      icon={Building2}
      relatedServices={[
        { name: "Gutter Installation", href: "/services/installation" },
        { name: "Leaf Guards", href: "/services/leaf-guards" },
        { name: "Gutter Repair", href: "/services/repair" },
      ]}
      subtitle="Professional gutter solutions for businesses, industrial buildings, and commercial properties."
      title="Commercial Gutters"
    />
  );
}

function ServicePage(props: Parameters<typeof ServicePageTemplate>[0]) {
  return <ServicePageTemplate {...props} />;
}
