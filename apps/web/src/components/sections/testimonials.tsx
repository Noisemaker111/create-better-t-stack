import { CheckCircle, Star } from "lucide-react";

// Google SVG Logo Component
function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const testimonials = [
  {
    name: "Sarah M.",
    location: "Garden City, MI",
    rating: 5,
    text: "Mr. Mike and his son did an amazing job replacing our gutters. They were punctual, professional, and the cleanup was spotless. Highly recommend!",
    service: "Gutter Replacement",
    date: "Verified Customer",
    image: "/images/gallery/058.jpg",
  },
  {
    name: "Robert T.",
    location: "Livonia, MI",
    rating: 5,
    text: "Best gutter company I've ever worked with. They were honest about what we actually needed and saved us money. The father-son team is fantastic!",
    service: "Gutter Installation",
    date: "Verified Customer",
    image: "/images/gallery/059.jpg",
  },
  {
    name: "Jennifer K.",
    location: "Westland, MI",
    rating: 5,
    text: "Quick service, fair pricing, and excellent work. They came out the same day I called for an estimate and installed the next week. Very impressed!",
    service: "Leaf Guards",
    date: "Verified Customer",
    image: "/images/gallery/050.jpg",
  },
  {
    name: "Michael D.",
    location: "Dearborn, MI",
    rating: 5,
    text: "They repaired water-damaged wood on my fascia that other companies wanted to charge a fortune for. Honest, affordable, and quality work.",
    service: "Fascia Repair",
    date: "Verified Customer",
    image: "/images/gallery/033.jpg",
  },
  {
    name: "Linda H.",
    location: "Canton, MI",
    rating: 5,
    text: "Professional from start to finish. The gutters look beautiful and the price was very reasonable. They even cleaned up better than before they arrived!",
    service: "Seamless Gutters",
    date: "Verified Customer",
    image: "/images/gallery/060.jpg",
  },
  {
    name: "David W.",
    location: "Plymouth, MI",
    rating: 5,
    text: "Called on a Friday, got an estimate Saturday, installation Monday. That's the kind of service you rarely find anymore. Great work, great people!",
    service: "Gutter Replacement",
    date: "Verified Customer",
    image: "/images/gallery/021.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.green.50),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-green-600/10 shadow-xl ring-1 ring-green-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="container mx-auto px-4">
        {/* Modernized Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700 text-sm leading-6 ring-1 ring-green-600/20 ring-inset">
            <CheckCircle className="h-4 w-4" />
            <span className="font-bold text-[10px] uppercase tracking-wider">
              Trusted Excellence
            </span>
          </div>
          <h2 className="mb-6 font-black text-4xl text-gray-900 tracking-tight sm:text-6xl">
            Real Stories from <br />
            <span className="text-green-600">Local Homeowners</span>
          </h2>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="mb-1 flex gap-0.5">
                {[...new Array(5)].map((_, i) => (
                  <Star
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    key={i}
                  />
                ))}
              </div>
              <p className="font-bold text-gray-900 text-sm">
                5.0 Google Rating
              </p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-left">
              <p className="font-medium text-gray-500 text-sm">Based on</p>
              <p className="font-bold text-gray-900 text-sm">
                40+ Verified Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Unique Dense Grid for Verified Reviews */}
        <div className="mx-auto mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 transition-all hover:shadow-green-600/10 hover:ring-green-600/20"
              key={index}
            >
              {/* Project Image Thumbnail */}
              <div className="relative -mx-5 -mt-5 mb-4 h-32 overflow-hidden">
                <img
                  alt={`Project for ${testimonial.name}`}
                  className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  src={testimonial.image}
                />
                {/* Fallback gradient if image fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300" />
                {/* Service badge */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 font-bold text-[10px] text-green-800 uppercase tracking-wider backdrop-blur-sm">
                    {testimonial.service}
                  </span>
                </div>
              </div>

              {/* Unique Brand Accent - Quote Mark */}
              <div className="absolute -top-2 -right-2 h-12 w-12 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
                <svg
                  className="text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 17.2091 19.2261 19 17.017 19H15.017C14.4647 19 14.017 19.4477 14.017 20V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.89543 1.91243 7 3.017 7H10.017C11.1216 7 12.017 7.89543 12.017 9V15C12.017 17.2091 10.2261 19 8.017 19H6.017C5.46472 19 5.017 19.4477 5.017 20V21H5.017Z" />
                </svg>
              </div>

              <div className="mb-3 flex items-center gap-1.5">
                {[...new Array(5)].map((_, i) => (
                  <Star
                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    key={i}
                  />
                ))}
                <div className="ml-auto flex items-center gap-1">
                  <GoogleLogo className="h-3 w-3" />
                  <span className="font-bold text-[9px] text-gray-400 uppercase tracking-tighter">
                    Verified
                  </span>
                </div>
              </div>

              <blockquote className="font-medium text-[14px] text-gray-700 italic leading-relaxed tracking-tight">
                <p>"{testimonial.text}"</p>
              </blockquote>

              <figcaption className="mt-4 flex items-center gap-x-3 border-gray-50 border-t pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 font-black text-green-700 text-xs shadow-sm ring-1 ring-green-100">
                  {testimonial.name[0]}
                </div>
                <div className="overflow-hidden">
                  <div className="truncate font-black text-gray-900 text-xs uppercase tracking-tight">
                    {testimonial.name}
                  </div>
                  <div className="mt-0.5 truncate font-bold text-[9px] text-green-600 uppercase leading-none tracking-widest">
                    {testimonial.location}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="mt-20 flex flex-col items-center justify-center gap-6">
          <a
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gray-900 px-8 py-4 font-black text-white shadow-gray-900/10 shadow-xl transition-all hover:bg-green-600 hover:ring-offset-2 active:scale-95"
            href="https://goo.gl/maps/rrgMHbdWMzNdDjvk9"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <GoogleLogo className="h-5 w-5 fill-white" />
            <span>See All 40+ Verified Reviews on Google</span>
          </a>

          <div className="flex items-center gap-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <span className="font-black text-gray-900 text-sm italic tracking-tighter">
              Thumbtack
            </span>
            <span className="font-black text-gray-900 text-sm tracking-tighter">
              Angi
            </span>
            <span className="font-black text-gray-900 text-sm tracking-tighter">
              Houzz
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
