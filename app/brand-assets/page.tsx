import type { ComponentType } from "react";
import { LogoMark } from "@/components/logo/LogoMark";
import { SymbolVariantA } from "@/components/symbol/variants/SymbolVariantA";
import { SymbolVariantB } from "@/components/symbol/variants/SymbolVariantB";
import { SymbolVariantC } from "@/components/symbol/variants/SymbolVariantC";
import { SymbolVariantD } from "@/components/symbol/variants/SymbolVariantD";
import type { SymbolVariantProps } from "@/components/symbol/variants/SymbolVariantA";
import SymbolVariantE from "@/components/symbol/variants/SymbolVariantE";
import SymbolVariantF from "@/components/symbol/variants/SymbolVariantF";
import SymbolVariantG from "@/components/symbol/variants/SymbolVariantG";
import SymbolVariantH from "@/components/symbol/variants/SymbolVariantH";
import SymbolVariantI from "@/components/symbol/variants/SymbolVariantI";
import SymbolVariantJ from "@/components/symbol/variants/SymbolVariantJ";

interface Variant {
  key: string;
  label: string;
  Component: ComponentType<SymbolVariantProps>;
}

const VARIANTS: Variant[] = [
  { key: "A", label: "Variant A — Newsreader Regular V", Component: SymbolVariantA },
  { key: "B", label: "Variant B — Newsreader Italic V", Component: SymbolVariantB },
  { key: "C", label: "Variant C — V in Circle", Component: SymbolVariantC },
  { key: "D", label: "Variant D — Geometric Chevron", Component: SymbolVariantD },
];

interface AlternativeVariant {
  key: string;
  label: string;
  description: string;
  Component: ComponentType<{ size?: number; className?: string }>;
}

const ALTERNATIVE_VARIANTS: AlternativeVariant[] = [
  {
    key: "E",
    label: "Variant E — V with Baseline Rule",
    description: "Regular V with a thin rule extending past it at the baseline.",
    Component: SymbolVariantE,
  },
  {
    key: "F",
    label: "Variant F — V in Square Frame",
    description: "Regular V centered inside a thin square frame.",
    Component: SymbolVariantF,
  },
  {
    key: "G",
    label: "Variant G — V with Serif Flourish",
    description: "Italic V with an exaggerated, tapered descending flourish.",
    Component: SymbolVariantG,
  },
  {
    key: "H",
    label: "Variant H — V·S Monogram",
    description: "Regular V with a small superscript S at the top-right shoulder.",
    Component: SymbolVariantH,
  },
  {
    key: "I",
    label: "Variant I — Negative V",
    description: "Solid disc with the V punched out as negative space.",
    Component: SymbolVariantI,
  },
  {
    key: "J",
    label: "Variant J — V with Editorial Brackets",
    description: "Regular V flanked by thin bracket marks set generously apart.",
    Component: SymbolVariantJ,
  },
];

const SHOWCASE_SIZES = [240, 96, 32];

function ShowcaseSection({
  heading,
  bg,
  color,
  labelColor,
}: {
  heading: string;
  bg: string;
  color: string;
  labelColor: string;
}) {
  return (
    <section style={{ backgroundColor: bg, padding: "96px 80px" }}>
      <h2
        style={{
          fontFamily: "var(--font-newsreader), Georgia, serif",
          color,
          fontSize: 32,
          fontWeight: 400,
          marginBottom: 64,
        }}
      >
        {heading}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        {VARIANTS.map(({ key, label, Component }) => (
          <div key={key}>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                color: labelColor,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                marginBottom: 24,
              }}
            >
              {label}
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 48 }}>
              {SHOWCASE_SIZES.map((size) => (
                <Component key={size} size={size} color={color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BrandAssetsPage() {
  return (
    <main>
      <section style={{ padding: "64px 80px" }}>
        <h1
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontSize: 40,
            fontWeight: 400,
            marginBottom: 16,
          }}
        >
          VANTIR Symbol Mark Variants
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: 16,
            color: "#A39E96",
            maxWidth: 640,
          }}
        >
          Compare directions for social avatars and business card. Pick one to take to
          production.
        </p>
      </section>

      <ShowcaseSection
        heading="On dark"
        bg="#0F0E0C"
        color="#F5F1EA"
        labelColor="#A39E96"
      />

      <ShowcaseSection
        heading="On warm"
        bg="#F5F1EA"
        color="#0F0E0C"
        labelColor="#7A756C"
      />

      <section style={{ backgroundColor: "#1A1816", padding: "96px 80px" }}>
        <h2
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            color: "#F5F1EA",
            fontSize: 32,
            fontWeight: 400,
            marginBottom: 64,
          }}
        >
          Avatar simulation
        </h2>
        <div style={{ display: "flex", gap: 48 }}>
          {VARIANTS.map(({ key, label, Component }) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#0F0E0C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Component size={200} color="#F5F1EA" />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#A39E96",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginTop: 16,
                }}
              >
                {key}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#5C5853",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#F5F1EA", padding: "96px 80px" }}>
        <h2
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            color: "#0F0E0C",
            fontSize: 32,
            fontWeight: 400,
            marginBottom: 64,
          }}
        >
          Paired with wordmark
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {VARIANTS.map(({ key, label, Component }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Component size={48} color="#0F0E0C" />
              <LogoMark size={32} showSubtitle={false} color="#0F0E0C" />
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#7A756C",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginLeft: 16,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#F5F1EA", padding: "96px 80px" }}>
        <h2
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            color: "#0F0E0C",
            fontSize: 32,
            fontWeight: 400,
            marginBottom: 16,
          }}
        >
          Alternative Variants (No Circle)
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "#7A756C",
            fontSize: 14,
            maxWidth: 640,
            marginBottom: 64,
          }}
        >
          Typography-only explorations, no circle container — alternatives to the
          V-in-circle direction.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {ALTERNATIVE_VARIANTS.map(({ key, label, description, Component }) => (
            <div key={key} style={{ textAlign: "center", color: "#0F0E0C" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 140,
                }}
              >
                <Component size={96} />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#0F0E0C",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginTop: 16,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#7A756C",
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#1A1816", padding: "96px 80px" }}>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "#F5F1EA",
            fontSize: 16,
            maxWidth: 640,
          }}
        >
          When chosen, tell Claude: &ldquo;Use Symbol Variant [letter] for production.&rdquo;
          We&rsquo;ll generate social PNG exports (1080×1080) and integrate into the
          business card.
        </p>
      </section>
    </main>
  );
}
