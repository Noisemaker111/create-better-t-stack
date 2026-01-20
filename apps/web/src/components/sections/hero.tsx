import { Award, CheckCircle, Clock, Phone, Shield, Star } from "lucide-react";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";
import QuoteFormContent from "./quote-form-content";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-green-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Gutter Installation"
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
          src="/images/hero-bg.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/80 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute right-[10%] -bottom-[10%] h-[30%] w-[30%] animate-pulse rounded-full bg-green-400/10 blur-[100px] delay-700" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-white lg:col-span-7">
            {/* Trust Badge */}
            <div className="inline-flex animate-fade-up items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
              <div className="flex">
                {[...new Array(5)].map((_, i) => (
                  <Star
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    key={i}
                  />
                ))}
              </div>
              <span className="font-bold text-sm uppercase tracking-wide">
                5.0 Google Rating
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="font-medium text-green-300 text-sm">
                Garden City's #1 Gutter Team
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up font-black text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
              style={{ animationDelay: "100ms" }}
            >
              Premium Seamless <br />
              <span className="bg-gradient-to-r from-[#1eeb00] to-green-400 bg-clip-text text-transparent">
                Gutter Installation
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="max-w-2xl animate-fade-up text-green-50/80 text-xl leading-relaxed md:text-2xl"
              style={{ animationDelay: "200ms" }}
            >
              Protect your legacy from water damage. Family-owned, father-son
              team with 22+ years of Michigan roofing & gutter expertise.
            </p>

            {/* Value Props */}
            <div
              className="grid animate-fade-up grid-cols-1 gap-6 sm:grid-cols-3"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/20">
                  <Shield className="h-5 w-5 text-[#1eeb00]" />
                </div>
                <span className="font-semibold text-lg">100% Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/20">
                  <Award className="h-5 w-5 text-[#1eeb00]" />
                </div>
                <span className="font-semibold text-lg">4-Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/20">
                  <Clock className="h-5 w-5 text-[#1eeb00]" />
                </div>
                <span className="font-semibold text-lg">Same-Week Quotes</span>
              </div>
            </div>

            {/* Mobile CTAs (Only on small screens) */}
            <div
              className="flex animate-fade-up flex-col gap-4 sm:hidden"
              style={{ animationDelay: "400ms" }}
            >
              <a
                className="inline-flex items-center justify-center rounded-xl bg-[#1eeb00] px-8 py-5 font-black text-black text-lg shadow-xl transition-all hover:bg-[#19c600] active:scale-95"
                href="#quote"
                onClick={() =>
                  trackCTAClick("hero_mobile", "Get My Free Estimate")
                }
              >
                Get My Free Estimate
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-5 font-bold text-lg text-white backdrop-blur-md transition-all hover:bg-white/10"
                href={PHONE_LINK}
                onClick={() => trackPhoneClick("hero_mobile")}
              >
                <Phone className="h-5 w-5" />
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Reviews Proof */}
            <div
              className="flex animate-fade-up items-center gap-4 pt-4"
              style={{ animationDelay: "500ms" }}
            >
              <p className="font-medium text-green-100/60 text-sm">
                Join{" "}
                <span className="font-bold text-white">
                  40+ happy homeowners
                </span>{" "}
                in Garden City
              </p>
            </div>
          </div>

          {/* Right Column - Quote Form Card */}
          <div
            className="relative animate-fade-up lg:col-span-5"
            style={{ animationDelay: "400ms" }}
          >
            {/* Background Glow */}
            <div className="absolute -inset-10 rounded-full bg-green-500/20 blur-[100px]" />

            <div className="relative rounded-3xl border border-white/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

                <div className="mb-4">
                  <h3 className="font-black text-3xl text-gray-900 tracking-tight">
                    Get Your Free Quote
                  </h3>
                </div>

              <QuoteFormContent />

              <div className="mt-6 flex items-center justify-center gap-6 border-gray-100 border-t pt-4">
                <div className="flex flex-col items-center">
                  <div className="mb-1 flex">
                    {[...new Array(5)].map((_, i) => (
                      <Star
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        key={i}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                    Google
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-100" />
                <div className="flex flex-col items-center">
                  <CheckCircle className="mb-1 h-5 w-5 text-green-500" />
                  <span className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                    Insured
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-100" />
                <div className="flex flex-col items-center">
                  <Award className="mb-1 h-5 w-5 text-blue-500" />
                  <span className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                    Warranty
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
