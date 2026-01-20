import { ArrowRight, CheckCircle } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    src: "/images/gallery/001.jpg",
    title: "Premium Seamless Gutter Installation",
    location: "Garden City, MI",
  },
  {
    id: 2,
    src: "/images/gallery/002.jpg",
    title: "Complete Home Gutter System",
    location: "Livonia, MI",
  },
  {
    id: 3,
    src: "/images/gallery/003.jpg",
    title: "Gutter Installation in Progress",
    location: "Plymouth, MI",
  },
  {
    id: 4,
    src: "/images/gallery/048.jpg",
    title: "Plastic Leaf Guard Installation",
    location: "Livonia, MI",
  },
];

export default function ProjectShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left side - Text content */}
          <div className="lg:w-5/12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 text-sm leading-6 ring-1 ring-green-600/20 ring-inset">
              <CheckCircle className="h-4 w-4" />
              <span className="font-bold text-[10px] uppercase tracking-wider">
                Recent Projects
              </span>
            </div>
            <h2 className="mb-6 font-black text-4xl text-gray-900 tracking-tight">
              Real Results for{" "}
              <span className="text-green-600">Michigan Homeowners</span>
            </h2>
            <p className="mb-8 text-gray-600 text-lg leading-relaxed">
              We've completed over 100 gutter installations across Garden City,
              Livonia, Plymouth, and surrounding areas. Every project gets our
              full attention to detail.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-lg text-white transition-all hover:bg-green-700 active:scale-95"
                href="/gallery"
              >
                View Our Work
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 font-medium text-gray-500 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                100+ Projects Completed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                5-Star Rating
              </span>
            </div>
          </div>

          {/* Right side - Image grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-2 gap-4">
              {featuredProjects.map((project, index) => (
                <div
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg ${
                    index === 0 ? "row-span-2" : ""
                  }`}
                  key={project.id}
                >
                  <img
                    alt={project.title}
                    className="relative z-10 aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    src={project.src}
                  />
                  {/* Fallback gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300" />
                  {/* Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  {/* Content */}
                  <div className="absolute right-0 bottom-0 left-0 z-20 p-4 text-white">
                    <h3 className="mb-1 font-bold text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-green-200 text-xs">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
