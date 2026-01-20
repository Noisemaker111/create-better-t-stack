import { ArrowRight, Clock, Phone, Shield, Star } from "lucide-react";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-green-600/20 to-transparent" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#1eeb00]/10 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-12 rounded-2xl border border-white/10 bg-gradient-to-r from-green-700 to-green-900 p-8 text-center shadow-2xl md:p-12 lg:flex-row lg:text-left">
          {/* Text Content */}
          <div className="max-w-2xl text-white">
            <h2 className="mb-6 font-black text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Don't Wait For <br />
              <span className="text-[#1eeb00]">The Next Storm</span>
            </h2>
            <p className="font-medium text-green-100 text-xl leading-relaxed">
              Join 40+ protected Michigan homeowners. Get your free, no-pressure
              estimate today and secure your spot for next week.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm lg:justify-start">
              <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
                <Shield className="h-5 w-5 text-[#1eeb00]" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
                <Clock className="h-5 w-5 text-blue-300" />
                <span>24H Response</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            <a
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1eeb00] px-10 py-6 font-black text-black text-xl shadow-xl transition-all hover:bg-[#19c600] active:scale-95"
              href="#quote"
              onClick={() => trackCTAClick("cta_banner", "Get Free Quote")}
            >
              Get Free Quote
              <ArrowRight className="h-6 w-6" />
            </a>
            <a
              className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-10 py-6 font-bold text-white text-xl backdrop-blur-md transition-all hover:bg-white/10"
              href={PHONE_LINK}
              onClick={() => trackPhoneClick("cta_banner")}
            >
              <Phone className="h-6 w-6" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
