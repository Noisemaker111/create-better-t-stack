import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
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

type GalleryItem = {
  _id: string;
  _creationTime: number;
  src: string;
  category: string;
  title: string;
  location: string;
  description: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: number;
  updatedAt: number;
};

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch gallery items from database
  const allItems = useQuery(api.gallery.getVisibleGalleryItems);
  const galleryItems: GalleryItem[] = allItems || [];

  // Filter items based on category
  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Handle loading state
  if (allItems === undefined) {
    return (
      <>
        <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
                Our Work
              </span>
              <h1 className="mb-6 font-bold text-4xl md:text-5xl">
                Project Gallery
              </h1>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
                <p className="mt-2 text-muted-foreground">Loading gallery...</p>
              </div>
            </div>
          </div>
        </section>
        <CTABanner />
      </>
    );
  }

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
                key={item._id}
                onClick={() => {
                  setSelectedImage(item._id);
                  trackGalleryImageView({
                    id: item._id,
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
                  galleryItems.find((i) => i._id === selectedImage)?.title ??
                  "Project photo"
                }
                className="absolute inset-0 h-full w-full bg-black object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                src={galleryItems.find((i) => i._id === selectedImage)?.src}
              />
            </div>

            {/* Image Info */}
            <div className="p-6">
              <h3 className="mb-1 font-bold text-gray-900 text-xl">
                {galleryItems.find((i) => i._id === selectedImage)?.title}
              </h3>
              <p className="mb-2 font-semibold text-green-700">
                {galleryItems.find((i) => i._id === selectedImage)?.location}
              </p>
              <p className="text-gray-600">
                {galleryItems.find((i) => i._id === selectedImage)?.description}
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
