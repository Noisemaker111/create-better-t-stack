/**
 * Single source of truth for all image paths and metadata used in the application.
 * Import from this file instead of hardcoding image paths throughout the codebase.
 */

// ============================================================================
// BRAND ASSETS
// ============================================================================

export const BRAND = {
  logo: "/images/logo.png",
  heroBg: "/images/hero-bg.jpeg",
} as const;

// ============================================================================
// GALLERY IMAGE CATEGORIES
// ============================================================================

export type GalleryCategory =
  | "residential"
  | "commercial"
  | "guards"
  | "soffit";

export const GALLERY_CATEGORIES = [
  { id: "all", name: "All Projects" },
  { id: "residential", name: "Residential Gutters" },
  { id: "commercial", name: "Commercial Gutters" },
  { id: "guards", name: "Leaf/Gutter Guards" },
  { id: "soffit", name: "Soffit & Fascia" },
] as const;

// ============================================================================
// GALLERY IMAGES - Complete list of all gallery images with metadata
// ============================================================================

export interface GalleryImage {
  id: string;
  src: string;
  category: GalleryCategory;
  title: string;
  location: string;
  description: string;
}

/**
 * Complete gallery of all project images.
 * This is the single source of truth for gallery data.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "001",
    src: "/images/gallery/001.jpg",
    category: "residential",
    title: "Premium Seamless Gutter Installation",
    location: "Garden City, MI",
    description:
      "Custom seamless aluminum gutter system installation with precise pitch for optimal drainage",
  },
  {
    id: "002",
    src: "/images/gallery/002.jpg",
    category: "residential",
    title: "Complete Home Gutter System",
    location: "Livonia, MI",
    description:
      "Full home gutter replacement with 6-inch seamless aluminum gutters",
  },
  {
    id: "003",
    src: "/images/gallery/003.jpg",
    category: "residential",
    title: "Gutter Installation in Progress",
    location: "Plymouth, MI",
    description:
      "Professional installation of new seamless gutter system with leaf guard compatibility",
  },
  {
    id: "004",
    src: "/images/gallery/004.jpg",
    category: "residential",
    title: "Downspout Installation",
    location: "Southfield, MI",
    description: "Proper downspout placement for effective water drainage",
  },
  {
    id: "005",
    src: "/images/gallery/005.jpg",
    category: "residential",
    title: "Gutter Repair Project",
    location: "Farmington Hills, MI",
    description: "Expert repair and replacement of damaged gutter sections",
  },
  {
    id: "006",
    src: "/images/gallery/006.jpg",
    category: "residential",
    title: "Color-Matched Gutters",
    location: "Northville, MI",
    description: "50+ color options available to match any home exterior",
  },
  {
    id: "007",
    src: "/images/gallery/007.jpg",
    category: "residential",
    title: "Seamless Gutter Close-Up",
    location: "Novi, MI",
    description:
      "Clean professional finish with concealed hangers every 12-18 inches",
  },
  {
    id: "008",
    src: "/images/gallery/008.jpg",
    category: "residential",
    title: "Gutter System Installation",
    location: "Westland, MI",
    description:
      "Complete gutter system installation with proper pitch and drainage",
  },
  {
    id: "009",
    src: "/images/gallery/009.jpg",
    category: "residential",
    title: "Residential Gutter Project",
    location: "Canton, MI",
    description:
      "Quality residential installation with premium aluminum materials",
  },
  {
    id: "010",
    src: "/images/gallery/010.jpg",
    category: "residential",
    title: "Multi-Story Home Gutters",
    location: "Dearborn, MI",
    description: "Seamless gutters for multi-story residential home",
  },
  {
    id: "011",
    src: "/images/gallery/011.jpg",
    category: "residential",
    title: "Downspout Work",
    location: "Taylor, MI",
    description: "Custom downspout configuration for proper water flow",
  },
  {
    id: "012",
    src: "/images/gallery/012.jpg",
    category: "residential",
    title: "Corner Installation",
    location: "Romulus, MI",
    description: "Seamless corner pieces for complete gutter system",
  },
  {
    id: "013",
    src: "/images/gallery/013.jpg",
    category: "residential",
    title: "Gutter Installation",
    location: "Inkster, MI",
    description: "New seamless aluminum gutter installation",
  },
  {
    id: "014",
    src: "/images/gallery/014.jpg",
    category: "residential",
    title: "Complete System",
    location: "Wayne, MI",
    description: "Full home gutter system with matching accessories",
  },
  {
    id: "015",
    src: "/images/gallery/015.jpg",
    category: "residential",
    title: "Residential Installation",
    location: "Redford, MI",
    description: "Clean installation of seamless aluminum gutters",
  },
  {
    id: "016",
    src: "/images/gallery/016.jpg",
    category: "residential",
    title: "Gutter Replacement",
    location: "Melvindale, MI",
    description: "Old gutter removal and new system installation",
  },
  {
    id: "017",
    src: "/images/gallery/017.jpg",
    category: "residential",
    title: "Downspout Setup",
    location: "Southgate, MI",
    description: "Proper downspout configuration for water drainage",
  },
  {
    id: "018",
    src: "/images/gallery/018.jpg",
    category: "residential",
    title: "Residential Project",
    location: "Wyandotte, MI",
    description: "Complete home gutter system installation",
  },
  {
    id: "019",
    src: "/images/gallery/019.jpg",
    category: "residential",
    title: "Gutter Work",
    location: "Clinton, MI",
    description: "Quality residential gutter installation",
  },
  {
    id: "020",
    src: "/images/gallery/020.jpg",
    category: "residential",
    title: "System Installation",
    location: "Sterling Heights, MI",
    description: "Seamless aluminum gutter system for home",
  },
  {
    id: "021",
    src: "/images/gallery/021.jpg",
    category: "residential",
    title: "Installation In Progress",
    location: "Oak Park, MI",
    description: "Mid-project seamless gutter installation",
  },
  {
    id: "022",
    src: "/images/gallery/022.jpg",
    category: "residential",
    title: "Gutter Setup",
    location: "Livonia, MI",
    description: "Initial setup of new gutter system",
  },
  {
    id: "023",
    src: "/images/gallery/023.jpg",
    category: "residential",
    title: "Installation Detail",
    location: "Plymouth, MI",
    description: "Concealed hangers installed every 12-18 inches",
  },
  {
    id: "024",
    src: "/images/gallery/024.jpg",
    category: "residential",
    title: "Residential Work",
    location: "Garden City, MI",
    description: "Quality craftsmanship on home gutter installation",
  },
  {
    id: "025",
    src: "/images/gallery/025.jpg",
    category: "residential",
    title: "Gutter Project",
    location: "Southfield, MI",
    description: "Complete residential gutter installation",
  },
  {
    id: "026",
    src: "/images/gallery/026.jpg",
    category: "residential",
    title: "Installation",
    location: "Novi, MI",
    description: "Seamless aluminum gutters for residential property",
  },
  {
    id: "027",
    src: "/images/gallery/027.jpg",
    category: "residential",
    title: "Gutter System",
    location: "Farmington, MI",
    description: "Full gutter system with proper drainage",
  },
  {
    id: "028",
    src: "/images/gallery/028.jpg",
    category: "residential",
    title: "Installation Work",
    location: "Northville, MI",
    description: "Professional installation with quality materials",
  },
  {
    id: "029",
    src: "/images/gallery/029.jpg",
    category: "residential",
    title: "Residential Gutter",
    location: "Dearborn, MI",
    description: "Custom gutters for home exterior",
  },
  {
    id: "030",
    src: "/images/gallery/030.jpg",
    category: "residential",
    title: "Installation",
    location: "Taylor, MI",
    description: "Seamless gutter installation for home",
  },
  {
    id: "031",
    src: "/images/gallery/031.jpg",
    category: "residential",
    title: "Gutter Setup",
    location: "Wayne, MI",
    description: "New gutter system installation",
  },
  {
    id: "032",
    src: "/images/gallery/032.jpg",
    category: "soffit",
    title: "Gutter & Fascia Installation",
    location: "Romulus, MI",
    description: "Complete gutter and fascia system installation",
  },
  {
    id: "033",
    src: "/images/gallery/033.jpg",
    category: "soffit",
    title: "Downspout & Fascia",
    location: "Redford, MI",
    description: "Fascia replacement with downspout work",
  },
  {
    id: "034",
    src: "/images/gallery/034.jpg",
    category: "soffit",
    title: "Commercial Fascia",
    location: "Livonia, MI",
    description: "Metal fascia installation for commercial building",
  },
  {
    id: "035",
    src: "/images/gallery/035.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Inkster, MI",
    description: "Fascia repair and gutter hanger installation",
  },
  {
    id: "036",
    src: "/images/gallery/036.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Westland, MI",
    description: "Complete fascia board replacement",
  },
  {
    id: "037",
    src: "/images/gallery/037.jpg",
    category: "soffit",
    title: "Soffit Installation",
    location: "Southfield, MI",
    description: "New soffit with integrated gutter system",
  },
  {
    id: "038",
    src: "/images/gallery/038.jpg",
    category: "soffit",
    title: "Fascia Work",
    location: "Canton, MI",
    description: "Fascia repair and metal trim installation",
  },
  {
    id: "039",
    src: "/images/gallery/039.jpg",
    category: "soffit",
    title: "Soffit & Fascia",
    location: "Dearborn, MI",
    description: "Complete soffit and fascia replacement project",
  },
  {
    id: "040",
    src: "/images/gallery/040.jpg",
    category: "soffit",
    title: "Fascia Detail",
    location: "Novi, MI",
    description: "Precision fascia work with color matching",
  },
  {
    id: "041",
    src: "/images/gallery/041.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Garden City, MI",
    description: "Fascia installation with concealed hangers",
  },
  {
    id: "042",
    src: "/images/gallery/042.jpg",
    category: "soffit",
    title: "Soffit Replacement",
    location: "Wayne, MI",
    description: "Old soffit removal and new installation",
  },
  {
    id: "043",
    src: "/images/gallery/043.jpg",
    category: "soffit",
    title: "Fascia Project",
    location: "Taylor, MI",
    description: "Complete fascia and trim installation",
  },
  {
    id: "044",
    src: "/images/gallery/044.jpg",
    category: "soffit",
    title: "Soffit Work",
    location: "Wyandotte, MI",
    description: "Professional soffit installation",
  },
  {
    id: "045",
    src: "/images/gallery/045.jpg",
    category: "soffit",
    title: "Fascia Installation",
    location: "Southgate, MI",
    description: "Metal fascia with color coordination",
  },
  {
    id: "046",
    src: "/images/gallery/046.jpg",
    category: "soffit",
    title: "Soffit & Fascia",
    location: "Redford, MI",
    description: "Complete soffit and fascia system",
  },
  {
    id: "047",
    src: "/images/gallery/047.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Melvindale, MI",
    description: "Fascia board replacement project",
  },
  {
    id: "048",
    src: "/images/gallery/048.jpg",
    category: "guards",
    title: "Plastic Leaf Guard",
    location: "Livonia, MI",
    description: "Durable plastic guard over gutter to keep it free of leaves",
  },
  {
    id: "049",
    src: "/images/gallery/049.jpg",
    category: "guards",
    title: "Mesh Leaf Guard",
    location: "Plymouth, MI",
    description:
      "Mesh guards prevent leaves and large debris from entering gutters",
  },
  {
    id: "050",
    src: "/images/gallery/050.jpg",
    category: "guards",
    title: "Leaf Guard Installation",
    location: "Farmington Hills, MI",
    description:
      "Professional leaf guard installation for year-round protection",
  },
  {
    id: "051",
    src: "/images/gallery/051.jpg",
    category: "guards",
    title: "Gutter Guard Detail",
    location: "Southfield, MI",
    description: "Close-up of installed gutter guard system",
  },
  {
    id: "052",
    src: "/images/gallery/052.jpg",
    category: "guards",
    title: "Mesh Guard System",
    location: "Novi, MI",
    description: "Complete mesh guard installation for debris prevention",
  },
  {
    id: "053",
    src: "/images/gallery/053.jpg",
    category: "guards",
    title: "Plastic Guard",
    location: "Dearborn, MI",
    description: "Plastic guard over gutter on a roof for debris protection",
  },
  {
    id: "054",
    src: "/images/gallery/054.jpg",
    category: "guards",
    title: "Closeup Guard",
    location: "Garden City, MI",
    description: "Closeup of gutters with leaf guard installed",
  },
  {
    id: "055",
    src: "/images/gallery/055.jpg",
    category: "guards",
    title: "Guard Installation",
    location: "Westland, MI",
    description: "Professional installation of gutter guard system",
  },
  {
    id: "056",
    src: "/images/gallery/056.jpg",
    category: "guards",
    title: "Mesh Guards",
    location: "Taylor, MI",
    description: "Mesh guards over troughs prevent debris and clogging",
  },
  {
    id: "057",
    src: "/images/gallery/057.jpg",
    category: "commercial",
    title: "Commercial Gutters & Guards",
    location: "Livonia, MI",
    description: "Heavy-duty commercial gutters with leaf guard protection",
  },
  {
    id: "058",
    src: "/images/gallery/058.jpg",
    category: "residential",
    title: "New Gutters 2025",
    location: "Garden City, MI",
    description: "High-quality seamless gutter installation",
  },
  {
    id: "059",
    src: "/images/gallery/059.jpg",
    category: "residential",
    title: "Residential System",
    location: "Livonia, MI",
    description: "Complete gutter system for home",
  },
  {
    id: "060",
    src: "/images/gallery/060.jpg",
    category: "residential",
    title: "Premium Installation",
    location: "Garden City, MI",
    description: "Premium seamless aluminum gutter installation",
  },
  {
    id: "061",
    src: "/images/gallery/061.jpg",
    category: "soffit",
    title: "Gutter & Soffit",
    location: "Plymouth, MI",
    description: "Integrated gutter and soffit installation",
  },
  {
    id: "062",
    src: "/images/gallery/062.jpg",
    category: "soffit",
    title: "Soffit Installation",
    location: "Westland, MI",
    description: "New soffit installation project",
  },
  {
    id: "063",
    src: "/images/gallery/063.jpg",
    category: "soffit",
    title: "Fascia & Trim",
    location: "Southfield, MI",
    description: "Fascia replacement with metal trim work",
  },
  {
    id: "064",
    src: "/images/gallery/064.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Canton, MI",
    description: "Fascia board with integrated gutter system",
  },
  {
    id: "065",
    src: "/images/gallery/065.jpg",
    category: "soffit",
    title: "Fascia Project",
    location: "Novi, MI",
    description: "Complete fascia installation and repair",
  },
  {
    id: "066",
    src: "/images/gallery/066.jpg",
    category: "soffit",
    title: "Soffit Work",
    location: "Garden City, MI",
    description: "Professional soffit installation",
  },
  {
    id: "067",
    src: "/images/gallery/067.jpg",
    category: "soffit",
    title: "Fascia Replacement",
    location: "Dearborn, MI",
    description: "Complete fascia board replacement project",
  },
  {
    id: "068",
    src: "/images/gallery/068.jpg",
    category: "soffit",
    title: "Soffit Detail",
    location: "Wayne, MI",
    description: "Precision soffit installation work",
  },
  {
    id: "069",
    src: "/images/gallery/069.jpg",
    category: "soffit",
    title: "Fascia Installation",
    location: "Taylor, MI",
    description: "Metal fascia installation with gutters",
  },
  {
    id: "070",
    src: "/images/gallery/070.jpg",
    category: "soffit",
    title: "Gutter Fascia",
    location: "Southgate, MI",
    description: "Fascia and gutter installation",
  },
  {
    id: "071",
    src: "/images/gallery/071.jpg",
    category: "residential",
    title: "Gutter Installation",
    location: "Westland, MI",
    description: "Complete home gutter system",
  },
  {
    id: "072",
    src: "/images/gallery/057.jpg",
    category: "commercial",
    title: "Commercial Gutter System",
    location: "Livonia, MI",
    description: "Heavy-duty commercial gutter installation for large building",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a gallery image by its ID (e.g., "001", "002", etc.)
 */
export function getGalleryImage(id: string): GalleryImage | undefined {
  return GALLERY_IMAGES.find((img) => img.id === id);
}

/**
 * Get gallery images by category
 */
export function getGalleryImagesByCategory(
  category: GalleryCategory
): GalleryImage[] {
  return GALLERY_IMAGES.filter((img) => img.category === category);
}

/**
 * Get the src path for a gallery image by ID
 * Returns a fallback if not found
 */
export function getGalleryImageSrc(id: string, fallback = BRAND.logo): string {
  return getGalleryImage(id)?.src ?? fallback;
}

/**
 * Convert gallery images to the format expected by Convex initialization
 */
export function getGalleryImagesForConvex() {
  return GALLERY_IMAGES.map(
    ({ src, category, title, location, description }) => ({
      src,
      category,
      title,
      location,
      description,
    })
  );
}

// ============================================================================
// SERVICE IMAGE MAPPINGS
// Maps service section IDs to their corresponding gallery images
// ============================================================================

export const SERVICE_IMAGES: Record<string, string> = {
  installation: getGalleryImageSrc("001"),
  repair: getGalleryImageSrc("005"),
  "leaf-guards": getGalleryImageSrc("049"),
  "soffit-fascia": getGalleryImageSrc("032"),
  commercial: getGalleryImageSrc("072"),
} as const;

// ============================================================================
// FEATURED/SHOWCASE IMAGES
// Images used in specific sections throughout the site
// ============================================================================

export const FEATURED_PROJECT_IDS = ["001", "002", "003", "048"] as const;

export const TESTIMONIAL_BACKGROUND_IDS = [
  "021",
  "033",
  "050",
  "058",
  "059",
  "060",
] as const;

/**
 * Get featured project images for the homepage showcase
 */
export function getFeaturedProjects(): GalleryImage[] {
  return FEATURED_PROJECT_IDS.map((id) => getGalleryImage(id)).filter(
    (img): img is GalleryImage => img !== undefined
  );
}

/**
 * Get testimonial background images
 */
export function getTestimonialBackgrounds(): GalleryImage[] {
  return TESTIMONIAL_BACKGROUND_IDS.map((id) => getGalleryImage(id)).filter(
    (img): img is GalleryImage => img !== undefined
  );
}
