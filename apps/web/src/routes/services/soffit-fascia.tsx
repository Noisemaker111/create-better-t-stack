import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";
import ServicePageTemplate, {
  createServiceHead,
} from "@/components/service-page-template";

export const Route = createFileRoute("/services/soffit-fascia")({
  component: SoffitFasciaPage,
  head: createServiceHead({
    pageTitle: "Soffit & Fascia Repair & Installation",
    metaDescription:
      "Professional soffit and fascia repair in Southeast Michigan. Fix wood rot, install metal trim, improve ventilation. Protect your home's structural integrity.",
    keywords:
      "soffit repair, fascia repair, soffit installation, fascia installation, wood rot repair, metal fascia trim, attic ventilation, soffit fascia replacement Michigan",
  }),
});

function SoffitFasciaPage() {
  return (
    <ServicePage
      benefits={[
        {
          title: "Stop Water Damage",
          description:
            "Damaged fascia allows water behind your gutters, causing rot that spreads to rafters and roof decking.",
        },
        {
          title: "Prevent Pest Entry",
          description:
            "Deteriorating soffit creates openings for birds, squirrels, bats, and insects to enter your attic.",
        },
        {
          title: "Proper Ventilation",
          description:
            "Healthy soffits provide essential attic ventilation that prevents moisture buildup and ice dams.",
        },
        {
          title: "Curb Appeal",
          description:
            "Fresh fascia and soffit dramatically improve your home's appearance and value.",
        },
        {
          title: "Gutter Support",
          description:
            "Strong fascia is essential for properly supporting your gutter system.",
        },
        {
          title: "Lasting Results",
          description:
            "We use quality materials and proper techniques for repairs that last for years.",
        },
      ]}
      description="Water-damaged wood can lead to costly structural problems. Our team expertly repairs and replaces damaged soffit and fascia to protect your home and give it a fresh, clean look."
      faqs={[
        {
          question: "How do I know if my fascia needs repair?",
          answer:
            "Signs include: peeling or flaking paint, visible rot or soft spots, gutters pulling away from the house, water stains on fascia, or small holes (could indicate pest damage).",
        },
        {
          question: "What's the difference between soffit and fascia?",
          answer:
            "Fascia is the vertical board that runs along the edge of your roof where gutters attach. Soffit is the horizontal surface underneath the roof overhang. Both are important for protecting your home.",
        },
        {
          question: "Can you match my existing trim color?",
          answer:
            "Yes! We offer a wide range of colors for metal fascia trim and can closely match most existing finishes. We'll bring samples during your estimate.",
        },
        {
          question: "Do you repair just the damaged sections?",
          answer:
            "Yes, we can often repair only the damaged areas rather than replacing everything. We'll assess the extent of damage and recommend the most cost-effective solution.",
        },
        {
          question: "How long does soffit/fascia work take?",
          answer:
            "Most repairs can be completed in a day. Larger replacement projects may take 1-2 days. We'll give you an accurate timeline during your estimate.",
        },
      ]}
      features={[
        "Wood rot assessment and repair",
        "Complete fascia replacement",
        "Metal fascia trim installation",
        "Soffit repair and replacement",
        "Proper ventilation solutions",
        "Color matching to existing trim",
        "Seamless integration with gutters",
        "Weather-resistant materials",
      ]}
      icon={Home}
      relatedServices={[
        { name: "Gutter Installation", href: "/services/installation" },
        { name: "Gutter Repair", href: "/services/repair" },
        { name: "Commercial Gutters", href: "/services/commercial" },
      ]}
      serviceSlug="soffit-fascia"
      subtitle="Protect your home's structural integrity with professional soffit and fascia services."
      title="Soffit & Fascia Repairs"
    />
  );
}

function ServicePage(props: Parameters<typeof ServicePageTemplate>[0]) {
  return <ServicePageTemplate {...props} />;
}
