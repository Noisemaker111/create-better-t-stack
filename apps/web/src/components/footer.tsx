import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Mail, MapPin, Phone } from "lucide-react";
import {
  trackCTAClick,
  trackEmailClick,
  trackMapsClick,
  trackPhoneClick,
  trackSocialClick,
} from "@/lib/analytics";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";
const EMAIL = "btggutters@gmail.com";
const EMAIL_LINK = "mailto:btggutters@gmail.com";
const ADDRESS = "Garden City, MI 48135";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/BTG+Gutters/@42.3289327,-83.3460617,15z/data=!4m6!3m5!1s0x883b4d8d12aea83b:0xb2f3bb14fe4ddd36!8m2!3d42.3289327!4d-83.3460617!16s%2Fg%2F11syf4sksd";
const FACEBOOK_LINK = "https://www.facebook.com/BTGgutters/";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

const services = [
  { name: "Gutter Installation", href: "/services/installation" },
  { name: "Gutter Repair", href: "/services/repair" },
  { name: "Leaf Guards", href: "/services/leaf-guards" },
  { name: "Soffit & Fascia", href: "/services/soffit-fascia" },
  { name: "Commercial Gutters", href: "/services/commercial" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Get Free Quote", href: "/#quote" },
];

const serviceAreas = [
  "Garden City",
  "Livonia",
  "Westland",
  "Dearborn",
  "Detroit",
  "Canton",
  "Plymouth",
  "Redford",
  "Farmington Hills",
  "Southfield",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-green-50">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 font-bold text-white">
                BTG
              </div>
              <span className="font-bold text-xl">BTG Gutters</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Family-owned gutter company proudly serving Garden City, MI and
              surrounding areas. Father & Son team with 22+ years of combined
              experience.
            </p>
            <div className="flex gap-3">
              <a
                aria-label="Visit our Facebook page"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 transition-colors hover:bg-green-700"
                href={FACEBOOK_LINK}
                onClick={() => trackSocialClick("facebook")}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                aria-label="View on Google Maps"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 transition-colors hover:bg-green-700"
                href={GOOGLE_MAPS_LINK}
                onClick={() => trackSocialClick("google_maps")}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-lg">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    className="text-green-200 transition-colors hover:text-white"
                    to={service.href as any}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className="text-green-200 transition-colors hover:text-white"
                    hash={
                      link.href.includes("#")
                        ? link.href.split("#")[1]
                        : undefined
                    }
                    to={link.href.split("#")[0] as any}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  className="flex items-center gap-3 text-green-200 transition-colors hover:text-white"
                  href={PHONE_LINK}
                  onClick={() => trackPhoneClick("footer")}
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="font-semibold">{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-3 text-green-200 transition-colors hover:text-white"
                  href={EMAIL_LINK}
                  onClick={() => trackEmailClick("footer")}
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-3 text-green-200 transition-colors hover:text-white"
                  href={GOOGLE_MAPS_LINK}
                  onClick={() => trackMapsClick("footer")}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{ADDRESS}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-green-200">
                <Clock className="h-5 w-5 flex-shrink-0 text-green-500" />
                <div className="text-sm">
                  <p>Mon-Fri: 8AM - 9PM</p>
                  <p>Sat-Sun: 9AM - 8PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-10 border-green-800 border-t pt-8">
          <h3 className="mb-4 text-center font-semibold text-lg">
            Service Areas
          </h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-green-200 text-sm">
            {serviceAreas.map((area, index) => (
              <span className="flex items-center" key={area}>
                <Link
                  className="transition-colors hover:text-white"
                  params={{ city: slugify(area) }}
                  to="/service-areas/$city"
                >
                  {area}, MI
                </Link>
                {index < serviceAreas.length - 1 && (
                  <span className="ml-4 text-green-600">|</span>
                )}
              </span>
            ))}
            <Link
              className="text-green-400 transition-colors hover:text-green-300"
              to="/service-areas"
            >
              + More Areas
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-green-800 border-t bg-green-950/80">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 text-center text-green-300 text-sm sm:flex-row sm:text-left">
          <p>&copy; {currentYear} BTG Gutters. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>100% Insured</span>
            <span className="text-green-600">|</span>
            <span>4-Year Warranty</span>
            <span className="text-green-600">|</span>
            <span>Free Estimates</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-green-700 border-t bg-green-900 p-3 shadow-lg md:hidden">
        <div className="flex gap-3">
          <a
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1eeb00] py-3 font-semibold text-black transition-colors hover:bg-[#19c600]"
            href={PHONE_LINK}
            onClick={() => trackPhoneClick("mobile_sticky")}
          >
            <Phone className="h-5 w-5" />
            Call or Text
          </a>
          <Link
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1eeb00] py-3 font-semibold text-black transition-colors hover:bg-[#19c600]"
            hash="quote"
            onClick={() => trackCTAClick("mobile_sticky", "Free Quote")}
            to="/"
          >
            Free Quote
          </Link>
        </div>
      </div>

      {/* Spacer for mobile sticky CTA */}
      <div className="h-[72px] md:hidden" />
    </footer>
  );
}
