import type { LucideIcon } from "lucide-react";
import { Award, CheckCircle, Phone, Shield, Star } from "lucide-react";
import { CTABanner } from "@/components/sections";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices?: {
    name: string;
    href: string;
  }[];
}

// Helper function to create SEO head configuration
export function createServiceHead({
  pageTitle,
  metaDescription,
  keywords,
}: {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
}) {
  return () => ({
    meta: [
      {
        title: `${pageTitle} | BTG Gutters`,
      },
      {
        name: "description",
        content: metaDescription,
      },
      {
        name: "keywords",
        content: keywords,
      },
      {
        property: "og:title",
        content: `${pageTitle} | BTG Gutters`,
      },
      {
        property: "og:description",
        content: metaDescription,
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
        content: `${pageTitle} | BTG Gutters`,
      },
      {
        name: "twitter:description",
        content: metaDescription,
      },
    ],
  });
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  benefits,
  faqs,
  relatedServices,
}: ServicePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="text-white">
              <div className="mb-6 inline-flex rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <Icon className="h-10 w-10" />
              </div>
              <h1 className="mb-4 font-bold text-4xl md:text-5xl">{title}</h1>
              <p className="mb-6 text-green-100 text-xl">{subtitle}</p>
              <p className="mb-8 text-green-200">{description}</p>

              {/* Trust Signals */}
              <div className="mb-8 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>100% Insured</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <Award className="h-5 w-5 text-green-400" />
                  <span>4-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>5.0 Rating</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-lg bg-[#1eeb00] px-8 py-4 font-bold text-black text-lg shadow-lg transition-all hover:bg-[#19c600]"
                  href="/#quote"
                  onClick={() =>
                    trackCTAClick("service_page", "Get Free Estimate")
                  }
                >
                  Get Free Estimate
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-lg text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  href={PHONE_LINK}
                  onClick={() => trackPhoneClick("service_page")}
                >
                  <Phone className="h-5 w-5" />
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* Features List */}
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white p-8">
                <h3 className="mb-6 font-bold text-gray-900 text-xl">
                  What's Included
                </h3>
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div className="flex items-start gap-3" key={feature}>
                      <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features */}
      <section className="bg-green-50 py-8 lg:hidden">
        <div className="container mx-auto px-4">
          <h3 className="mb-4 font-bold text-gray-900 text-lg">
            What's Included
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                className="flex items-center gap-2 rounded-lg bg-white p-3"
                key={feature}
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              Why Choose BTG Gutters?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Experience the difference of working with a family-owned company
              that truly cares.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                className="rounded-xl border border-gray-100 p-6 transition-all hover:border-green-200 hover:shadow-md"
                key={benefit.title}
              >
                <h3 className="mb-2 font-bold text-gray-900 text-xl">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
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
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Contact Us",
                  desc: "Call or fill out our form",
                },
                {
                  step: "2",
                  title: "Free Estimate",
                  desc: "We assess your needs",
                },
                {
                  step: "3",
                  title: "Schedule",
                  desc: "Pick a convenient time",
                },
                {
                  step: "4",
                  title: "Completion",
                  desc: "Quality work, clean site",
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  className="rounded-xl border border-gray-200 bg-white p-6"
                  key={index}
                >
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Structured Data for Rich Results */}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
          type="application/ld+json"
        />

        {/* Service Structured Data */}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: title,
              description,
              provider: {
                "@type": "LocalBusiness",
                name: "BTG Gutters",
                url: "https://btggutters.com",
                telephone: "+1-248-561-7790",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Garden City",
                  addressRegion: "MI",
                  addressCountry: "US",
                },
              },
              areaServed: {
                "@type": "Place",
                name: "Southeast Michigan",
              },
              serviceType: title,
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                description: "Free estimates available",
              },
            }),
          }}
          type="application/ld+json"
        />

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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: title,
                  item: `https://btggutters.com/services/${title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")}`,
                },
              ],
            }),
          }}
          type="application/ld+json"
        />
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h3 className="mb-6 text-center font-bold text-gray-900 text-xl">
              Related Services
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedServices.map((service) => (
                <a
                  className="rounded-lg bg-white px-6 py-3 font-medium text-green-700 shadow-sm transition-all hover:bg-green-50 hover:shadow-md"
                  href={service.href}
                  key={service.name}
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner />
    </>
  );
}
