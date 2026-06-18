interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-inter text-xs tracking-widest text-[#B87333] uppercase ${className}`}
    >
      {text}
    </p>
  );
}
