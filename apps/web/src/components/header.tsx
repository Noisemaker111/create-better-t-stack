import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, Star, X } from "lucide-react";
import { useState } from "react";
import {
  trackCTAClick,
  trackMobileMenuToggle,
  trackNavClick,
  trackPhoneClick,
  trackServicesDropdownOpen,
} from "@/lib/analytics";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

const services = [
  { name: "Gutter Installation & Replacement", href: "/services/installation" },
  { name: "Gutter Repair", href: "/services/repair" },
  { name: "Leaf Guards & Gutter Guards", href: "/services/leaf-guards" },
  { name: "Soffit & Fascia Repairs", href: "/services/soffit-fascia" },
  { name: "Commercial Gutters", href: "/services/commercial" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Gallery", href: "/gallery" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="hidden bg-green-900 text-green-100 md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">5.0</span>
              <span className="text-green-300">| 40+ Reviews</span>
            </span>
            <span className="text-green-300">|</span>
            <span>Serving Garden City, MI & Surrounding Areas</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-green-300">
              Mon-Fri: 8AM-9PM | Sat-Sun: 9AM-8PM
            </span>
            <a
              className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-green-200"
              href={PHONE_LINK}
              onClick={() => trackPhoneClick("header")}
            >
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 border-green-200/50 border-b bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link className="flex items-center gap-3" to="/">
              <img
                alt="BTG Gutters Logo"
                className="h-10 w-auto lg:h-12"
                src="/images/logo.png"
              />
              <div className="flex flex-col">
                <span className="font-bold text-green-900 text-lg lg:text-xl">
                  BTG Gutters
                </span>
                <span className="hidden text-green-700 text-xs sm:block">
                  Garden City, MI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <div className="relative" key={link.name}>
                  {link.hasDropdown ? (
                    <div
                      className="group relative"
                      onMouseEnter={() => {
                        setServicesOpen(true);
                        trackServicesDropdownOpen();
                      }}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className="flex items-center gap-1 rounded-lg px-4 py-2 font-medium text-green-900 transition-colors hover:bg-green-50 hover:text-green-700"
                        onClick={() => {
                          setServicesOpen(!servicesOpen);
                          if (!servicesOpen) {
                            trackServicesDropdownOpen();
                          }
                        }}
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-green-100 bg-white py-2 shadow-lg transition-all ${
                          servicesOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                        }`}
                      >
                        {services.map((service) => (
                          <a
                            className="block px-4 py-2 text-green-800 text-sm transition-colors hover:bg-green-50 hover:text-green-900"
                            href={service.href}
                            key={service.name}
                          >
                            {service.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : link.href === "/" ? (
                    <Link
                      className="rounded-lg px-4 py-2 font-medium text-green-900 transition-colors hover:bg-green-50 hover:text-green-700"
                      to="/"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      className="rounded-lg px-4 py-2 font-medium text-green-900 transition-colors hover:bg-green-50 hover:text-green-700"
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                className="flex items-center gap-2 font-semibold text-green-800 transition-colors hover:text-green-600"
                href={PHONE_LINK}
                onClick={() => trackPhoneClick("header")}
              >
                <Phone className="h-5 w-5" />
                {PHONE_NUMBER}
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1eeb00] px-6 font-semibold text-black transition-colors hover:bg-[#19c600]"
                href="/#quote"
                onClick={() => trackCTAClick("header", "Get Free Quote")}
              >
                Get Free Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                aria-label="Call us"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white"
                href={PHONE_LINK}
                onClick={() => trackPhoneClick("header")}
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-green-900"
                onClick={() => {
                  const newState = !mobileMenuOpen;
                  setMobileMenuOpen(newState);
                  trackMobileMenuToggle(newState);
                }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`border-green-100 border-t bg-white lg:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-green-900 transition-colors hover:bg-green-50"
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {servicesOpen && (
                        <div className="mt-1 ml-4 flex flex-col gap-1 border-green-200 border-l-2 pl-4">
                          {services.map((service) => (
                            <a
                              className="rounded-lg px-4 py-2 text-green-700 text-sm transition-colors hover:bg-green-50 hover:text-green-900"
                              href={service.href}
                              key={service.name}
                              onClick={() => {
                                trackNavClick(service.name, "mobile_menu");
                                setMobileMenuOpen(false);
                              }}
                            >
                              {service.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.href === "/" ? (
                    <Link
                      className="block rounded-lg px-4 py-3 font-medium text-green-900 transition-colors hover:bg-green-50"
                      onClick={() => setMobileMenuOpen(false)}
                      to="/"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      className="block rounded-lg px-4 py-3 font-medium text-green-900 transition-colors hover:bg-green-50"
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-4 border-green-100 border-t pt-4">
              <a
                className="flex w-full items-center justify-center rounded-lg bg-[#1eeb00] py-4 font-semibold text-black text-lg transition-colors hover:bg-[#19c600]"
                href="/#quote"
                onClick={() =>
                  trackCTAClick("hero_mobile", "Get Your Free Quote")
                }
              >
                Get Your Free Quote
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
