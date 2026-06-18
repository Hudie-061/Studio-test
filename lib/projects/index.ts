export interface ProjectData {
  slug: string;
  client: string;
  year: string;
  category: string;
  deliverable: string;
  heroGradient: string;
  accentColor: string;
  aspectRatio: string;
  videoEmbed?: string;
  nextProjectSlug?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug:          "forest-awakening",
    client:        "HAVN ANR · Belgian Premium Gin",
    year:          "2026",
    category:      "BRAND FILM · PREMIUM SPIRITS",
    deliverable:   "15s Brand Film · 9:16 + 16:9",
    heroGradient:  "linear-gradient(155deg, #1C1005 0%, #2D1E0A 30%, #3D2812 55%, #1A1005 80%, #0F0E0C 100%)",
    accentColor:   "#C8895A",
    aspectRatio:   "9/16",
    videoEmbed:    undefined,
    nextProjectSlug: undefined,
  },
];

export function getProject(slug: string): ProjectData | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
