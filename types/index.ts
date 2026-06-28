export interface ProjectMeta {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  category: string;
  title: string;
  editorialDesc: string;
  paragraph: string;
  thumbnailGradient: string;
  poster?: string;
  accentColor: string;
  aspectRatio: string;
  metadata: ProjectMeta[];
}

export interface Service {
  id: number;
  numeral: string;
  name: string;
  description: string;
}

export interface Principle {
  numeral: string;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

export type Language = "en" | "fr" | "nl";
