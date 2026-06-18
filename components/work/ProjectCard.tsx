/**
 * Legacy component — superseded by ProjectHero for the full-bleed treatment.
 * Kept for reference; not imported by any current page.
 */
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className="relative overflow-hidden aspect-[9/16]"
        style={{ background: project.thumbnailGradient }}
      />
      <div className="mt-5">
        <p className="font-inter text-[11px] tracking-widest uppercase text-[#C8895A]">
          {project.category}
        </p>
        <h3 className="font-newsreader text-2xl text-[#F5F1EA] mt-2">{project.title}</h3>
        <p className="font-inter text-sm text-[#A39E96] mt-1">{project.editorialDesc}</p>
      </div>
    </div>
  );
}
