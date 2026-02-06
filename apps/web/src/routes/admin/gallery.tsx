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
import { getGalleryImagesForConvex } from "@/lib/images";

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
  const user = useQuery(api.auth.getCurrentUser);
  const access = useQuery(api.adminAccess.isCurrentUserAllowed);

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

  if (user === undefined || access === undefined) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  if (!(user && access.allowed)) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm">
            <h1 className="font-bold text-2xl">Admin access required</h1>
            <p className="mt-2 text-muted-foreground">
              Please sign in at{" "}
              <a className="underline" href="/admin">
                /admin
              </a>{" "}
              with an allowlisted account.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                initializeMutation({ items: getGalleryImagesForConvex() });
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
