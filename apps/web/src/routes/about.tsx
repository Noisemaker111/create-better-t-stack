import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  Clock,
  Heart,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { CTABanner } from "@/components/sections";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title:
          "About BTG Gutters | Family-Owned Gutter Company in Garden City, MI",
      },
      {
        name: "description",
        content:
          "Learn about BTG Gutters, a father-son team with 22+ years of experience providing quality gutter installation and repair services in Garden City, MI and Southeast Michigan.",
      },
      {
        name: "keywords",
        content:
          "about BTG Gutters, family owned gutter company, gutter experts Garden City MI, father son team, experienced gutter contractors",
      },
      {
        property: "og:title",
        content:
          "About BTG Gutters | Family-Owned Gutter Company in Garden City, MI",
      },
      {
        property: "og:description",
        content:
          "Meet the father-son team at BTG Gutters. 22+ years of experience providing honest, quality gutter services to Southeast Michigan.",
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
          "About BTG Gutters | Family-Owned Gutter Company in Garden City, MI",
      },
      {
        name: "twitter:description",
        content:
          "Learn about our family-owned gutter company with 22+ years of experience serving Southeast Michigan.",
      },
    ],
  }),
});

const values = [
  {
    icon: Heart,
    title: "Honesty First",
    description:
      "We'll always tell you what you actually need, even if it means less business for us. Your trust matters more than a quick sale.",
  },
  {
    icon: Users,
    title: "Family Values",
    description:
      "As a father and son team, we bring family values to every job. We treat your home like we'd treat our own.",
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description:
      "With 22+ years of roofing and gutter experience, we know what works. We use premium materials and proven techniques.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "When we say we'll be there, we'll be there. We respect your time and keep our commitments.",
  },
];

const stats = [
  { value: "22+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "5.0", label: "Star Rating" },
  { value: "100%", label: "Satisfaction Rate" },
];

function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
              About Us
            </span>
            <h1 className="mb-6 font-bold text-4xl md:text-5xl">
              A Family Business Built on Trust
            </h1>
            <p className="text-green-100 text-xl">
              BTG Gutters is a father and son team proudly serving Garden City,
              MI and the surrounding areas with quality gutter services.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image/Visual */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-green-200">
                <img
                  alt="BTG Gutters - Professional Gutter Installation"
                  className="h-full w-full object-cover"
                  src="/images/gallery/002.jpg"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-6 -bottom-6 rounded-xl bg-white p-4 shadow-xl lg:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">100% Insured</p>
                    <p className="text-gray-600 text-sm">Never filed a claim</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div>
              <span className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 font-medium text-green-800 text-sm">
                Our Story
              </span>
              <h2 className="mb-6 font-bold text-3xl text-gray-900 md:text-4xl">
                22 Years of Experience, One Family's Commitment
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  BTG Gutters was born from a simple belief: homeowners deserve
                  honest, quality service at a fair price. As a father who spent
                  22 years working as a roofer, I learned firsthand how
                  important gutters are to protecting a home. That experience
                  drove me to start BTG Gutters with my son.
                </p>
                <p>
                  We're not a big corporation with fancy marketing budgets and
                  commission-driven salespeople. We're a small family business
                  that takes personal pride in every project. When you call BTG
                  Gutters, you're talking to the same people who will show up at
                  your door and do the work.
                </p>
                <p>
                  We've made a promise to always be honest with our customers.
                  If you don't need new gutters, we'll tell you. If a simple
                  repair will solve your problem, that's what we'll recommend.
                  We'd rather earn your trust and your referrals than make a
                  quick buck.
                </p>
                <p className="font-medium text-gray-800">
                  "We treat every home like it's our own. That's not just a
                  slogan – it's how we were raised and how we do business."
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  className="inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                  href="#quote"
                >
                  Get Your Free Quote
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-green-700 px-6 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
                  href={PHONE_LINK}
                >
                  <Phone className="h-5 w-5" />
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div className="text-center" key={stat.label}>
                <p className="font-bold text-4xl text-green-800 md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 font-medium text-green-800 text-sm">
              Our Values
            </span>
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              What We Stand For
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              These aren't just words on a page – they're principles we live by
              every day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div
                className="flex gap-4 rounded-xl border border-gray-100 p-6 transition-all hover:border-green-200 hover:shadow-md"
                key={value.title}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <value.icon className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 text-xl">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              What Sets Us Apart
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Father was a roofer for 22 years",
                "100% insured - never filed a claim",
                "4-year warranty on all new gutters",
                "Same-week estimates, next-week installation",
                "50+ color options available",
                "Concealed hangers every 12-18 inches",
                '5" or 6" seamless aluminum gutters',
                "No payment until you're satisfied",
                "We clean up better than we found it",
                "Honest pricing - no hidden fees",
                "Family-owned, locally operated",
                "Emergency services available",
              ].map((item) => (
                <div
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                  key={item}
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-green-900 p-8 text-center text-white md:p-12">
            <div className="mb-4 flex justify-center">
              {[...new Array(5)].map((_, i) => (
                <Star
                  className="h-8 w-8 fill-yellow-400 text-yellow-400"
                  key={i}
                />
              ))}
            </div>
            <blockquote className="mb-6 text-xl italic md:text-2xl">
              "Best gutter company I've ever worked with. They were honest about
              what we actually needed and saved us money. The father-son team is
              fantastic!"
            </blockquote>
            <p className="text-green-200">— Robert T., Livonia, MI</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
