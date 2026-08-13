import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-newsreader text-3xl md:text-4xl font-normal text-[#F5F1EA] mb-3 leading-tight">
      {children}
    </h1>
  );
}

export function Meta({ children }: { children: ReactNode }) {
  return (
    <p className="font-inter text-xs tracking-wide text-[#7A756C] mb-16">
      {children}
    </p>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-newsreader text-xl md:text-2xl font-normal text-[#F5F1EA] mt-14 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="font-inter text-[15px] leading-[1.75] text-[#C9C4BA] mb-4">
      {children}
    </p>
  );
}

export function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="font-inter text-[15px] leading-[1.75] text-[#C9C4BA] mb-4 pl-5 list-disc space-y-1.5">
      {children}
    </ul>
  );
}

export function Li({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-[#F5F1EA] font-medium">{children}</strong>;
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#C8895A] underline underline-offset-2 hover:text-[#F5F1EA] transition-colors duration-200"
    >
      {children}
    </a>
  );
}

export function Table({
  columns,
  rows,
}: {
  columns: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <div className="mb-4 overflow-x-auto border border-[rgba(245,241,234,0.1)]">
      <table className="w-full border-collapse font-inter text-sm">
        <thead>
          <tr className="border-b border-[rgba(245,241,234,0.1)]">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7A756C] font-normal"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[rgba(245,241,234,0.06)] last:border-0">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-[#C9C4BA] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
