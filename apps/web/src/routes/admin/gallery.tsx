import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { Eye, EyeOff, GripVertical, Pencil, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGalleryPage,
  head: () => ({
    meta: [
      {
        title: "Gallery Admin | BTG Gutters CMS",
      },
    ],
  }),
});

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

type EditingItem = Partial<GalleryItem> | null;

const CATEGORIES = [
  { id: "all", name: "All Projects" },
  { id: "residential", name: "Residential Gutters" },
  { id: "commercial", name: "Commercial Gutters" },
  { id: "guards", name: "Leaf/Gutter Guards" },
  { id: "soffit", name: "Soffit & Fascia" },
];

// Sortable Item Component
function SortableGalleryItem({
  item,
  onEdit,
  onToggleVisibility,
  onDelete,
}: {
  item: GalleryItem;
  onEdit: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`group relative flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all ${
        isDragging
          ? "opacity-50 shadow-lg ring-2 ring-primary"
          : "hover:shadow-md"
      } ${item.isVisible ? "" : "opacity-60"}`}
      ref={setNodeRef}
      style={style}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Thumbnail */}
      <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/logo.png";
          }}
          src={item.src}
        />
        {!item.isVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <EyeOff className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.location}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800 text-xs dark:bg-green-900 dark:text-green-100">
            {item.category}
          </span>
          <span className="text-muted-foreground text-xs">
            Order: {item.sortOrder}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          onClick={onToggleVisibility}
          size="icon"
          title={item.isVisible ? "Hide" : "Show"}
          variant="ghost"
        >
          {item.isVisible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
        <Button onClick={onEdit} size="icon" title="Edit" variant="ghost">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          className="text-destructive hover:text-destructive"
          onClick={onDelete}
          size="icon"
          title="Delete"
          variant="ghost"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Drag Overlay Item Component
function DragOverlayItem({ item }: { item: GalleryItem }) {
  return (
    <div className="relative flex items-center gap-4 rounded-lg border bg-card p-4 shadow-lg ring-2 ring-primary">
      <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/logo.png";
          }}
          src={item.src}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.location}</p>
      </div>
    </div>
  );
}

function AdminGalleryPage() {
  // Data
  const galleryItems = useQuery(api.gallery.getAllGalleryItems);
  const updateMutation = useMutation(api.gallery.updateGalleryItem);
  const deleteMutation = useMutation(api.gallery.deleteGalleryItem);
  const reorderMutation = useMutation(api.gallery.batchReorderGalleryItems);
  const initializeMutation = useMutation(
    api.gallery.initializeGalleryFromStatic
  );

  // State
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<EditingItem>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter and sort items
  const filteredItems = galleryItems
    ?.filter((item) => {
      const matchesCategory = filter === "all" || item.category === filter;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const activeItem = activeId
    ? galleryItems?.find((item) => item._id === activeId)
    : null;

  // Handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!(over && filteredItems)) return;

      const activeItemIndex = filteredItems.findIndex(
        (item) => item._id === active.id
      );
      const overItemIndex = filteredItems.findIndex(
        (item) => item._id === over.id
      );

      if (activeItemIndex === overItemIndex) return;

      // Create new order array
      const newItems = [...filteredItems];
      const [removed] = newItems.splice(activeItemIndex, 1);
      newItems.splice(overItemIndex, 0, removed);

      // Update sort orders
      const updates = newItems.map((item, index) => ({
        id: item._id as any,
        sortOrder: index,
      }));

      await reorderMutation({ items: updates });
    },
    [filteredItems, reorderMutation]
  );

  const handleToggleVisibility = useCallback(
    async (item: GalleryItem) => {
      await updateMutation({
        id: item._id as any,
        isVisible: !item.isVisible,
      });
    },
    [updateMutation]
  );

  const handleDelete = useCallback(
    async (item: GalleryItem) => {
      if (confirm(`Delete "${item.title}"? This cannot be undone.`)) {
        await deleteMutation({ id: item._id as any });
      }
    },
    [deleteMutation]
  );

  const handleSaveEdit = useCallback(
    async (updates: Partial<GalleryItem>) => {
      if (!editingItem) return;

      await updateMutation({
        id: editingItem._id as any,
        ...updates,
      });
      setEditingItem(null);
    },
    [updateMutation, editingItem]
  );

  // Loading state
  if (galleryItems === undefined) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
            <p className="mt-2 text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state - show initialize button
  if (galleryItems.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="max-w-md text-center">
            <h1 className="mb-4 font-bold text-2xl">Gallery Management</h1>
            <p className="mb-6 text-muted-foreground">
              Your gallery is empty. Import the existing static gallery data to
              get started.
            </p>
            <Button
              onClick={() => {
                const staticItems = [
                  {
                    src: "/images/gallery/001.jpg",
                    category: "residential",
                    title: "Premium Seamless Gutter Installation",
                    location: "Garden City, MI",
                    description:
                      "Custom seamless aluminum gutter system installation with precise pitch for optimal drainage",
                  },
                  {
                    src: "/images/gallery/002.jpg",
                    category: "residential",
                    title: "Complete Home Gutter System",
                    location: "Livonia, MI",
                    description:
                      "Full home gutter replacement with 6-inch seamless aluminum gutters",
                  },
                  {
                    src: "/images/gallery/003.jpg",
                    category: "residential",
                    title: "Gutter Installation in Progress",
                    location: "Plymouth, MI",
                    description:
                      "Professional installation of new seamless gutter system with leaf guard compatibility",
                  },
                  {
                    src: "/images/gallery/004.jpg",
                    category: "residential",
                    title: "Downspout Installation",
                    location: "Southfield, MI",
                    description:
                      "Proper downspout placement for effective water drainage",
                  },
                  {
                    src: "/images/gallery/005.jpg",
                    category: "residential",
                    title: "Gutter Repair Project",
                    location: "Farmington Hills, MI",
                    description:
                      "Expert repair and replacement of damaged gutter sections",
                  },
                  {
                    src: "/images/gallery/006.jpg",
                    category: "residential",
                    title: "Color-Matched Gutters",
                    location: "Northville, MI",
                    description:
                      "50+ color options available to match any home exterior",
                  },
                  {
                    src: "/images/gallery/007.jpg",
                    category: "residential",
                    title: "Seamless Gutter Close-Up",
                    location: "Novi, MI",
                    description:
                      "Clean professional finish with concealed hangers every 12-18 inches",
                  },
                  {
                    src: "/images/gallery/008.jpg",
                    category: "residential",
                    title: "Gutter System Installation",
                    location: "Westland, MI",
                    description:
                      "Complete gutter system installation with proper pitch and drainage",
                  },
                  {
                    src: "/images/gallery/009.jpg",
                    category: "residential",
                    title: "Residential Gutter Project",
                    location: "Canton, MI",
                    description:
                      "Quality residential installation with premium aluminum materials",
                  },
                  {
                    src: "/images/gallery/010.jpg",
                    category: "residential",
                    title: "Multi-Story Home Gutters",
                    location: "Dearborn, MI",
                    description:
                      "Seamless gutters for multi-story residential home",
                  },
                  {
                    src: "/images/gallery/011.jpg",
                    category: "residential",
                    title: "Downspout Work",
                    location: "Taylor, MI",
                    description:
                      "Custom downspout configuration for proper water flow",
                  },
                  {
                    src: "/images/gallery/012.jpg",
                    category: "residential",
                    title: "Corner Installation",
                    location: "Romulus, MI",
                    description:
                      "Seamless corner pieces for complete gutter system",
                  },
                  {
                    src: "/images/gallery/013.jpg",
                    category: "residential",
                    title: "Gutter Installation",
                    location: "Inkster, MI",
                    description: "New seamless aluminum gutter installation",
                  },
                  {
                    src: "/images/gallery/014.jpg",
                    category: "residential",
                    title: "Complete System",
                    location: "Wayne, MI",
                    description:
                      "Full home gutter system with matching accessories",
                  },
                  {
                    src: "/images/gallery/015.jpg",
                    category: "residential",
                    title: "Residential Installation",
                    location: "Redford, MI",
                    description:
                      "Clean installation of seamless aluminum gutters",
                  },
                  {
                    src: "/images/gallery/016.jpg",
                    category: "residential",
                    title: "Gutter Replacement",
                    location: "Melvindale, MI",
                    description:
                      "Old gutter removal and new system installation",
                  },
                  {
                    src: "/images/gallery/017.jpg",
                    category: "residential",
                    title: "Downspout Setup",
                    location: "Southgate, MI",
                    description:
                      "Proper downspout configuration for water drainage",
                  },
                  {
                    src: "/images/gallery/018.jpg",
                    category: "residential",
                    title: "Residential Project",
                    location: "Wyandotte, MI",
                    description: "Complete home gutter system installation",
                  },
                  {
                    src: "/images/gallery/019.jpg",
                    category: "residential",
                    title: "Gutter Work",
                    location: "Clinton, MI",
                    description: "Quality residential gutter installation",
                  },
                  {
                    src: "/images/gallery/020.jpg",
                    category: "residential",
                    title: "System Installation",
                    location: "Sterling Heights, MI",
                    description: "Seamless aluminum gutter system for home",
                  },
                  {
                    src: "/images/gallery/021.jpg",
                    category: "residential",
                    title: "Installation In Progress",
                    location: "Oak Park, MI",
                    description: "Mid-project seamless gutter installation",
                  },
                  {
                    src: "/images/gallery/022.jpg",
                    category: "residential",
                    title: "Gutter Setup",
                    location: "Livonia, MI",
                    description: "Initial setup of new gutter system",
                  },
                  {
                    src: "/images/gallery/023.jpg",
                    category: "residential",
                    title: "Installation Detail",
                    location: "Plymouth, MI",
                    description:
                      "Concealed hangers installed every 12-18 inches",
                  },
                  {
                    src: "/images/gallery/024.jpg",
                    category: "residential",
                    title: "Residential Work",
                    location: "Garden City, MI",
                    description:
                      "Quality craftsmanship on home gutter installation",
                  },
                  {
                    src: "/images/gallery/025.jpg",
                    category: "residential",
                    title: "Gutter Project",
                    location: "Southfield, MI",
                    description: "Complete residential gutter installation",
                  },
                  {
                    src: "/images/gallery/026.jpg",
                    category: "residential",
                    title: "Installation",
                    location: "Novi, MI",
                    description:
                      "Seamless aluminum gutters for residential property",
                  },
                  {
                    src: "/images/gallery/027.jpg",
                    category: "residential",
                    title: "Gutter System",
                    location: "Farmington, MI",
                    description: "Full gutter system with proper drainage",
                  },
                  {
                    src: "/images/gallery/028.jpg",
                    category: "residential",
                    title: "Installation Work",
                    location: "Northville, MI",
                    description:
                      "Professional installation with quality materials",
                  },
                  {
                    src: "/images/gallery/029.jpg",
                    category: "residential",
                    title: "Residential Gutter",
                    location: "Dearborn, MI",
                    description: "Custom gutters for home exterior",
                  },
                  {
                    src: "/images/gallery/030.jpg",
                    category: "residential",
                    title: "Installation",
                    location: "Taylor, MI",
                    description: "Seamless gutter installation for home",
                  },
                  {
                    src: "/images/gallery/031.jpg",
                    category: "residential",
                    title: "Gutter Setup",
                    location: "Wayne, MI",
                    description: "New gutter system installation",
                  },
                  {
                    src: "/images/gallery/032.jpg",
                    category: "soffit",
                    title: "Gutter & Fascia Installation",
                    location: "Romulus, MI",
                    description:
                      "Complete gutter and fascia system installation",
                  },
                  {
                    src: "/images/gallery/033.jpg",
                    category: "soffit",
                    title: "Downspout & Fascia",
                    location: "Redford, MI",
                    description: "Fascia replacement with downspout work",
                  },
                  {
                    src: "/images/gallery/034.jpg",
                    category: "soffit",
                    title: "Commercial Fascia",
                    location: "Livonia, MI",
                    description:
                      "Metal fascia installation for commercial building",
                  },
                  {
                    src: "/images/gallery/035.jpg",
                    category: "soffit",
                    title: "Gutter Fascia",
                    location: "Inkster, MI",
                    description: "Fascia repair and gutter hanger installation",
                  },
                  {
                    src: "/images/gallery/036.jpg",
                    category: "soffit",
                    title: "Fascia Replacement",
                    location: "Westland, MI",
                    description: "Complete fascia board replacement",
                  },
                  {
                    src: "/images/gallery/037.jpg",
                    category: "soffit",
                    title: "Soffit Installation",
                    location: "Southfield, MI",
                    description: "New soffit with integrated gutter system",
                  },
                  {
                    src: "/images/gallery/038.jpg",
                    category: "soffit",
                    title: "Fascia Work",
                    location: "Canton, MI",
                    description: "Fascia repair and metal trim installation",
                  },
                  {
                    src: "/images/gallery/039.jpg",
                    category: "soffit",
                    title: "Soffit & Fascia",
                    location: "Dearborn, MI",
                    description:
                      "Complete soffit and fascia replacement project",
                  },
                  {
                    src: "/images/gallery/040.jpg",
                    category: "soffit",
                    title: "Fascia Detail",
                    location: "Novi, MI",
                    description: "Precision fascia work with color matching",
                  },
                  {
                    src: "/images/gallery/041.jpg",
                    category: "soffit",
                    title: "Gutter Fascia",
                    location: "Garden City, MI",
                    description: "Fascia installation with concealed hangers",
                  },
                  {
                    src: "/images/gallery/042.jpg",
                    category: "soffit",
                    title: "Soffit Replacement",
                    location: "Wayne, MI",
                    description: "Old soffit removal and new installation",
                  },
                  {
                    src: "/images/gallery/043.jpg",
                    category: "soffit",
                    title: "Fascia Project",
                    location: "Taylor, MI",
                    description: "Complete fascia and trim installation",
                  },
                  {
                    src: "/images/gallery/044.jpg",
                    category: "soffit",
                    title: "Soffit Work",
                    location: "Wyandotte, MI",
                    description: "Professional soffit installation",
                  },
                  {
                    src: "/images/gallery/045.jpg",
                    category: "soffit",
                    title: "Fascia Installation",
                    location: "Southgate, MI",
                    description: "Metal fascia with color coordination",
                  },
                  {
                    src: "/images/gallery/046.jpg",
                    category: "soffit",
                    title: "Soffit & Fascia",
                    location: "Redford, MI",
                    description: "Complete soffit and fascia system",
                  },
                  {
                    src: "/images/gallery/047.jpg",
                    category: "soffit",
                    title: "Fascia Replacement",
                    location: "Melvindale, MI",
                    description: "Fascia board replacement project",
                  },
                  {
                    src: "/images/gallery/048.jpg",
                    category: "guards",
                    title: "Plastic Leaf Guard",
                    location: "Livonia, MI",
                    description:
                      "Durable plastic guard over gutter to keep it free of leaves",
                  },
                  {
                    src: "/images/gallery/049.jpg",
                    category: "guards",
                    title: "Mesh Leaf Guard",
                    location: "Plymouth, MI",
                    description:
                      "Mesh guards prevent leaves and large debris from entering gutters",
                  },
                  {
                    src: "/images/gallery/050.jpg",
                    category: "guards",
                    title: "Leaf Guard Installation",
                    location: "Farmington Hills, MI",
                    description:
                      "Professional leaf guard installation for year-round protection",
                  },
                  {
                    src: "/images/gallery/051.jpg",
                    category: "guards",
                    title: "Gutter Guard Detail",
                    location: "Southfield, MI",
                    description: "Close-up of installed gutter guard system",
                  },
                  {
                    src: "/images/gallery/052.jpg",
                    category: "guards",
                    title: "Mesh Guard System",
                    location: "Novi, MI",
                    description:
                      "Complete mesh guard installation for debris prevention",
                  },
                  {
                    src: "/images/gallery/053.jpg",
                    category: "guards",
                    title: "Plastic Guard",
                    location: "Dearborn, MI",
                    description:
                      "Plastic guard over gutter on a roof for debris protection",
                  },
                  {
                    src: "/images/gallery/054.jpg",
                    category: "guards",
                    title: "Closeup Guard",
                    location: "Garden City, MI",
                    description: "Closeup of gutters with leaf guard installed",
                  },
                  {
                    src: "/images/gallery/055.jpg",
                    category: "guards",
                    title: "Guard Installation",
                    location: "Westland, MI",
                    description:
                      "Professional installation of gutter guard system",
                  },
                  {
                    src: "/images/gallery/056.jpg",
                    category: "guards",
                    title: "Mesh Guards",
                    location: "Taylor, MI",
                    description:
                      "Mesh guards over troughs prevent debris and clogging",
                  },
                  {
                    src: "/images/gallery/057.jpg",
                    category: "guards",
                    title: "Commercial Gutters & Guards",
                    location: "Livonia, MI",
                    description:
                      "Heavy-duty commercial gutters with leaf guard protection",
                  },
                  {
                    src: "/images/gallery/058.jpg",
                    category: "residential",
                    title: "New Gutters 2025",
                    location: "Garden City, MI",
                    description: "High-quality seamless gutter installation",
                  },
                  {
                    src: "/images/gallery/059.jpg",
                    category: "residential",
                    title: "Residential System",
                    location: "Livonia, MI",
                    description: "Complete gutter system for home",
                  },
                  {
                    src: "/images/gallery/060.jpg",
                    category: "residential",
                    title: "Premium Installation",
                    location: "Garden City, MI",
                    description:
                      "Premium seamless aluminum gutter installation",
                  },
                  {
                    src: "/images/gallery/061.jpg",
                    category: "soffit",
                    title: "Gutter & Soffit",
                    location: "Plymouth, MI",
                    description: "Integrated gutter and soffit installation",
                  },
                  {
                    src: "/images/gallery/062.jpg",
                    category: "soffit",
                    title: "Soffit Installation",
                    location: "Westland, MI",
                    description: "New soffit installation project",
                  },
                  {
                    src: "/images/gallery/063.jpg",
                    category: "soffit",
                    title: "Fascia & Trim",
                    location: "Southfield, MI",
                    description: "Fascia replacement with metal trim work",
                  },
                  {
                    src: "/images/gallery/064.jpg",
                    category: "soffit",
                    title: "Gutter Fascia",
                    location: "Canton, MI",
                    description: "Fascia board with integrated gutter system",
                  },
                  {
                    src: "/images/gallery/065.jpg",
                    category: "soffit",
                    title: "Fascia Project",
                    location: "Novi, MI",
                    description: "Complete fascia installation and repair",
                  },
                  {
                    src: "/images/gallery/066.jpg",
                    category: "soffit",
                    title: "Soffit Work",
                    location: "Garden City, MI",
                    description: "Professional soffit installation",
                  },
                  {
                    src: "/images/gallery/067.jpg",
                    category: "soffit",
                    title: "Fascia Replacement",
                    location: "Dearborn, MI",
                    description: "Complete fascia board replacement project",
                  },
                  {
                    src: "/images/gallery/068.jpg",
                    category: "soffit",
                    title: "Soffit Detail",
                    location: "Wayne, MI",
                    description: "Precision soffit installation work",
                  },
                  {
                    src: "/images/gallery/069.jpg",
                    category: "soffit",
                    title: "Fascia Installation",
                    location: "Taylor, MI",
                    description: "Metal fascia installation with gutters",
                  },
                  {
                    src: "/images/gallery/070.jpg",
                    category: "soffit",
                    title: "Gutter Fascia",
                    location: "Southgate, MI",
                    description: "Fascia and gutter installation",
                  },
                  {
                    src: "/images/gallery/071.jpg",
                    category: "residential",
                    title: "Gutter Installation",
                    location: "Westland, MI",
                    description: "Complete home gutter system",
                  },
                  {
                    src: "/images/gallery/072.jpg",
                    category: "commercial",
                    title: "Commercial Gutter System",
                    location: "Livonia, MI",
                    description:
                      "Heavy-duty commercial gutter installation for large building",
                  },
                ];
                initializeMutation({ items: staticItems });
              }}
            >
              Import Existing Gallery Images
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Gallery Management</h1>
        <p className="mt-1 text-muted-foreground">
          Drag and drop to reorder images. Changes are saved automatically.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => setFilter(category.id)}
              size="sm"
              variant={filter === category.id ? "default" : "outline"}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <Input
          className="max-w-xs"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search images..."
          value={searchQuery}
        />
      </div>

      {/* Stats */}
      <div className="mb-6 flex items-center gap-4 text-muted-foreground text-sm">
        <span>{filteredItems?.length ?? 0} images</span>
        <span>•</span>
        <span>{galleryItems.filter((i) => i.isVisible).length} visible</span>
        <span>•</span>
        <span>{galleryItems.filter((i) => !i.isVisible).length} hidden</span>
      </div>

      {/* Gallery Grid */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext
          items={filteredItems?.map((item) => item._id) ?? []}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {filteredItems?.map((item) => (
              <SortableGalleryItem
                item={item as GalleryItem}
                key={item._id}
                onDelete={() => handleDelete(item as GalleryItem)}
                onEdit={() => setEditingItem(item as GalleryItem)}
                onToggleVisibility={() =>
                  handleToggleVisibility(item as GalleryItem)
                }
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <DragOverlayItem item={activeItem as GalleryItem} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Empty Filter Result */}
      {filteredItems && filteredItems.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No images match your filters.
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        onOpenChange={(open: boolean) => !open && setEditingItem(null)}
        open={!!editingItem}
      >
        <DialogContent
          className="sm:max-w-md"
          onOpenChange={(open: boolean) => !open && setEditingItem(null)}
          open={!!editingItem}
        >
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img
                  alt={editingItem.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/logo.png";
                  }}
                  src={editingItem.src}
                />
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    value={editingItem.title}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        location: e.target.value,
                      })
                    }
                    value={editingItem.location}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="edit-category"
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      })
                    }
                    value={editingItem.category}
                  >
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <textarea
                    className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="edit-description"
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    value={editingItem.description}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button onClick={() => setEditingItem(null)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleSaveEdit({
                      title: editingItem.title,
                      location: editingItem.location,
                      category: editingItem.category,
                      description: editingItem.description,
                    })
                  }
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
