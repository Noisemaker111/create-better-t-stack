import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Droplets,
  Home,
  Leaf,
  Sparkles,
  Wrench,
} from "lucide-react";
import { CTABanner } from "@/components/sections";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      {
        title:
          "Gutter Services | BTG Gutters - Installation, Repair & Leaf Guards in Southeast Michigan",
      },
      {
        name: "description",
        content:
          "Complete gutter services in Southeast Michigan including seamless gutter installation, repair, leaf guard installation, soffit & fascia repair, and commercial gutter solutions. Family-owned, 5-star rated.",
      },
      {
        name: "keywords",
        content:
          "gutter services, gutter installation, gutter repair, leaf guards, gutter guards, soffit fascia, commercial gutters, Southeast Michigan",
      },
      {
        property: "og:title",
        content:
          "Gutter Services | BTG Gutters - Installation, Repair & Leaf Guards in Southeast Michigan",
      },
      {
        property: "og:description",
        content:
          "Complete gutter services including installation, repair, and leaf guards. Family-owned company serving Southeast Michigan with 22+ years experience.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content:
          "Gutter Services | BTG Gutters - Installation, Repair & Leaf Guards",
      },
      {
        name: "twitter:description",
        content:
          "Professional gutter services in Southeast Michigan. Installation, repair, leaf guards, and more.",
      },
    ],
  }),
});

const services = [
  {
    icon: Droplets,
    title: "Gutter Installation & Replacement",
    description:
      "Expert installation of seamless aluminum gutters in 50+ colors. We use concealed hangers every 12-18 inches for maximum durability and a clean look.",
    features: [
      '5" or 6" seamless aluminum gutters',
      "50+ color options to match your home",
      "High-quality materials for lasting protection",
      "Concealed hangers for clean aesthetics",
      "Custom-fit to your home's specifications",
      "4-year warranty included",
    ],
    href: "/services/installation",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Wrench,
    title: "Gutter Repair",
    description:
      "From minor leaks to major damage, our skilled technicians diagnose and fix all gutter issues to restore proper function and protect your home.",
    features: [
      "Leak detection and repair",
      "Gutter realignment",
      "Section replacement",
      "Downspout repairs",
      "Joint and seam fixes",
      "Same-day service available",
    ],
    href: "/services/repair",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Leaf,
    title: "Leaf Guards & Gutter Guards",
    description:
      "Keep debris out and water flowing with our premium gutter protection systems. Say goodbye to clogged gutters and dangerous ladder climbs forever.",
    features: [
      "Multiple guard styles available",
      "Prevents leaves and debris buildup",
      "Reduces maintenance needs",
      "Extends gutter lifespan",
      "Professional installation",
      "Works with existing gutters",
    ],
    href: "/services/leaf-guards",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Home,
    title: "Soffit & Fascia Repairs",
    description:
      "Protect your home's structural integrity with our professional soffit and fascia repair and replacement services. We fix water damage and rot.",
    features: [
      "Wood rot repair and replacement",
      "Metal fascia trim installation",
      "Soffit ventilation solutions",
      "Complete replacement options",
      "Color matching available",
      "Prevents further water damage",
    ],
    href: "/services/soffit-fascia",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Building2,
    title: "Commercial Gutters",
    description:
      "Tailored gutter solutions for businesses of all sizes. We understand the unique needs of commercial properties and work around your schedule.",
    features: [
      "Large-scale gutter systems",
      "Custom commercial solutions",
      "Minimal business disruption",
      "Industrial-grade materials",
      "Scheduled maintenance programs",
      "Fast project completion",
    ],
    href: "/services/commercial",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "Gutter Cleaning",
    description:
      "Professional gutter cleaning to maintain optimal performance. We remove all debris, check for issues, and ensure proper water flow.",
    features: [
      "Complete debris removal",
      "Downspout flushing",
      "System inspection included",
      "Before/after photos",
      "Seasonal service plans",
      "Affordable maintenance",
    ],
    href: "/services/cleaning",
    color: "from-cyan-500 to-cyan-600",
  },
];

function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
              Our Services
            </span>
            <h1 className="mb-6 font-bold text-4xl md:text-5xl">
              Complete Gutter Solutions
            </h1>
            <p className="text-green-100 text-xl">
              From installation to repair and maintenance, BTG Gutters provides
              comprehensive services to protect your property from water damage.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                key={service.title}
              >
                {/* Content */}
                <div
                  className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div
                    className={`mb-4 inline-flex w-fit rounded-xl bg-gradient-to-br ${service.color} p-3`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="mb-4 font-bold text-2xl text-gray-900 md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-gray-600 text-lg">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div className="flex items-center gap-2" key={feature}>
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                      href={service.href}
                    >
                      Learn More
                      <ArrowRight className="h-5 w-5" />
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-green-700 px-6 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
                      href="#quote"
                    >
                      Get Free Quote
                    </a>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div
                    className={`aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${service.color} p-1`}
                  >
                    <div className="flex h-full items-center justify-center rounded-xl bg-white/95">
                      <div className="text-center">
                        <service.icon className="mx-auto mb-4 h-20 w-20 text-green-700" />
                        <p className="font-semibold text-gray-800 text-xl">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              Our Simple Process
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              We make getting new gutters or repairs easy and stress-free.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Contact Us",
                  desc: "Call or fill out our form for a free quote",
                },
                {
                  step: "2",
                  title: "Free Estimate",
                  desc: "We'll assess your needs and provide honest pricing",
                },
                {
                  step: "3",
                  title: "Schedule Work",
                  desc: "Pick a time that works for you",
                },
                {
                  step: "4",
                  title: "Enjoy Results",
                  desc: "We complete the job and clean up thoroughly",
                },
              ].map((item) => (
                <div className="text-center" key={item.step}>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 font-bold text-white text-xl">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />

      {/* Breadcrumb Structured Data */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://btggutters.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://btggutters.com/services",
              },
            ],
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
