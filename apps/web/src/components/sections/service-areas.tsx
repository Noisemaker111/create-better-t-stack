import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

const PHONE_LINK = "tel:+12485617790";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

const serviceAreas = [
  { name: "Garden City", highlight: true },
  { name: "Livonia", highlight: false },
  { name: "Westland", highlight: false },
  { name: "Dearborn", highlight: false },
  { name: "Dearborn Heights", highlight: false },
  { name: "Detroit", highlight: false },
  { name: "Canton", highlight: false },
  { name: "Plymouth", highlight: false },
  { name: "Redford", highlight: false },
  { name: "Farmington", highlight: false },
  { name: "Farmington Hills", highlight: false },
  { name: "Southfield", highlight: false },
  { name: "Novi", highlight: false },
  { name: "Northville", highlight: false },
  { name: "Wayne", highlight: false },
  { name: "Inkster", highlight: false },
  { name: "Taylor", highlight: false },
  { name: "Allen Park", highlight: false },
  { name: "Lincoln Park", highlight: false },
  { name: "Romulus", highlight: false },
  { name: "Belleville", highlight: false },
  { name: "Riverview", highlight: false },
  { name: "Southgate", highlight: false },
  { name: "Wyandotte", highlight: false },
  { name: "Ecorse", highlight: false },
  { name: "Melvindale", highlight: false },
  { name: "Oak Park", highlight: false },
  { name: "Sterling Heights", highlight: false },
  { name: "Clinton Township", highlight: false },
  { name: "Wixom", highlight: false },
];

export default function ServiceAreasSection() {
  return (
    <section className="bg-gradient-to-b from-green-50/50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 font-medium text-green-800 text-sm">
            Service Areas
          </span>
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            Proudly Serving Southeast Michigan
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Based in Garden City, we provide professional gutter services
            throughout the greater Detroit metro area.
          </p>
        </div>

        {/* Map + Areas Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map Placeholder */}
          <div className="relative overflow-hidden rounded-2xl bg-green-100">
            <div className="aspect-square lg:aspect-auto lg:h-full">
              {/* Google Maps Embed - Replace with actual embed */}
              <iframe
                allowFullScreen
                className="absolute inset-0"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94577.32884968925!2d-83.41716892089844!3d42.32534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b4e9d12b9b28d%3A0x4ebae67e10b24803!2sGarden%20City%2C%20MI%2048135!5e0!3m2!1sen!2sus!4v1234567890"
                style={{ border: 0, minHeight: "400px" }}
                title="BTG Gutters Service Area Map"
                width="100%"
              />
            </div>

            {/* Location Badge Overlay */}
            <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MapPin className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">BTG Gutters</p>
                  <p className="text-gray-600 text-sm">Garden City, MI 48135</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas List */}
          <div>
            <h3 className="mb-6 font-bold text-gray-900 text-xl">
              Cities We Serve
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <Link
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:scale-[1.02] ${
                    area.highlight
                      ? "bg-green-200 font-semibold text-green-900 shadow-sm"
                      : "border border-green-100 bg-green-50 text-gray-700 hover:bg-green-100"
                  }`}
                  key={area.name}
                  params={{ city: slugify(area.name) }}
                  to="/service-areas/$city"
                >
                  <MapPin
                    className={`h-4 w-4 ${area.highlight ? "text-green-700" : "text-green-500"}`}
                  />
                  <span className="text-sm">{area.name}</span>
                </Link>
              ))}
            </div>

            {/* Not Listed? */}
            <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
              <h4 className="mb-2 font-semibold text-gray-900">
                Don't see your city?
              </h4>
              <p className="mb-4 text-gray-600">
                We serve all of Southeast Michigan! Give us a call to confirm we
                service your area.
              </p>
              <a
                className="inline-flex items-center gap-2 font-semibold text-green-700 transition-colors hover:text-green-800"
                href={PHONE_LINK}
              >
                <Phone className="h-5 w-5" />
                (248) 561-7790
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
