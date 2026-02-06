import { CheckCircle, Clock, Phone, Shield } from "lucide-react";
import QuoteFormContent from "./quote-form-content";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";

const benefits = [
  { icon: CheckCircle, text: "Free, no-obligation estimate" },
  { icon: Clock, text: "Prompt follow-up" },
  { icon: Shield, text: "100% insured" },
];

export default function QuoteForm() {
  return (
    <section
      className="scroll-mt-24 bg-gradient-to-br from-green-700 to-green-900 py-16 md:py-24"
      id="quote"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="text-white">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 font-medium text-sm backdrop-blur-sm">
              Free Estimate
            </span>
            <h2 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
              Ready to Protect Your Home?
            </h2>
            <p className="mb-8 text-green-100 text-lg">
              Just your name and phone number. We&apos;ll follow up to discuss
              your project and schedule your free, no-pressure quote.
            </p>

            <div className="mb-8 space-y-4">
              {benefits.map((benefit) => (
                <div className="flex items-center gap-3" key={benefit.text}>
                  <benefit.icon className="h-6 w-6 text-green-200" />
                  <span className="text-green-100">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
              <p className="mb-2 text-green-100">
                Prefer to talk? Call or text:
              </p>
              <a
                className="flex items-center gap-3 font-bold text-2xl text-white transition-colors hover:text-green-200"
                href={PHONE_LINK}
              >
                <Phone className="h-8 w-8 text-green-300" />
                {PHONE_NUMBER}
              </a>
              <p className="mt-2 text-green-200 text-sm opacity-80">
                Mon-Fri: 8AM-9PM | Sat-Sun: 9AM-8PM
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            {/* Urgency Badge */}
            <div className="absolute top-0 right-0 rounded-bl-lg bg-yellow-400 px-3 py-1 font-bold text-[10px] text-black uppercase tracking-wider">
              Limited Availability
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-2xl text-gray-900">
                Get My Free Quote
              </h3>
              <p className="mt-1 text-gray-500 text-sm">
                Fill out the form below to get started.
              </p>
            </div>

            <QuoteFormContent />
          </div>
        </div>
      </div>
    </section>
  );
}
