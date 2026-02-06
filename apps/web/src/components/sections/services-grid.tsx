import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Droplets,
  Home,
  Leaf,
  Wrench,
} from "lucide-react";
import { EditableSectionImage } from "@/components/admin/editable-section-image";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";
import { getGalleryImageSrc } from "@/lib/images";

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  color: string;
}

const services: ServiceItem[] = [
  {
    id: "services-installation",
    icon: Droplets,
    title: "Gutter Installation",
    description:
      "Expert installation of seamless aluminum gutters in 50+ colors. Concealed hangers every 12-18 inches for maximum Michigan durability.",
    features: [
      '5" or 6" seamless options',
      "50+ color matching",
      "Premium aluminum stock",
    ],
    href: "/services/installation",
    color: "from-green-500 to-[#1eeb00]",
  },
  {
    id: "services-guards",
    icon: Leaf,
    title: "Leaf & Gutter Guards",
    description:
      "Keep debris out and water flowing with our premium gutter protection systems. Say goodbye to ladder climbing and clogged gutters forever.",
    features: [
      "Stainless steel micro-mesh",
      "Fits any gutter system",
      "Lifetime clog-free warranty",
    ],
    href: "/services/leaf-guards",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "services-repair",
    icon: Wrench,
    title: "Gutter Repair & Tune-Up",
    description:
      "From minor leaks to major sagging, our skilled technicians diagnose and fix all gutter issues to restore proper home drainage.",
    features: ["Leak sealing", "Pitch realignment", "Section replacement"],
    href: "/services/repair",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "services-soffit",
    icon: Home,
    title: "Soffit & Fascia Repairs",
    description:
      "Protect your home's structural integrity. We repair and replace water-damaged wood and metal fascia for a complete exterior finish.",
    features: [
      "Wood rot repair",
      "Custom metal bending",
      "Vinyl soffit venting",
    ],
    href: "/services/soffit-fascia",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "services-commercial",
    icon: Building2,
    title: "Commercial Gutters",
    description:
      "Tailored heavy-duty solutions for businesses and industrial properties. We handle large-scale projects with minimal business disruption.",
    features: ["Box gutters", "Heavy-duty steel/aluminum", "Large downspouts"],
    href: "/services/commercial",
    color: "from-slate-700 to-slate-900",
  },
];

const serviceImageById: Record<string, string> = {
  "services-installation": getGalleryImageSrc("013"),
  "services-guards": getGalleryImageSrc("049"),
  "services-repair": getGalleryImageSrc("005"),
  "services-soffit": getGalleryImageSrc("032"),
  "services-commercial": getGalleryImageSrc("072"),
};

export default function ServicesGrid() {
  return <ServicesGridInner services={services} />;
}

function ServicesGridInner({ services }: { services: ServiceItem[] }) {
  return (
    <section className="scroll-mt-24 bg-white py-16 md:py-24" id="services">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 font-bold text-green-800 text-sm uppercase tracking-widest">
            Expert Solutions
          </span>
          <h2 className="mb-6 font-black text-4xl text-gray-900 tracking-tight md:text-5xl lg:text-6xl">
            Comprehensive Protection <br />
            <span className="text-green-600">For Your Michigan Home</span>
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed">
            From seamless installations to advanced protection systems, BTG
            Gutters provides the precision and quality your property deserves.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-gray-900 p-6 md:p-8 lg:p-10">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-green-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="mb-4 font-black text-3xl text-white md:text-4xl">
                Not sure what you need?
              </h3>
              <p className="text-gray-400 text-lg">
                Our experts will assess your home and provide a custom solution
                tailored to your roof pitch and local drainage needs.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-[#1eeb00] px-10 py-5 font-black text-black text-lg shadow-lg transition-all hover:bg-[#19c600] active:scale-95"
                hash="quote"
                onClick={() =>
                  trackCTAClick("quote_section", "Book Free Consultation")
                }
                to="/"
              >
                Book Free Consultation
              </Link>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 px-10 py-5 font-bold text-lg text-white transition-all hover:bg-white/10"
                href="tel:+12485617790"
                onClick={() => trackPhoneClick("quote_section")}
              >
                Talk to Mike
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const imageSrc = serviceImageById[service.id] || "/images/gallery/001.jpg";

  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl"
      to={service.href as any}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <EditableSectionImage
          className="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          fallbackAlt={service.title}
          fallbackSrc={imageSrc}
          hideOnError
          loading="lazy"
          sectionId={service.id}
          usagePath="/"
        />
        {/* Fallback gradient - only visible if image fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300" />
        {/* Icon overlay */}
        <div
          className={`absolute top-3 right-3 inline-flex rounded-xl bg-gradient-to-br ${service.color} z-20 p-2 shadow-lg`}
        >
          <service.icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 font-black text-gray-900 text-xl transition-colors group-hover:text-green-700">
          {service.title}
        </h3>
        <p className="mb-4 text-gray-600 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="mt-auto mb-6 space-y-2">
          {service.features.map((feature) => (
            <li
              className="flex items-center gap-2 font-medium text-gray-700 text-xs"
              key={feature}
            >
              <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                <Check className="h-2.5 w-2.5 text-green-600" />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Link */}
        <div className="flex items-center gap-2 font-bold text-green-700 text-sm transition-colors group-hover:gap-3">
          View Details
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* Subtle Gradient Hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-green-50/0 via-green-50/0 to-green-50 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
