import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { CTABanner } from "@/components/sections";
import { trackGalleryFilter, trackGalleryImageView } from "@/lib/analytics";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      {
        title:
          "Gutter Installation Gallery | BTG Gutters Portfolio in Southeast Michigan",
      },
      {
        name: "description",
        content:
          "View our portfolio of completed gutter installations, repairs, and leaf guard projects across Southeast Michigan. 100+ projects completed by BTG Gutters.",
      },
      {
        name: "keywords",
        content:
          "gutter installation photos, gutter repair gallery, leaf guard photos, BTG Gutters portfolio, gutter project examples Michigan",
      },
      {
        property: "og:title",
        content:
          "Gutter Installation Gallery | BTG Gutters Portfolio in Southeast Michigan",
      },
      {
        property: "og:description",
        content:
          "Browse our completed gutter projects across Southeast Michigan. See examples of our seamless gutter installations, repairs, and leaf guard systems.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content:
          "Gutter Installation Gallery | BTG Gutters Portfolio in Southeast Michigan",
      },
      {
        name: "twitter:description",
        content:
          "View our portfolio of 100+ completed gutter projects across Southeast Michigan.",
      },
    ],
  }),
});

const categories = [
  { id: "all", name: "All Projects" },
  { id: "residential", name: "Residential Gutters" },
  { id: "commercial", name: "Commercial Gutters" },
  { id: "guards", name: "Leaf/Gutter Guards" },
  { id: "soffit", name: "Soffit & Fascia" },
];

// Gallery items with real photos from /images/gallery/
const galleryItems = [
  // Residential installations - High quality new photos
  {
    id: 1,
    src: "/images/gallery/001.jpg",
    category: "residential",
    title: "Premium Seamless Gutter Installation",
    location: "Garden City, MI",
    description:
      "Custom seamless aluminum gutter system installation with precise pitch for optimal drainage",
  },
  {
    id: 2,
    src: "/images/gallery/002.jpg",
    category: "residential",
    title: "Complete Home Gutter System",
    location: "Livonia, MI",
    description:
      "Full home gutter replacement with 6-inch seamless aluminum gutters",
  },
  {
    id: 3,
    src: "/images/gallery/003.jpg",
    category: "residential",
    title: "Gutter Installation in Progress",
    location: "Plymouth, MI",
    description:
      "Professional installation of new seamless gutter system with leaf guard compatibility",
  },
  {
    id: 4,
    src: "/images/gallery/004.jpg",
    category: "residential",
    title: "Downspout Installation",
    location: "Southfield, MI",
    description: "Proper downspout placement for effective water drainage",
  },
  {
    id: 5,
    src: "/images/gallery/005.jpg",
    category: "residential",
    title: "Gutter Repair Project",
    location: "Farmington Hills, MI",
    description: "Expert repair and replacement of damaged gutter sections",
  },
  {
    id: 6,
    src: "/images/gallery/006.jpg",
    category: "residential",
    title: "Color-Matched Gutters",
    location: "Northville, MI",
    description: "50+ color options available to match any home exterior",
  },
  {
    id: 7,
    src: "/images/gallery/007.jpg",
    category: "residential",
    title: "Seamless Gutter Close-Up",
    location: "Novi, MI",
    description:
      "Clean professional finish with concealed hangers every 12-18 inches",
  },
  {
    id: 8,
    src: "/images/gallery/008.jpg",
    category: "residential",
    title: "Gutter System Installation",
    location: "Westland, MI",
    description:
      "Complete gutter system installation with proper pitch and drainage",
  },
  {
    id: 9,
    src: "/images/gallery/009.jpg",
    category: "residential",
    title: "Residential Gutter Project",
    location: "Canton, MI",
    description:
      "Quality residential installation with premium aluminum materials",
  },
  {
    id: 10,
    src: "/images/gallery/010.jpg",
    category: "residential",
    title: "Multi-Story Home Gutters",
    location: "Dearborn, MI",
    description: "Seamless gutters for multi-story residential home",
  },
  {
    id: 11,
    src: "/images/gallery/011.jpg",
    category: "residential",
    title: "Downspout Work",
    location: "Taylor, MI",
    description: "Custom downspout configuration for proper water flow",
  },
  {
    id: 12,
    src: "/images/gallery/012.jpg",
    category: "residential",
    title: "Corner Installation",
    location: "Romulus, MI",
    description: "Seamless corner pieces for complete gutter system",
  },
  {
    id: 13,
    src: "/images/gallery/013.jpg",
    category: "residential",
    title: "Gutter Installation",
    location: "Inkster, MI",
    description: "New seamless aluminum gutter installation",
  },
  {
    id: 14,
    src: "/images/gallery/014.jpg",
    category: "residential",
    title: "Complete System",
    location: "Wayne, MI",
    description: "Full home gutter system with matching accessories",
  },

  // More residential installations
  {
    id: 15,
    src: "/images/gallery/015.jpg",
    category: "residential",
    title: "Residential Installation",
    location: "Redford, MI",
    description: "Clean installation of seamless aluminum gutters",
  },
  {
    id: 16,
    src: "/images/gallery/016.jpg",
    category: "residential",
    title: "Gutter Replacement",
    location: "Melvindale, MI",
    description: "Old gutter removal and new system installation",
  },
  {
    id: 17,
    src: "/images/gallery/017.jpg",
    category: "residential",
    title: "Downspout Setup",
    location: "Southgate, MI",
    description: "Proper downspout configuration for water drainage",
  },
  {
    id: 18,
    src: "/images/gallery/018.jpg",
    category: "residential",
    title: "Residential Project",
    location: "Wyandotte, MI",
    description: "Complete home gutter system installation",
  },
  {
    id: 19,
    src: "/images/gallery/019.jpg",
    category: "residential",
    title: "Gutter Work",
    location: "Clinton, MI",
    description: "Quality residential gutter installation",
  },
  {
    id: 20,
    src: "/images/gallery/020.jpg",
    category: "residential",
    title: "System Installation",
    location: "Sterling Heights, MI",
    description: "Seamless aluminum gutter system for home",
  },

  // Various installation work
  {
    id: 21,
    src: "/images/gallery/021.jpg",
    category: "residential",
    title: "Installation In Progress",
    location: "Oak Park, MI",
    description: "Mid-project seamless gutter installation",
  },
  {
    id: 22,
    src: "/images/gallery/022.jpg",
    category: "residential",
    title: "Gutter Setup",
    location: "Livonia, MI",
    description: "Initial setup of new gutter system",
  },
  {
    id: 23,
    src: "/images/gallery/023.jpg",
    category: "residential",
    title: "Installation Detail",
    location: "Plymouth, MI",
    description: "Concealed hangers installed every 12-18 inches",
  },
  {
    id: 24,
    src: "/images/gallery/024.jpg",
    category: "residential",
    title: "Residential Work",
    location: "Garden City, MI",
    description: "Quality craftsmanship on home gutter installation",
  },
  {
    id: 25,
    src: "/images/gallery/025.jpg",
    category: "residential",
    title: "Gutter Project",
    location: "Southfield, MI",
    description: "Complete residential gutter installation",
  },
  {
    id: 26,
    src: "/images/gallery/026.jpg",
    category: "residential",
    title: "Installation",
    location: "Novi, MI",
    description: "Seamless aluminum gutters for residential property",
  },
  {
    id: 27,
    src: "/images/gallery/027.jpg",
    category: "residential",
    title: "Gutter System",
    location: "Farmington, MI",
    description: "Full gutter system with proper drainage",
  },
  {
    id: 28,
    src: "/images/gallery/028.jpg",
    category: "residential",
    title: "Installation Work",
    location: "Northville, MI",
    description: "Professional installation with quality materials",
  },
  {
    id: 29,
    src: "/images/gallery/029.jpg",
    category: "residential",
    title: "Residential Gutter",
    location: "Dearborn, MI",
    description: "Custom gutters for home exterior",
  },
  {
    id: 30,
    src: "/images/gallery/030.jpg",
    category: "residential",
    title: "Installation",
    location: "Taylor, MI",
    description: "Seamless gutter installation for home",
  },
  {
    id: 31,
    src: "/images/gallery/031.jpg",
    category: "residential",
    title: "Gutter Setup",
    location: "Wayne, MI",
    description: "New gutter system installation",
  },

  // Soffit & Fascia work
  {
    id: 32,
    src: "/images/gallery/032.jpg",
    category: "soffit",
    title: "Gutter & Fascia Installation",
    location: "Romulus, MI",
    description: "Complete gutter and fascia system installation",
  },
  {
    id: 33,
    src: "/images/gallery/033.jpg",
    category: "soffit",
    title: "Downspout & Fascia",
    location: "Redford, MI",
    description: "Fascia replacement with downspout work",
  },
  {
    id: 34,
    src: "/images/gallery/034.jpg",
    category: "soffit",
    title: "Commercial Fascia",
    location: "Livonia, MI",
    description: "Metal fascia installation for commercial building",
  },
  {
    id: 35,
    src: "/images/gallery/035.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Inkster, MI",
    description: "Fascia repair and gutter hanger installation",
  },
  {
    id: 36,
    src: "/images/gallery/036.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Westland, MI",
    description: "Complete fascia board replacement",
  },
  {
    id: 37,
    src: "/images/gallery/037.jpg",
    category: "soffit",
    title: "Soffit Installation",
    location: "Southfield, MI",
    description: "New soffit with integrated gutter system",
  },
  {
    id: 38,
    src: "/images/gallery/038.jpg",
    category: "soffit",
    title: "Fascia Work",
    location: "Canton, MI",
    description: "Fascia repair and metal trim installation",
  },
  {
    id: 39,
    src: "/images/gallery/039.jpg",
    category: "soffit",
    title: "Soffit & Fascia",
    location: "Dearborn, MI",
    description: "Complete soffit and fascia replacement project",
  },
  {
    id: 40,
    src: "/images/gallery/040.jpg",
    category: "soffit",
    title: "Fascia Detail",
    location: "Novi, MI",
    description: "Precision fascia work with color matching",
  },
  {
    id: 41,
    src: "/images/gallery/041.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Garden City, MI",
    description: "Fascia installation with concealed hangers",
  },
  {
    id: 42,
    src: "/images/gallery/042.jpg",
    category: "soffit",
    title: "Soffit Replacement",
    location: "Wayne, MI",
    description: "Old soffit removal and new installation",
  },
  {
    id: 43,
    src: "/images/gallery/043.jpg",
    category: "soffit",
    title: "Fascia Project",
    location: "Taylor, MI",
    description: "Complete fascia and trim installation",
  },
  {
    id: 44,
    src: "/images/gallery/044.jpg",
    category: "soffit",
    title: "Soffit Work",
    location: "Wyandotte, MI",
    description: "Professional soffit installation",
  },
  {
    id: 45,
    src: "/images/gallery/045.jpg",
    category: "soffit",
    title: "Fascia Installation",
    location: "Southgate, MI",
    description: "Metal fascia with color coordination",
  },
  {
    id: 46,
    src: "/images/gallery/046.jpg",
    category: "soffit",
    title: "Soffit & Fascia",
    location: "Redford, MI",
    description: "Complete soffit and fascia system",
  },
  {
    id: 47,
    src: "/images/gallery/047.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Melvindale, MI",
    description: "Fascia board replacement project",
  },

  // Leaf guards
  {
    id: 48,
    src: "/images/gallery/048.jpg",
    category: "guards",
    title: "Plastic Leaf Guard",
    location: "Livonia, MI",
    description: "Durable plastic guard over gutter to keep it free of leaves",
  },
  {
    id: 49,
    src: "/images/gallery/049.jpg",
    category: "guards",
    title: "Mesh Leaf Guard",
    location: "Plymouth, MI",
    description:
      "Mesh guards prevent leaves and large debris from entering gutters",
  },
  {
    id: 50,
    src: "/images/gallery/050.jpg",
    category: "guards",
    title: "Leaf Guard Installation",
    location: "Farmington Hills, MI",
    description:
      "Professional leaf guard installation for year-round protection",
  },
  {
    id: 51,
    src: "/images/gallery/051.jpg",
    category: "guards",
    title: "Gutter Guard Detail",
    location: "Southfield, MI",
    description: "Close-up of installed gutter guard system",
  },
  {
    id: 52,
    src: "/images/gallery/052.jpg",
    category: "guards",
    title: "Mesh Guard System",
    location: "Novi, MI",
    description: "Complete mesh guard installation for debris prevention",
  },
  {
    id: 53,
    src: "/images/gallery/053.jpg",
    category: "guards",
    title: "Plastic Guard",
    location: "Dearborn, MI",
    description: "Plastic guard over gutter on a roof for debris protection",
  },
  {
    id: 54,
    src: "/images/gallery/054.jpg",
    category: "guards",
    title: "Closeup Guard",
    location: "Garden City, MI",
    description: "Closeup of gutters with leaf guard installed",
  },
  {
    id: 55,
    src: "/images/gallery/055.jpg",
    category: "guards",
    title: "Guard Installation",
    location: "Westland, MI",
    description: "Professional installation of gutter guard system",
  },
  {
    id: 56,
    src: "/images/gallery/056.jpg",
    category: "guards",
    title: "Mesh Guards",
    location: "Taylor, MI",
    description: "Mesh guards over troughs prevent debris and clogging",
  },
  {
    id: 57,
    src: "/images/gallery/057.jpg",
    category: "guards",
    title: "Commercial Gutters & Guards",
    location: "Livonia, MI",
    description: "Heavy-duty commercial gutters with leaf guard protection",
  },

  // More residential with guards
  {
    id: 58,
    src: "/images/gallery/058.jpg",
    category: "residential",
    title: "New Gutters 2025",
    location: "Garden City, MI",
    description: "High-quality seamless gutter installation",
  },
  {
    id: 59,
    src: "/images/gallery/059.jpg",
    category: "residential",
    title: "Residential System",
    location: "Livonia, MI",
    description: "Complete gutter system for home",
  },
  {
    id: 60,
    src: "/images/gallery/060.jpg",
    category: "residential",
    title: "Premium Installation",
    location: "Garden City, MI",
    description: "Premium seamless aluminum gutter installation",
  },

  // Soffit & fascia continued
  {
    id: 61,
    src: "/images/gallery/061.jpg",
    category: "soffit",
    title: "Gutter & Soffit",
    location: "Plymouth, MI",
    description: "Integrated gutter and soffit installation",
  },
  {
    id: 62,
    src: "/images/gallery/062.jpg",
    category: "soffit",
    title: "Soffit Installation",
    location: "Westland, MI",
    description: "New soffit installation project",
  },
  {
    id: 63,
    src: "/images/gallery/063.jpg",
    category: "soffit",
    title: "Fascia & Trim",
    location: "Southfield, MI",
    description: "Fascia replacement with metal trim work",
  },
  {
    id: 64,
    src: "/images/gallery/064.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Canton, MI",
    description: "Fascia board with integrated gutter system",
  },
  {
    id: 65,
    src: "/images/gallery/065.jpg",
    category: "soffit",
    title: "Fascia Project",
    location: "Novi, MI",
    description: "Complete fascia installation and repair",
  },
  {
    id: 66,
    src: "/images/gallery/066.jpg",
    category: "soffit",
    title: "Soffit Work",
    location: "Garden City, MI",
    description: "Professional soffit installation",
  },
  {
    id: 67,
    src: "/images/gallery/067.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Dearborn, MI",
    description: "Complete fascia board replacement project",
  },
  {
    id: 68,
    src: "/images/gallery/068.jpg",
    category: "soffit",
    title: "Soffit Detail",
    location: "Wayne, MI",
    description: "Precision soffit installation work",
  },
  {
    id: 69,
    src: "/images/gallery/069.jpg",
    category: "soffit",
    title: "Fascia Installation",
    location: "Taylor, MI",
    description: "Metal fascia installation with gutters",
  },
  {
    id: 70,
    src: "/images/gallery/070.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Southgate, MI",
    description: "Fascia and gutter installation",
  },
  {
    id: 71,
    src: "/images/gallery/071.jpg",
    category: "residential",
    title: "Gutter Installation",
    location: "Westland, MI",
    description: "Complete home gutter system",
  },

  // Commercial
  {
    id: 72,
    src: "/images/gallery/072.jpg",
    category: "commercial",
    title: "Commercial Gutter System",
    location: "Livonia, MI",
    description: "Heavy-duty commercial gutter installation for large building",
  },
] as const;

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
              Our Work
            </span>
            <h1 className="mb-6 font-bold text-4xl md:text-5xl">
              Project Gallery
            </h1>
            <p className="text-green-100 text-xl">
              Browse {galleryItems.length}+ completed gutter installations,
              repairs, and home improvement projects across {categories.length}{" "}
              categories.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-green-700 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  trackGalleryFilter(category.id);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <button
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-green-100 text-left transition-all hover:shadow-lg"
                key={item.id}
                onClick={() => {
                  setSelectedImage(item.id);
                  trackGalleryImageView({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    location: item.location,
                  });
                }}
              >
                <img
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  src={item.src}
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-green-200 text-sm">{item.location}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-600">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="max-h-[90vh] max-w-4xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-video bg-gradient-to-br from-green-200 to-green-300">
              <img
                alt={
                  galleryItems.find((i) => i.id === selectedImage)?.title ??
                  "Project photo"
                }
                className="absolute inset-0 h-full w-full bg-black object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                src={galleryItems.find((i) => i.id === selectedImage)?.src}
              />
            </div>

            {/* Image Info */}
            <div className="p-6">
              <h3 className="mb-1 font-bold text-gray-900 text-xl">
                {galleryItems.find((i) => i.id === selectedImage)?.title}
              </h3>
              <p className="mb-2 font-semibold text-green-700">
                {galleryItems.find((i) => i.id === selectedImage)?.location}
              </p>
              <p className="text-gray-600">
                {galleryItems.find((i) => i.id === selectedImage)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <CTABanner />
    </>
  );
}
