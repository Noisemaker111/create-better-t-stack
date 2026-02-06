import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Minus,
  Pencil,
  Plus,
  Settings2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { authClient } from "@/lib/auth-client";
import { useSectionConfig } from "@/lib/section-config";
import { Button } from "../ui/button";

interface EditableSectionImageProps {
  sectionId: string;
  fallbackSrc: string;
  fallbackAlt: string;
  className: string;
  usagePath: string;
  loading?: "lazy" | "eager";
  hideOnError?: boolean;
}

type EditorState =
  | { mode: "idle" }
  | { mode: "menu" }
  | { mode: "replacing" }
  | { mode: "nudging" };

interface DraftState {
  src: string;
  alt: string;
  positionX: number;
  positionY: number;
  scale: number;
}

const NUDGE_STEP = 1; // 1% per click for smoother movement
const ZOOM_STEP = 5; // 5% per click for finer control

function getImageTransformStyle({
  positionX,
  positionY,
  scale,
}: {
  positionX: number;
  positionY: number;
  scale: number;
}) {
  const clampedX = Math.max(0, Math.min(100, positionX));
  const clampedY = Math.max(0, Math.min(100, positionY));
  const clampedScale = Math.max(100, scale);

  return {
    objectFit: "cover" as const,
    objectPosition: `${clampedX}% ${clampedY}%`,
    transform: `scale(${clampedScale / 100})`,
    transformOrigin: "center center",
  } as const;
}

/**
 * Renders a component into a portal at the end of document.body
 */
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

function ActionMenu({
  onReplaceClick,
  onNudgeClick,
  onCancelClick,
}: {
  onReplaceClick: () => void;
  onNudgeClick: () => void;
  onCancelClick: () => void;
}) {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onCancelClick();
        }}
      >
        <div
          className="fade-in zoom-in w-56 animate-in rounded-xl border bg-card p-2 shadow-2xl duration-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          role="menu"
        >
          <div className="mb-2 border-b px-3 py-2">
            <p className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
              Admin Actions
            </p>
          </div>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors hover:bg-muted"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onReplaceClick();
            }}
            type="button"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Pencil className="h-3.5 w-3.5" />
            </div>
            Replace Picture
          </button>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors hover:bg-muted"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onNudgeClick();
            }}
            type="button"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Settings2 className="h-3.5 w-3.5" />
            </div>
            Nudge Position
          </button>
          <div className="my-2 border-t" />
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:bg-muted"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onCancelClick();
            }}
            type="button"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
              <X className="h-3.5 w-3.5" />
            </div>
            Cancel
          </button>
        </div>
      </div>
    </Portal>
  );
}

function NudgeControls({
  draft,
  isSaving,
  onAdjust,
  onCancel,
  onSave,
}: {
  draft: DraftState;
  isSaving: boolean;
  onAdjust: (updates: Partial<DraftState>) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const suppress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className="pointer-events-auto fixed right-6 bottom-6 z-[1000]"
        onClick={suppress}
        onMouseDown={suppress}
        onMouseUp={suppress}
      >
        <div
          className="fade-in slide-in-from-right-4 flex w-60 animate-in flex-col gap-3 rounded-2xl border border-primary/30 bg-card p-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] duration-300"
          onClick={suppress}
        >
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="font-black text-[9px] text-primary uppercase tracking-widest">
                Positioning
              </h3>
            </div>
            <span className="rounded-md bg-muted px-1.5 py-0.5 font-bold font-mono text-[9px] text-muted-foreground">
              {Math.round(draft.positionX)}%, {Math.round(draft.positionY)}%
            </span>
          </div>

          <div className="flex justify-center py-1">
            <div className="grid grid-cols-3 gap-1.5">
              <div />
              <Button
                className="h-9 w-9 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({
                    positionY: Math.max(0, draft.positionY - NUDGE_STEP),
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <div />
              <Button
                className="h-9 w-9 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({
                    positionX: Math.max(0, draft.positionX - NUDGE_STEP),
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center">
                <Settings2 className="h-3 w-3 text-muted-foreground/30" />
              </div>
              <Button
                className="h-9 w-9 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({
                    positionX: Math.min(100, draft.positionX + NUDGE_STEP),
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div />
              <Button
                className="h-9 w-9 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({
                    positionY: Math.min(100, draft.positionY + NUDGE_STEP),
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div />
            </div>
          </div>

          <div className="space-y-1.5 px-0.5">
            <div className="flex items-center justify-between font-black text-[8px] text-muted-foreground uppercase tracking-widest">
              <span>Zoom</span>
              <span className="text-primary">{draft.scale}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                className="h-8 flex-1 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({ scale: Math.max(50, draft.scale - ZOOM_STEP) });
                }}
                variant="outline"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <Button
                className="h-8 flex-1 rounded-lg"
                disabled={isSaving}
                onClick={(e) => {
                  suppress(e);
                  onAdjust({ scale: Math.min(200, draft.scale + ZOOM_STEP) });
                }}
                variant="outline"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex gap-1.5 pt-1">
            <Button
              className="h-9 flex-1 rounded-lg font-bold text-[10px]"
              disabled={isSaving}
              onClick={(e) => {
                suppress(e);
                onCancel();
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              className="h-9 flex-1 rounded-lg font-bold text-[10px] shadow-lg shadow-primary/10"
              disabled={isSaving}
              onClick={(e) => {
                suppress(e);
                onSave();
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

function GalleryPicker({
  galleryItems,
  selectedSrc,
  isSaving,
  onSelect,
  onCancel,
  onSave,
}: {
  galleryItems: Array<{ _id: string; src: string; title: string }>;
  selectedSrc: string;
  isSaving: boolean;
  onSelect: (src: string, alt: string) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const suppress = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        onClick={suppress}
        role="listbox"
      >
        <div
          className="fade-in zoom-in-95 relative flex max-h-[85vh] w-full max-w-4xl animate-in flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl duration-200"
          onClick={suppress}
        >
          <div className="flex items-center justify-between border-b bg-muted/30 p-6">
            <div>
              <h3 className="font-bold text-foreground text-xl">
                Select Image
              </h3>
              <p className="text-muted-foreground text-sm">
                Choose an image from your gallery
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="rounded-full"
                disabled={isSaving}
                onClick={onCancel}
                variant="secondary"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="rounded-full px-8 shadow-lg shadow-primary/20"
                disabled={isSaving}
                onClick={onSave}
              >
                <Check className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Set Image"}
              </Button>
            </div>
          </div>

          <div className="min-h-[300px] flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {galleryItems.map((item) => (
                <div className="relative aspect-video" key={item._id}>
                  <button
                    className={`group absolute inset-0 overflow-hidden rounded-2xl border-4 transition-all duration-300 ${
                      selectedSrc === item.src
                        ? "border-primary ring-4 ring-primary/20"
                        : "border-transparent hover:border-primary/40"
                    }`}
                    onClick={(event) => {
                      suppress(event);
                      onSelect(item.src, item.title);
                    }}
                    type="button"
                  >
                    <img
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.src}
                    />
                    <div className="absolute inset-0 flex items-end bg-black/20 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="w-full truncate rounded bg-black/60 px-1.5 py-0.5 font-bold text-[9px] text-white backdrop-blur-sm">
                        {item.title}
                      </p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

function SlotBadge({
  usagePath,
  sectionId,
}: {
  usagePath: string;
  sectionId: string;
}) {
  return (
    <div className="pointer-events-none absolute top-3 left-3 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 font-bold text-[9px] text-white uppercase tracking-widest shadow-xl backdrop-blur-md">
      <div className="h-1 w-1 rounded-full bg-[#1eeb00]" />
      <span>{usagePath}</span>
      <span className="opacity-40">/</span>
      <span className="text-[#1eeb00]">{sectionId}</span>
    </div>
  );
}

function useEscapeKey(editorMode: string, exitEditor: () => void) {
  useEffect(() => {
    if (editorMode === "idle") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        exitEditor();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editorMode, exitEditor]);
}

function EditorControls({
  editorState,
  draft,
  isSaving,
  galleryItems,
  onReplaceClick,
  onNudgeClick,
  onCancelClick,
  onSave,
  onSelectGalleryItem,
  onAdjust,
}: {
  editorState: EditorState;
  draft: DraftState;
  isSaving: boolean;
  galleryItems: Array<{ _id: string; src: string; title: string }>;
  onReplaceClick: () => void;
  onNudgeClick: () => void;
  onCancelClick: () => void;
  onSave: () => void;
  onSelectGalleryItem: (src: string, alt: string) => void;
  onAdjust: (updates: Partial<DraftState>) => void;
}) {
  if (editorState.mode === "menu") {
    return (
      <ActionMenu
        onCancelClick={onCancelClick}
        onNudgeClick={onNudgeClick}
        onReplaceClick={onReplaceClick}
      />
    );
  }

  if (editorState.mode === "replacing") {
    return (
      <GalleryPicker
        galleryItems={galleryItems}
        isSaving={isSaving}
        onCancel={onCancelClick}
        onSave={onSave}
        onSelect={onSelectGalleryItem}
        selectedSrc={draft.src}
      />
    );
  }

  if (editorState.mode === "nudging") {
    return (
      <NudgeControls
        draft={draft}
        isSaving={isSaving}
        onAdjust={onAdjust}
        onCancel={onCancelClick}
        onSave={onSave}
      />
    );
  }

  return null;
}

export function EditableSectionImage({
  sectionId,
  fallbackSrc,
  fallbackAlt,
  className,
  usagePath,
  loading = "lazy",
}: EditableSectionImageProps) {
  const { data: session } = authClient.useSession();
  const signedInEmail = session?.user?.email ?? null;
  const access = useQuery(
    api.adminAccess.isCurrentUserAllowed,
    signedInEmail ? {} : "skip"
  );
  const canEdit = access?.allowed ?? false;

  const config = useSectionConfig(sectionId);
  const galleryItems = useQuery(api.gallery.getAllGalleryItems);
  const upsertMutation = useMutation(api.sectionConfig.upsertSectionConfig);

  const currentSrc = config?.imageSrc ?? fallbackSrc;
  const currentAlt = config?.imageAlt ?? fallbackAlt;
  const positionX = config?.positionX ?? 50;
  const positionY = config?.positionY ?? 50;
  const scale = config?.scale ?? 100;
  const isVisible = config?.isVisible ?? true;

  const [editorState, setEditorState] = useState<EditorState>({ mode: "idle" });
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState<DraftState>({
    src: currentSrc,
    alt: currentAlt,
    positionX,
    positionY,
    scale,
  });

  useEffect(() => {
    setDraft({
      src: currentSrc,
      alt: currentAlt,
      positionX,
      positionY,
      scale,
    });
  }, [currentSrc, currentAlt, positionX, positionY, scale]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await upsertMutation({
        sectionId,
        imageSrc: draft.src,
        imageAlt: draft.alt,
        positionX: draft.positionX,
        positionY: draft.positionY,
        scale: draft.scale,
        isVisible: true,
      });
      setEditorState({ mode: "idle" });
    } finally {
      setIsSaving(false);
    }
  }, [upsertMutation, sectionId, draft]);

  const openMenu = useCallback(() => {
    setEditorState({ mode: "menu" });
  }, []);

  const enterReplaceMode = useCallback(() => {
    setEditorState({ mode: "replacing" });
  }, []);

  const enterNudgeMode = useCallback(() => {
    setEditorState({ mode: "nudging" });
  }, []);

  const exitEditor = useCallback(() => {
    setEditorState({ mode: "idle" });
  }, []);

  useEscapeKey(editorState.mode, exitEditor);

  const selectGalleryItem = useCallback((src: string, alt: string) => {
    setDraft((prev) => ({ ...prev, src, alt }));
  }, []);

  const adjustDraft = useCallback((updates: Partial<DraftState>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const displaySrc = editorState.mode !== "idle" ? draft.src : currentSrc;
  const displayAlt = editorState.mode !== "idle" ? draft.alt : currentAlt;
  const displayX = editorState.mode !== "idle" ? draft.positionX : positionX;
  const displayY = editorState.mode !== "idle" ? draft.positionY : positionY;
  const displayScale = editorState.mode !== "idle" ? draft.scale : scale;
  const isEditing = editorState.mode !== "idle";

  if (!(isVisible || canEdit)) {
    return null;
  }

  // Simple image rendering for non-admins
  if (!canEdit) {
    return (
      <img
        alt={currentAlt}
        className={`${className}`.trim()}
        height={300}
        loading={loading}
        src={currentSrc}
        style={getImageTransformStyle({ positionX, positionY, scale })}
        width={400}
      />
    );
  }

  // Admin version with click-to-edit
  return (
    <div
      className={`group/editable relative h-full w-full ${isEditing ? "z-[60] ring-4 ring-primary ring-offset-2" : ""}`}
    >
      <div
        className="h-full w-full cursor-pointer overflow-hidden rounded-[inherit]"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!isEditing) {
            openMenu();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <img
          alt={displayAlt}
          className={`${className}`.trim()}
          height={300}
          loading={loading}
          src={displaySrc}
          style={getImageTransformStyle({
            positionX: displayX,
            positionY: displayY,
            scale: displayScale,
          })}
          width={400}
        />
        {/* Hover overlay for admin */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 transition-opacity group-hover/editable:opacity-100">
          <div className="scale-90 rounded-full bg-primary px-3 py-1.5 font-black text-[9px] text-black shadow-lg transition-transform group-hover/editable:scale-100">
            CLICK TO EDIT IMAGE
          </div>
        </div>
      </div>

      <SlotBadge sectionId={sectionId} usagePath={usagePath} />

      <EditorControls
        draft={draft}
        editorState={editorState}
        galleryItems={galleryItems ?? []}
        isSaving={isSaving}
        onAdjust={adjustDraft}
        onCancelClick={exitEditor}
        onNudgeClick={enterNudgeMode}
        onReplaceClick={enterReplaceMode}
        onSave={handleSave}
        onSelectGalleryItem={selectGalleryItem}
      />
    </div>
  );
}
