import { Award, Clock, DollarSign, Heart, Users, Wrench } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Family-Owned Business",
    description:
      "We're a father and son team who take personal pride in every project. When you hire us, you're not getting random contractors - you're getting family.",
  },
  {
    icon: Award,
    title: "22+ Years of Experience",
    description:
      "Our father's 22 years as a roofer means we understand how gutters work with your entire roofing system. We know a thing or two about what your home needs.",
  },
  {
    icon: Heart,
    title: "Honest & Transparent",
    description:
      "We'll always be upfront about what you need - even if it means we don't get the job. We value long-term relationships over quick sales.",
  },
  {
    icon: DollarSign,
    title: "Affordable, Not Cheap",
    description:
      "We offer competitive pricing without cutting corners. Quality materials, professional installation, and fair rates - that's our promise.",
  },
  {
    icon: Wrench,
    title: "Quality Craftsmanship",
    description:
      "Concealed hangers every 12-18 inches, high-quality aluminum, 50+ color options - we use the best materials and techniques in the industry.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable",
    description:
      "Free estimate within a week, installation the next week. We respect your time and keep our appointments. No long waits or missed calls.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 font-medium text-green-800 text-sm">
            Why BTG Gutters
          </span>
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            The BTG Difference
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            When you choose BTG Gutters, you're choosing a team that treats your
            home like our own.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              className="group rounded-xl border border-gray-100 p-6 transition-all hover:border-green-200 hover:bg-green-50/50 hover:shadow-md"
              key={reason.title}
            >
              <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3 transition-colors group-hover:bg-green-200">
                <reason.icon className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 text-xl">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-700 to-green-800 p-8 text-center text-white md:p-12">
          <blockquote className="mb-4 font-medium text-2xl italic md:text-3xl">
            "We treat every home like it's our own"
          </blockquote>
          <p className="text-green-200">— Mike & Son, BTG Gutters</p>
        </div>
      </div>
    </section>
  );
}
