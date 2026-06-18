import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group">
      {/* Top accent bar */}
      <div className="w-10 h-px bg-[#B87333] mb-7" />

      <h3 className="font-newsreader text-2xl text-[#F5F1EA] mb-4 leading-tight">
        {service.name}
      </h3>

      <p className="font-inter text-base text-[#888782] leading-relaxed max-w-md mb-8">
        {service.description}
      </p>

      <a
        href="#contact"
        className="font-inter text-[11px] tracking-widest uppercase text-[#B87333] hover:text-[#D4A574] transition-colors duration-300 inline-flex items-center gap-1.5"
      >
        Learn more
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
