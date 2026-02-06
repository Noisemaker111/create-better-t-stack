import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import ServicePageTemplate, {
  createServiceHead,
} from "@/components/service-page-template";

export const Route = createFileRoute("/services/leaf-guards")({
  component: LeafGuardsPage,
  head: createServiceHead({
    pageTitle: "Leaf Guards & Gutter Protection",
    metaDescription:
      "Stop cleaning gutters forever with premium leaf guard installation. Mesh guards, solid covers, and micro-mesh systems available. Keep debris out, water flowing!",
    keywords:
      "leaf guards, gutter guards, gutter protection, mesh gutter guards, micro mesh guards, gutter covers, debris protection, no clog gutters",
  }),
});

function LeafGuardsPage() {
  return (
    <ServicePage
      benefits={[
        {
          title: "No More Cleaning",
          description:
            "Forget about cleaning gutters 2-4 times a year. Guards keep debris out so you don't have to.",
        },
        {
          title: "Prevent Clogs",
          description:
            "Clogged gutters cause overflows, water damage, and ice dams. Guards prevent these costly problems.",
        },
        {
          title: "Stay Safe",
          description:
            "No more risky ladder climbs. Gutter guards eliminate the need for dangerous DIY cleaning.",
        },
        {
          title: "Protect Your Investment",
          description:
            "Guards prevent debris buildup that causes rust, corrosion, and premature gutter failure.",
        },
        {
          title: "Year-Round Protection",
          description:
            "Whether it's fall leaves, spring seedlings, or pine needles, guards handle it all seasons.",
        },
        {
          title: "Pest Prevention",
          description:
            "Guards help keep birds, rodents, and insects from nesting in your gutters.",
        },
      ]}
      description="Stop climbing ladders and cleaning gutters! Our premium leaf guard systems keep debris out while letting water flow freely. Protect your gutters, your home, and your weekends."
      faqs={[
        {
          question: "What types of gutter guards do you offer?",
          answer:
            "We offer several options including mesh guards, solid covers with slots, and micro-mesh systems. We'll recommend the best type for your specific situation based on the trees near your home.",
        },
        {
          question: "Will gutter guards work with my existing gutters?",
          answer:
            "Yes! We can install guards on most existing gutter systems. We'll inspect your gutters and ensure they're in good condition before installation.",
        },
        {
          question: "Do I still need to clean my gutters with guards?",
          answer:
            "Very rarely. While no system is 100% maintenance-free, quality guards reduce cleaning to once every few years instead of multiple times per year. Small debris may occasionally need to be brushed off the top.",
        },
        {
          question: "Can gutter guards handle heavy rain?",
          answer:
            "Yes, properly installed guards can handle even heavy Michigan storms. We ensure correct installation so water flows into the gutter while debris stays out.",
        },
        {
          question: "How long do gutter guards last?",
          answer:
            "Quality gutter guards typically last 10-20 years or more. The exact lifespan depends on the type of guard and your local conditions.",
        },
      ]}
      features={[
        "Multiple guard styles to fit your needs",
        "Works with existing or new gutters",
        "Keeps leaves, twigs, and debris out",
        "Allows maximum water flow",
        "Professional installation",
        "Reduces maintenance to nearly zero",
        "Extends gutter lifespan",
        "Available in matching colors",
      ]}
      icon={Leaf}
      relatedServices={[
        { name: "Gutter Installation", href: "/services/installation" },
        { name: "Commercial Gutters", href: "/services/commercial" },
        { name: "Gutter Repair", href: "/services/repair" },
      ]}
      serviceSlug="leaf-guards"
      subtitle="Say goodbye to clogged gutters forever with our professional gutter protection solutions."
      title="Leaf Guards & Gutter Guards"
    />
  );
}

function ServicePage(props: Parameters<typeof ServicePageTemplate>[0]) {
  return <ServicePageTemplate {...props} />;
}
