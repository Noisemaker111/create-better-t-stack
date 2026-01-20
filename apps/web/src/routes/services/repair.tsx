import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import ServicePageTemplate, {
  createServiceHead,
} from "@/components/service-page-template";

export const Route = createFileRoute("/services/repair")({
  component: RepairPage,
  head: createServiceHead({
    pageTitle: "Gutter Repair Services",
    metaDescription:
      "Expert gutter repair in Southeast Michigan. Fix leaks, sagging sections, and damaged downspouts. Same-day service available. Free estimates!",
    keywords:
      "gutter repair, leak repair, gutter fix, downspout repair, sagging gutters, gutter maintenance, repair gutters Michigan",
  }),
});

function RepairPage() {
  return (
    <ServicePage
      benefits={[
        {
          title: "Accurate Diagnosis",
          description:
            "We identify the root cause of your gutter problems, not just the symptoms. This means lasting repairs.",
        },
        {
          title: "Cost-Effective Solutions",
          description:
            "We'll be honest about whether repair or replacement makes more sense for your situation.",
        },
        {
          title: "Quick Response",
          description:
            "We know gutter problems can't wait. We offer same-day and next-day service for urgent repairs.",
        },
        {
          title: "Quality Materials",
          description:
            "We use professional-grade sealants, hangers, and materials that match your existing system.",
        },
        {
          title: "Prevent Further Damage",
          description:
            "Prompt repairs prevent water damage to your fascia, siding, foundation, and landscaping.",
        },
        {
          title: "Honest Assessment",
          description:
            "If your gutters need replacement instead of repair, we'll tell you upfront - no surprise upsells.",
        },
      ]}
      description="Don't let small gutter problems become big headaches. From leaky joints to sagging sections, our skilled technicians diagnose and fix all gutter issues quickly and affordably."
      faqs={[
        {
          question: "How do I know if my gutters need repair?",
          answer:
            "Common signs include: water dripping behind gutters, sagging sections, visible rust or holes, water pooling near your foundation, peeling paint on fascia, or gutters pulling away from the house.",
        },
        {
          question: "Can you repair just one section?",
          answer:
            "Yes! We can repair or replace individual sections without redoing your entire gutter system. We'll match the color and style of your existing gutters as closely as possible.",
        },
        {
          question: "How much do gutter repairs cost?",
          answer:
            "Repair costs vary based on the type and extent of damage. Simple repairs like resealing joints start around $75. We provide free estimates so you know exactly what to expect.",
        },
        {
          question: "When should I replace instead of repair?",
          answer:
            "If your gutters have multiple problem areas, are over 20 years old, or show extensive rust/damage, replacement is often more cost-effective. We'll give you an honest recommendation.",
        },
        {
          question: "Do you offer emergency repairs?",
          answer:
            "Yes, we offer emergency services for urgent situations like gutters that have fallen or are causing immediate water damage. Call us anytime.",
        },
      ]}
      features={[
        "Leak detection and sealing",
        "Gutter realignment and re-pitching",
        "Section replacement",
        "Downspout repairs and unclogging",
        "Hanger replacement",
        "Joint and seam repairs",
        "End cap repairs",
        "Same-day service available",
      ]}
      icon={Wrench}
      relatedServices={[
        { name: "Gutter Installation", href: "/services/installation" },
        { name: "Gutter Cleaning", href: "/services/cleaning" },
        { name: "Soffit & Fascia", href: "/services/soffit-fascia" },
      ]}
      subtitle="Fast, reliable gutter repairs to restore proper function and prevent water damage."
      title="Gutter Repair"
    />
  );
}

function ServicePage(props: Parameters<typeof ServicePageTemplate>[0]) {
  return <ServicePageTemplate {...props} />;
}
