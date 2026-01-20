import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
  Eye,
  EyeOff,
  Image as ImageIcon,
  Maximize2,
  Move,
  RotateCcw,
  Save,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/section")({
  component: SectionEditorPage,
  head: () => ({
    meta: [
      {
        title: "Section Editor | BTG Gutters CMS",
      },
    ],
  }),
});

type SectionConfig = {
  _id: string;
  _creationTime: number;
  sectionId: string;
  imageSrc?: string;
  imageAlt?: string;
  positionX?: number;
  positionY?: number;
  scale?: number;
  isVisible?: boolean;
  customContent?: string;
  createdAt: number;
  updatedAt: number;
};

type SectionDefinition = {
  id: string;
  name: string;
  description: string;
  category: string;
};

const SECTIONS: SectionDefinition[] = [
  // Hero Section
  {
    id: "hero",
    name: "Hero Section",
    description: "Main banner with background image",
    category: "Hero",
  },
  // Services
  {
    id: "services-installation",
    name: "Service: Installation",
    description: "Gutter installation service card",
    category: "Services",
  },
  {
    id: "services-guards",
    name: "Service: Leaf Guards",
    description: "Leaf guard service card",
    category: "Services",
  },
  {
    id: "services-repair",
    name: "Service: Repair",
    description: "Gutter repair service card",
    category: "Services",
  },
  {
    id: "services-soffit",
    name: "Service: Soffit & Fascia",
    description: "Soffit and fascia service card",
    category: "Services",
  },
  {
    id: "services-commercial",
    name: "Service: Commercial",
    description: "Commercial gutters service card",
    category: "Services",
  },
  {
    id: "services-cleaning",
    name: "Service: Cleaning",
    description: "Gutter cleaning service card",
    category: "Services",
  },
  // Project Showcase
  {
    id: "project-1",
    name: "Project 1",
    description: "Featured project image 1",
    category: "Projects",
  },
  {
    id: "project-2",
    name: "Project 2",
    description: "Featured project image 2",
    category: "Projects",
  },
  {
    id: "project-3",
    name: "Project 3",
    description: "Featured project image 3",
    category: "Projects",
  },
  {
    id: "project-4",
    name: "Project 4",
    description: "Featured project image 4",
    category: "Projects",
  },
];

// Get unique categories
const CATEGORIES = [...new Set(SECTIONS.map((s) => s.category))];

function SectionEditorPage() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>("hero");
  const [localConfig, setLocalConfig] = useState<Partial<SectionConfig>>({
    positionX: 50,
    positionY: 50,
    scale: 100,
    isVisible: true,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Fetch current config
  const currentConfig = useQuery(api.sectionConfig.getSectionConfig, {
    sectionId: selectedSectionId,
  });

  // Mutations
  const upsertMutation = useMutation(api.sectionConfig.upsertSectionConfig);
  const initDefaults = useMutation(api.sectionConfig.initializeDefaultSections);

  // Update local config when database config changes
  useEffect(() => {
    if (currentConfig) {
      setLocalConfig({
        sectionId: currentConfig.sectionId,
        imageSrc: currentConfig.imageSrc,
        imageAlt: currentConfig.imageAlt,
        positionX: currentConfig.positionX ?? 50,
        positionY: currentConfig.positionY ?? 50,
        scale: currentConfig.scale ?? 100,
        isVisible: currentConfig.isVisible ?? true,
      });
      setPreviewUrl(currentConfig.imageSrc || "");
      setHasChanges(false);
    } else {
      // Initialize with defaults for new sections
      setLocalConfig({
        sectionId: selectedSectionId,
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      });
      setHasChanges(false);
    }
  }, [currentConfig, selectedSectionId]);

  // Handle image selection
  const handleImageSelect = (src: string) => {
    setPreviewUrl(src);
    setLocalConfig((prev) => ({ ...prev, imageSrc: src }));
    setHasChanges(true);
  };

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle mouse move (dragging)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!(isDragging && imageContainerRef.current)) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Convert pixels to percentage
      const containerRect = imageContainerRef.current.getBoundingClientRect();
      const deltaXPercent = (deltaX / containerRect.width) * 100;
      const deltaYPercent = (deltaY / containerRect.height) * 100;

      const newPositionX = Math.max(
        0,
        Math.min(100, (localConfig.positionX || 50) - deltaXPercent)
      );
      const newPositionY = Math.max(
        0,
        Math.min(100, (localConfig.positionY || 50) - deltaYPercent)
      );

      setLocalConfig((prev) => ({
        ...prev,
        positionX: newPositionX,
        positionY: newPositionY,
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, dragStart, localConfig.positionX, localConfig.positionY]
  );

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setHasChanges(true);
    }
  }, [isDragging]);

  // Handle scale change
  const handleScaleChange = (value: number) => {
    setLocalConfig((prev) => ({ ...prev, scale: value }));
    setHasChanges(true);
  };

  // Handle save
  const handleSave = async () => {
    await upsertMutation({
      sectionId: selectedSectionId,
      imageSrc: localConfig.imageSrc,
      imageAlt: localConfig.imageAlt,
      positionX: localConfig.positionX,
      positionY: localConfig.positionY,
      scale: localConfig.scale,
      isVisible: localConfig.isVisible,
    });
    setHasChanges(false);
  };

  // Handle reset
  const handleReset = () => {
    setLocalConfig({
      sectionId: selectedSectionId,
      positionX: 50,
      positionY: 50,
      scale: 100,
      isVisible: true,
    });
    setHasChanges(true);
  };

  // Handle initialize defaults
  const handleInitializeDefaults = async () => {
    await initDefaults({});
    // Refetch will happen automatically
  };

  // Get current section definition
  const currentSection = SECTIONS.find((s) => s.id === selectedSectionId);

  // Available images (from gallery)
  const galleryItems = useQuery(api.gallery.getAllGalleryItems);
  const availableImages =
    galleryItems?.map((item) => ({
      src: item.src,
      title: item.title,
    })) || [];

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-muted-foreground text-sm">
            <a className="hover:text-foreground" href="/admin/gallery">
              CMS
            </a>
            <span>/</span>
            <span>Section Editor</span>
          </div>
          <h1 className="font-bold text-3xl">Visual Section Editor</h1>
          <p className="mt-1 text-muted-foreground">
            Drag images to pan, adjust zoom, and position content visually
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleInitializeDefaults} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Initialize Defaults
          </Button>
          <Button disabled={!hasChanges} onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Left Sidebar - Section Selection */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 font-semibold">Select Section</h2>

            {/* Category Filter */}
            <div className="mb-4">
              <Select
                onValueChange={(value: string) => {
                  const firstInCategory = SECTIONS.find(
                    (s) => s.category === value
                  );
                  if (firstInCategory) setSelectedSectionId(firstInCategory.id);
                }}
                value={SECTIONS.find((s) => s.category)?.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section List */}
            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {SECTIONS.filter(
                (s) => !CATEGORIES || s.category === CATEGORIES[0]
              ).map((section) => (
                <button
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedSectionId === section.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                >
                  <div className="font-medium">{section.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {section.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Image Editor */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">
                {currentSection?.name || "Section Editor"}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setLocalConfig((prev) => ({
                      ...prev,
                      isVisible: !prev.isVisible,
                    }));
                    setHasChanges(true);
                  }}
                  size="sm"
                  variant={localConfig.isVisible ? "default" : "outline"}
                >
                  {localConfig.isVisible ? (
                    <>
                      <Eye className="mr-1 h-4 w-4" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="mr-1 h-4 w-4" />
                      Hidden
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Image Preview Container */}
            <div
              className="relative aspect-video w-full cursor-move overflow-hidden rounded-lg border-2 border-muted-foreground/30 border-dashed bg-muted"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={imageContainerRef}
            >
              {previewUrl ? (
                <>
                  <img
                    alt={localConfig.imageAlt || "Preview"}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/logo.png";
                    }}
                    src={previewUrl}
                    style={{
                      objectPosition: `${localConfig.positionX || 50}% ${localConfig.positionY || 50}%`,
                      transform: `scale(${localConfig.scale || 100}%)`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.2s ease-out",
                    }}
                  />
                  {/* Drag indicator */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {isDragging && (
                      <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                        <Move className="h-4 w-4" />
                        Drop to position
                      </div>
                    )}
                    {!(isDragging || previewUrl) && (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <ImageIcon className="mb-2 h-12 w-12" />
                        <span>Select an image to begin</span>
                      </div>
                    )}
                  </div>
                  {/* Position indicator */}
                  <div className="absolute right-2 bottom-2 rounded bg-black/60 px-2 py-1 font-mono text-white text-xs">
                    X: {Math.round(localConfig.positionX || 50)}% Y:{" "}
                    {Math.round(localConfig.positionY || 50)}%
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12" />
                    <p>No image selected</p>
                    <p className="text-sm">Choose an image from the sidebar</p>
                  </div>
                </div>
              )}
            </div>

            {/* Scale Slider */}
            {previewUrl && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Maximize2 className="h-4 w-4" />
                    Zoom: {localConfig.scale || 100}%
                  </Label>
                </div>
                <input
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted"
                  max="200"
                  min="50"
                  onChange={(e) => handleScaleChange(Number(e.target.value))}
                  type="range"
                  value={localConfig.scale || 100}
                />
                <div className="mt-1 flex justify-between text-muted-foreground text-xs">
                  <span>50%</span>
                  <span>100%</span>
                  <span>200%</span>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
              <p className="mb-1 font-medium">Instructions:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Click and drag on the image to pan/position</li>
                <li>• Use the slider to zoom in/out</li>
                <li>• Select different images from the sidebar</li>
                <li>• Click "Save Changes" when done</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Image Selection */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 font-semibold">Available Images</h2>

            {/* Custom Image URL */}
            <div className="mb-4 space-y-2">
              <Label>Or enter image URL</Label>
              <div className="flex gap-2">
                <Input
                  onChange={(e) => {
                    handleImageSelect(e.target.value);
                  }}
                  placeholder="/images/..."
                  value={localConfig.imageSrc || ""}
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div className="max-h-[50vh] space-y-2 overflow-y-auto">
              {availableImages.map((img) => (
                <button
                  className={`w-full overflow-hidden rounded-lg border transition-all ${
                    previewUrl === img.src
                      ? "ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  key={img.src}
                  onClick={() => handleImageSelect(img.src)}
                >
                  <div className="flex items-center gap-3 p-2">
                    <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                      <img
                        alt={img.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/logo.png";
                        }}
                        src={img.src}
                      />
                    </div>
                    <div className="flex-1 truncate text-left text-sm">
                      {img.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Alt Text */}
            {previewUrl && (
              <div className="mt-4 space-y-2">
                <Label>Alt Text (for accessibility)</Label>
                <Input
                  onChange={(e) => {
                    setLocalConfig((prev) => ({
                      ...prev,
                      imageAlt: e.target.value,
                    }));
                    setHasChanges(true);
                  }}
                  placeholder="Describe the image..."
                  value={localConfig.imageAlt || ""}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasChanges && (
        <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-lg">
          <span>You have unsaved changes</span>
          <Button onClick={handleSave} size="sm" variant="secondary">
            Save Now
          </Button>
        </div>
      )}
    </div>
  );
}
