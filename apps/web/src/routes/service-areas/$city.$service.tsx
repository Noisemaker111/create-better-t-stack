import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, MapPin, Phone } from "lucide-react";

function formatCityName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const serviceContent = {
  installation: {
    title: "Seamless Gutter Installation",
    summary:
      "Custom-fabricated seamless gutters designed for long-term performance in Michigan weather.",
    route: "/services/installation",
  },
  repair: {
    title: "Gutter Repair",
    summary:
      "Targeted repairs for leaks, slope issues, loose hangers, and damaged gutter sections.",
    route: "/services/repair",
  },
  "leaf-guards": {
    title: "Leaf Guards",
    summary:
      "Gutter protection systems that reduce clogging from leaves, seeds, and roof debris.",
    route: "/services/leaf-guards",
  },
  "soffit-fascia": {
    title: "Soffit & Fascia",
    summary:
      "Repair and replacement of soffit and fascia to protect roof edges and support gutter systems.",
    route: "/services/soffit-fascia",
  },
  commercial: {
    title: "Commercial Gutters",
    summary:
      "Commercial gutter solutions for mixed-use and business properties with durable materials.",
    route: "/services/commercial",
  },
} as const;

const COMPANY = {
  name: "BTG Gutters",
  phone: "+1-248-561-7790",
  url: "https://btggutters.com",
  locality: "Garden City",
  region: "MI",
  country: "US",
} as const;

type ServiceSlug = keyof typeof serviceContent;

function isServiceSlug(value: string): value is ServiceSlug {
  return value in serviceContent;
}

export const Route = createFileRoute("/service-areas/$city/$service")({
  component: CityServicePage,
  head: ({ params }) => {
    const cityName = formatCityName(params.city);
    const serviceTitle = isServiceSlug(params.service)
      ? serviceContent[params.service].title
      : "Gutter Services";

    return {
      meta: [
        {
          title: `${serviceTitle} in ${cityName}, MI | BTG Gutters`,
        },
        {
          name: "description",
          content: `Explore ${serviceTitle.toLowerCase()} options in ${cityName}, MI from BTG Gutters. Family-owned local service with free estimates.`,
        },
        {
          property: "og:title",
          content: `${serviceTitle} in ${cityName}, MI | BTG Gutters`,
        },
        {
          property: "og:description",
          content: `Local ${serviceTitle.toLowerCase()} in ${cityName}, MI from BTG Gutters. Request your free estimate.`,
        },
      ],
    };
  },
});

function CityServicePage() {
  const { city, service } = Route.useParams();
  const cityName = formatCityName(city);

  if (!isServiceSlug(service)) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-bold text-3xl text-gray-900">
            Service Not Found
          </h1>
          <p className="mt-3 text-gray-600">
            We could not find that service page for {cityName}.
          </p>
          <Link className="mt-6 inline-flex text-green-700" to="/service-areas">
            Back to Service Areas
          </Link>
        </div>
      </section>
    );
  }

  const content = serviceContent[service];
  const canonicalUrl = `${COMPANY.url}/service-areas/${city}/${service}`;

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-950 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <MapPin className="h-4 w-4" /> {cityName}, Michigan
          </p>
          <h1 className="max-w-4xl font-bold text-4xl md:text-5xl">
            {content.title} in {cityName}
          </h1>
          <p className="mt-4 max-w-3xl text-green-100 text-lg">
            {content.summary}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-bold text-2xl text-gray-900 md:text-3xl">
              What We Offer in {cityName}
            </h2>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                Service recommendations based on your home or building layout.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                Clear scope and pricing before work begins.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                Professional installation or repair with cleanup included.
              </li>
            </ul>

            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-800"
              to={content.route}
            >
              View Full {content.title} Service Page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <aside className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <h3 className="font-semibold text-gray-900">Need a Quote?</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Tell us about your project in {cityName}, and we will follow up
              with next steps.
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700"
              href="tel:+12485617790"
            >
              <Phone className="h-4 w-4" /> (248) 561-7790
            </a>
            <Link
              className="mt-4 block font-medium text-green-700 underline"
              hash="quote"
              to="/"
            >
              Request Free Estimate
            </Link>
          </aside>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${content.title} in ${cityName}, MI`,
            serviceType: content.title,
            description: content.summary,
            areaServed: {
              "@type": "City",
              name: `${cityName}, MI`,
            },
            provider: {
              "@type": "LocalBusiness",
              name: COMPANY.name,
              url: COMPANY.url,
              telephone: COMPANY.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: COMPANY.locality,
                addressRegion: COMPANY.region,
                addressCountry: COMPANY.country,
              },
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              description: "Free estimates available",
              url: canonicalUrl,
            },
          }),
        }}
        type="application/ld+json"
      />

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
                item: `${COMPANY.url}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Service Areas",
                item: `${COMPANY.url}/service-areas`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${cityName}, MI`,
                item: `${COMPANY.url}/service-areas/${city}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: content.title,
                item: canonicalUrl,
              },
            ],
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
