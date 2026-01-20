import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { CTABanner } from "@/components/sections";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

export const Route = createFileRoute("/service-areas/")({
  component: ServiceAreasPage,
  head: () => ({
    meta: [
      {
        title:
          "Service Areas | BTG Gutters | Gutter Services in Southeast Michigan",
      },
      {
        name: "description",
        content:
          "BTG Gutters proudly serves Garden City, Livonia, Westland, Dearborn, and all of Southeast Michigan. See our full service area and get a free quote today.",
      },
    ],
  }),
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

const serviceAreas = [
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

const servicesByCity = [
  "Seamless gutter installation",
  "Gutter repair and maintenance",
  "Leaf guard installation",
  "Soffit and fascia repair",
  "Commercial gutter services",
  "Emergency gutter repairs",
];

function ServiceAreasPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
              Service Areas
            </span>
            <h1 className="mb-6 font-bold text-4xl md:text-5xl">
              Proudly Serving Southeast Michigan
            </h1>
            <p className="text-green-100 text-xl">
              Based in Garden City, BTG Gutters provides professional gutter
              services throughout Wayne, Oakland, and Macomb counties.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Map */}
            <div className="relative overflow-hidden rounded-2xl bg-green-100">
              <div className="aspect-square lg:aspect-auto lg:h-full">
                <iframe
                  allowFullScreen
                  className="absolute inset-0"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189154.65769273!2d-83.5!3d42.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b4e9d12b9b28d%3A0x4ebae67e10b24803!2sGarden%20City%2C%20MI%2048135!5e0!3m2!1sen!2sus!4v1234567890"
                  style={{ border: 0, minHeight: "500px" }}
                  title="BTG Gutters Service Area Map"
                  width="100%"
                />
              </div>
            </div>

            {/* Cities List */}
            <div>
              <h2 className="mb-6 font-bold text-2xl text-gray-900 md:text-3xl">
                Cities We Serve
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {serviceAreas.map((area) => (
                  <Link
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all hover:scale-[1.02] ${
                      area.highlight
                        ? "bg-green-700 font-semibold text-white shadow-md hover:bg-green-800"
                        : "border border-green-100 bg-green-50 text-gray-700 hover:bg-green-100"
                    }`}
                    key={area.name}
                    params={{ city: slugify(area.name) }}
                    to="/service-areas/$city"
                  >
                    <MapPin
                      className={`h-4 w-4 flex-shrink-0 ${area.highlight ? "text-green-200" : "text-green-500"}`}
                    />
                    <span className="text-sm">{area.name}</span>
                  </Link>
                ))}
              </div>

              {/* Not Listed */}
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Don't see your city listed?
                </h3>
                <p className="mb-4 text-gray-600">
                  We serve all of Southeast Michigan! If your city isn't listed
                  above, give us a call to confirm service availability in your
                  area.
                </p>
                <a
                  className="inline-flex items-center gap-2 font-semibold text-green-700 transition-colors hover:text-green-800"
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

      {/* Services Available */}
      <section className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
              Services Available in All Areas
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              No matter where you are in our service area, you'll receive the
              same high-quality gutter services and professional craftsmanship.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {servicesByCity.map((service) => (
                <div
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                  key={service}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="font-medium text-gray-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-bold text-3xl text-gray-900 md:text-4xl">
              Why Choose a Local Gutter Company?
            </h2>
            <div className="space-y-6 text-left text-gray-600">
              <p>
                <strong className="text-gray-900">
                  We know Michigan weather.
                </strong>{" "}
                Our team understands the unique challenges that Michigan's harsh
                winters, heavy rains, and fall leaves present for your gutter
                system. We design and install gutters that can handle it all.
              </p>
              <p>
                <strong className="text-gray-900">
                  We're part of your community.
                </strong>{" "}
                As a family-owned business based in Garden City, we take pride
                in serving our neighbors. Our reputation depends on doing great
                work for people in our own backyard.
              </p>
              <p>
                <strong className="text-gray-900">
                  We're here when you need us.
                </strong>{" "}
                Unlike national chains, we're local. That means faster response
                times, easier communication, and the kind of personalized
                service that only a local family business can provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
