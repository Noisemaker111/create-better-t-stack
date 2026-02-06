import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Droplets,
  ExternalLink,
  Home,
  Leaf,
  MapPin,
  Navigation,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { CTABanner, QuoteForm } from "@/components/sections";
import {
  trackCityPageView,
  trackCTAClick,
  trackPhoneClick,
} from "@/lib/analytics";

export const Route = createFileRoute("/service-areas/$city")({
  component: CityPage,
  head: ({ params }) => {
    const cityName = formatCityName(params.city);
    return {
      meta: [
        {
          title: `BTG Gutters | Gutter Installation & Repair in ${cityName}, MI`,
        },
        {
          name: "description",
          content: `Professional gutter installation, repair, and leaf guards in ${cityName}, MI. Family-owned, 5-star rated service with 100% insurance. Get your free estimate today!`,
        },
        {
          property: "og:title",
          content: `Expert Gutter Services in ${cityName}, MI | BTG Gutters`,
        },
        {
          property: "og:description",
          content: `Serving ${cityName}, MI with premium seamless gutters, repairs, and protection. Local family-owned business with 22+ years experience.`,
        },
      ],
    };
  },
});

const serviceAreasData = [
  { name: "Garden City", county: "Wayne", highlight: true },
  { name: "Livonia", county: "Wayne", highlight: false },
  { name: "Westland", county: "Wayne", highlight: false },
  { name: "Dearborn", county: "Wayne", highlight: false },
  { name: "Dearborn Heights", county: "Wayne", highlight: false },
  { name: "Detroit", county: "Wayne", highlight: false },
  { name: "Canton", county: "Wayne", highlight: false },
  { name: "Plymouth", county: "Wayne", highlight: false },
  { name: "Redford", county: "Wayne", highlight: false },
  { name: "Wayne", county: "Wayne", highlight: false },
  { name: "Inkster", county: "Wayne", highlight: false },
  { name: "Taylor", county: "Wayne", highlight: false },
  { name: "Allen Park", county: "Wayne", highlight: false },
  { name: "Lincoln Park", county: "Wayne", highlight: false },
  { name: "Romulus", county: "Wayne", highlight: false },
  { name: "Belleville", county: "Wayne", highlight: false },
  { name: "Riverview", county: "Wayne", highlight: false },
  { name: "Southgate", county: "Wayne", highlight: false },
  { name: "Wyandotte", county: "Wayne", highlight: false },
  { name: "Ecorse", county: "Wayne", highlight: false },
  { name: "Melvindale", county: "Wayne", highlight: false },
  { name: "Farmington", county: "Oakland", highlight: false },
  { name: "Farmington Hills", county: "Oakland", highlight: false },
  { name: "Southfield", county: "Oakland", highlight: false },
  { name: "Novi", county: "Oakland", highlight: false },
  { name: "Northville", county: "Oakland/Wayne", highlight: false },
  { name: "Oak Park", county: "Oakland", highlight: false },
  { name: "Wixom", county: "Oakland", highlight: false },
  { name: "Sterling Heights", county: "Macomb", highlight: false },
  { name: "Clinton Township", county: "Macomb", highlight: false },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

function formatCityName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function CityPage() {
  const { city: citySlug } = Route.useParams();
  const cityName = formatCityName(citySlug);
  const cityData = serviceAreasData.find((a) => slugify(a.name) === citySlug);
  const county = cityData?.county || "Southeast Michigan";

  // Track city page view
  useEffect(() => {
    trackCityPageView(cityName);
  }, [cityName]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [citySlug]);

  const nearbyCities = serviceAreasData
    .filter(
      (a) =>
        slugify(a.name) !== citySlug &&
        (a.county === cityData?.county || a.highlight)
    )
    .slice(0, 6);

  const services = [
    {
      slug: "installation",
      title: "Seamless Gutter Installation",
      description: `Custom-fabricated seamless aluminum gutters for ${cityName} homes, designed to withstand the heavy ${county} snow loads.`,
      icon: Droplets,
    },
    {
      slug: "repair",
      title: "Expert Gutter Repair",
      description: `Protecting your ${cityName} foundation by fixing leaks, sagging sections, and damaged downspouts before they cause issues.`,
      icon: Wrench,
    },
    {
      slug: "leaf-guards",
      title: "Premium Leaf Guards",
      description: `Keep your ${cityName} gutters free of maple seeds, oak leaves, and debris with our high-performance gutter protection.`,
      icon: Leaf,
    },
    {
      slug: "soffit-fascia",
      title: "Soffit & Fascia Repair",
      description: `Protecting the structural integrity of ${cityName} roofs by repairing wood rot and water-damaged fascia boards.`,
      icon: Home,
    },
    {
      slug: "commercial",
      title: "Commercial Gutters",
      description: `Durable, code-aware gutter solutions for commercial properties across ${cityName} and surrounding areas.`,
      icon: CheckCircle,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400 blur-3xl filter" />
          <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-500 blur-3xl filter" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-700/40 px-4 py-1.5 font-semibold text-sm shadow-lg backdrop-blur-md">
              <MapPin className="h-4 w-4 text-green-400" />
              Serving {cityName}, MI & {county} County
            </span>
            <h1 className="mb-6 font-extrabold text-4xl tracking-tight md:text-5xl lg:text-7xl">
              Top-Rated Gutter Services in{" "}
              <span className="text-green-400">{cityName}</span>
            </h1>
            <p className="mb-10 font-light text-green-50/90 text-xl leading-relaxed md:text-2xl">
              Don't let {cityName}'s unpredictable weather damage your home. Get
              professional seamless gutters installed by our family-owned team.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-green-900 text-lg transition-all hover:bg-green-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                hash="quote"
                onClick={() =>
                  trackCTAClick(
                    "city_page",
                    `Request Free ${cityName} Estimate`
                  )
                }
                to="/"
              >
                Request Free {cityName} Estimate
                <Clock className="h-5 w-5 text-green-700 group-hover:animate-pulse" />
              </Link>
              <a
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/5 px-8 py-4 font-bold text-lg text-white backdrop-blur-sm transition-all hover:bg-white/10"
                href="tel:+12485617790"
                onClick={() => trackPhoneClick("city_page")}
              >
                Call (248) 561-7790
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-green-50/50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            <div className="group flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 shadow-sm transition-transform group-hover:scale-110">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-none">
                  5-Star Rated
                </p>
                <p className="mt-1 text-gray-500 text-xs">
                  Local {cityName} Service
                </p>
              </div>
            </div>
            <div className="group flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 shadow-sm transition-transform group-hover:scale-110">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-none">
                  100% Insured
                </p>
                <p className="mt-1 text-gray-500 text-xs">
                  Full Liability Protection
                </p>
              </div>
            </div>
            <div className="group flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 shadow-sm transition-transform group-hover:scale-110">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-none">
                  Free Quotes
                </p>
                <p className="mt-1 text-gray-500 text-xs">Within 24 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Content Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-block rounded-full bg-green-100 px-4 py-1 font-bold text-green-800 text-sm">
                LOCAL {cityName} EXPERTS
              </div>
              <h2 className="mb-8 font-extrabold text-4xl text-gray-900 leading-tight md:text-5xl">
                Protecting {cityName} Homes from Michigan Water Damage
              </h2>
              <div className="space-y-6 font-light text-gray-600 text-xl leading-relaxed">
                <p>
                  As a local family business, we've spent decades working in the{" "}
                  <span className="font-semibold text-gray-900">
                    {cityName}
                  </span>{" "}
                  area. We understand that your home is your biggest investment,
                  and in {county} County, that investment faces a lot of
                  environmental stress.
                </p>
                <p>
                  Whether you're living in a quiet neighborhood near the city
                  center or a more rural part of {cityName}, your gutter system
                  needs to be able to handle Michigan's heavy spring rains and
                  the weight of winter ice.
                </p>
                <p>
                  At BTG Gutters, we specialize in{" "}
                  <span className="font-semibold text-gray-900">
                    seamless aluminum gutters
                  </span>{" "}
                  that are custom-fabricated right in your {cityName} driveway.
                  This "no-seam" design eliminates the most common leak points,
                  ensuring water stays away from your foundation and out of your
                  basement.
                </p>
              </div>

              <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Navigation className="h-20 w-20 rotate-12" />
                </div>
                <h3 className="relative z-10 mb-4 font-bold text-2xl">
                  Service Coverage in {cityName}
                </h3>
                <p className="relative z-10 mb-6 text-gray-300">
                  We serve all neighborhoods and districts across{" "}
                  <span className="font-semibold text-green-400">
                    {cityName}
                  </span>
                  . No job is too small for our dedicated father-and-son team.
                </p>
                <Link
                  className="inline-flex items-center gap-2 font-bold text-green-400 transition-colors hover:text-green-300"
                  to="/service-areas"
                >
                  View Full Service Area Map
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                {/* Visual Decoration */}
                <div className="absolute -top-10 -right-10 h-40 w-40 animate-blob rounded-full bg-green-100 opacity-70 mix-blend-multiply blur-2xl filter" />
                <div className="animation-delay-2000 absolute -bottom-10 -left-10 h-40 w-40 animate-blob rounded-full bg-yellow-100 opacity-70 mix-blend-multiply blur-2xl filter" />

                <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
                  <div className="bg-green-700 p-8 text-white">
                    <h3 className="mb-2 font-bold text-2xl">
                      Why {cityName} Trusts Us
                    </h3>
                    <p className="text-green-100 opacity-80">
                      22+ Years Combined Experience
                    </p>
                  </div>
                  <div className="space-y-6 p-8">
                    {[
                      {
                        title: "Custom Fabrication",
                        desc: "Gutters made on-site for a perfect fit.",
                      },
                      {
                        title: "Premium Materials",
                        desc: "Heavy-gauge aluminum that won't rust.",
                      },
                      {
                        title: "Honest Pricing",
                        desc: "No sales pressure, just honest quotes.",
                      },
                      {
                        title: "Spotless Cleanup",
                        desc: "We leave your home cleaner than we found it.",
                      },
                    ].map((item, i) => (
                      <div className="flex gap-4" key={i}>
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-8 pb-8">
                    <Link
                      className="block w-full rounded-xl bg-gray-900 py-4 text-center font-bold text-white shadow-lg transition-colors hover:bg-gray-800"
                      hash="quote"
                      onClick={() =>
                        trackCTAClick(
                          "city_page",
                          `Get My Free ${cityName} Quote`
                        )
                      }
                      to="/"
                    >
                      Get My Free {cityName} Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-gray-100 border-y bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-16 max-w-3xl">
            <h2 className="mb-6 font-extrabold text-4xl text-gray-900 tracking-tight md:text-5xl">
              Complete Gutter Solutions for{" "}
              <span className="text-green-700">{cityName}</span>
            </h2>
            <p className="font-light text-gray-600 text-xl">
              From historic homes to modern commercial buildings in {cityName},
              we have the expertise to handle any project.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, _i) => (
              <div
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
                key={service.title}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-green-50 transition-transform group-hover:scale-150" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl bg-green-100 p-4 text-green-700 shadow-inner transition-colors group-hover:bg-green-700 group-hover:text-white">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-gray-900">
                    {service.title}
                  </h3>
                  <p className="font-light text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700 transition-colors hover:text-green-800"
                    params={{ city: citySlug, service: service.slug }}
                    to="/service-areas/$city/$service"
                  >
                    View {service.title} in {cityName}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="relative scroll-mt-24" id="quote">
        <QuoteForm />
      </section>

      {/* Nearby Service Areas */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-10 font-bold text-2xl text-gray-900">
              Also Serving Neighbors Near {cityName}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {nearbyCities.map((area) => (
                <Link
                  className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-green-50 hover:text-green-700 hover:shadow-md"
                  key={area.name}
                  params={{ city: slugify(area.name) }}
                  to="/service-areas/$city"
                >
                  {area.name}, MI
                </Link>
              ))}
              <Link
                className="rounded-xl border border-green-100 bg-green-50 px-6 py-3 font-bold text-green-700 transition-all hover:bg-green-100"
                to="/service-areas"
              >
                View All Service Areas &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                name: "Service Areas",
                item: "https://btggutters.com/service-areas",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${cityName}, MI`,
                item: `https://btggutters.com/service-areas/${slugify(cityName)}`,
              },
            ],
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
