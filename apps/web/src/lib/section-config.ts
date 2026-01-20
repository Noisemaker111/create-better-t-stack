import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { useQuery } from "convex/react";

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

/**
 * Hook to get configuration for a specific section
 */
export function useSectionConfig(sectionId: string) {
  const config = useQuery(api.sectionConfig.getSectionConfig, { sectionId });
  return config as SectionConfig | undefined;
}

/**
 * Hook to get styled image props based on section config
 */
export function useSectionImageStyle(sectionId: string) {
  const config = useSectionConfig(sectionId);

  if (!(config && config.imageSrc)) {
    return null;
  }

  return {
    src: config.imageSrc,
    alt: config.imageAlt || "",
    style: {
      objectPosition: `${config.positionX ?? 50}% ${config.positionY ?? 50}%`,
      transform: `scale(${config.scale ?? 100}%)`,
    },
    isVisible: config.isVisible ?? true,
  };
}
