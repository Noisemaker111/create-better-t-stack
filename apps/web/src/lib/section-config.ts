import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { useQuery } from "convex/react";

/**
 * Hook to get configuration for a specific section
 */
export function useSectionConfig(sectionId: string) {
  const config = useQuery(api.sectionConfig.getSectionConfig, { sectionId });
  return config;
}

/**
 * Hook to get styled image props based on section config
 */
export function useSectionImageStyle(sectionId: string) {
  const config = useSectionConfig(sectionId);

  if (!config?.imageSrc) {
    return null;
  }

  const positionX = config.positionX ?? 50;
  const positionY = config.positionY ?? 50;
  const clampedX = Math.max(0, Math.min(100, positionX));
  const clampedY = Math.max(0, Math.min(100, positionY));
  const scale = Math.max(100, config.scale ?? 100);

  return {
    src: config.imageSrc,
    alt: config.imageAlt || "",
    style: {
      objectPosition: `${clampedX}% ${clampedY}%`,
      transform: `scale(${scale / 100})`,
      transformOrigin: "center center",
    },
    isVisible: config.isVisible ?? true,
  };
}
