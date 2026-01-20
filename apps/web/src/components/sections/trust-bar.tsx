import { Award, CheckCircle, Clock, Shield, Star, Users } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "100% Insured",
    description: "Licensed & Bonded",
  },
  {
    icon: Award,
    title: "4-Year Warranty",
    description: "Parts & Labor",
  },
  {
    icon: Users,
    title: "Family Owned",
    description: "Father & Son Team",
  },
  {
    icon: Clock,
    title: "22+ Years Exp.",
    description: "Local Experts",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction",
    description: "100% Guaranteed",
  },
  {
    icon: Star,
    title: "5-Star Rated",
    description: "40+ Real Reviews",
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-4">
      <div className="rounded-2xl border border-green-50 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item, index) => (
            <div
              className={`group flex flex-col items-center text-center ${
                index !== trustItems.length - 1
                  ? "border-gray-100 lg:border-r"
                  : ""
              }`}
              key={item.title}
            >
              <div className="mb-4 rounded-2xl bg-green-50 p-3 text-green-600 transition-colors group-hover:bg-[#1eeb00] group-hover:text-black">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-black text-gray-900 text-sm uppercase leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
