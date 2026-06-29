"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { SymbolVariantC } from "@/components/symbol/variants/SymbolVariantC";

const CARD_WIDTH_MM = 89;
const CARD_HEIGHT_MM = 59;
const SAFE_INSET_MM = 5;
const BLEED_INSET_MM = 2;

const WARM_CREAM = "#F0E8D8";
const WARM_DARK = "#1C1814";
const MUTED_CAPTION = "#8A857C";

const PRINT_COLOR_ADJUST: CSSProperties = {
  WebkitPrintColorAdjust: "exact",
  printColorAdjust: "exact",
} as CSSProperties;

function GuideOverlay() {
  return (
    <>
      <div
        className="print-hide"
        style={{ position: "absolute", inset: 0, border: "1px dashed red", pointerEvents: "none" }}
      />
      <div
        className="print-hide"
        style={{ position: "absolute", inset: `${BLEED_INSET_MM}mm`, border: "1px dashed deeppink", pointerEvents: "none" }}
      />
      <div
        className="print-hide"
        style={{ position: "absolute", inset: `${SAFE_INSET_MM}mm`, border: "1px dashed blue", pointerEvents: "none" }}
      />
    </>
  );
}

function FrontCard({ showGuides }: { showGuides: boolean }) {
  return (
    <div
      className="card-front"
      style={{
        position: "relative",
        width: `${CARD_WIDTH_MM}mm`,
        height: `${CARD_HEIGHT_MM}mm`,
        backgroundColor: WARM_CREAM,
        overflow: "hidden",
        ...PRINT_COLOR_ADJUST,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${SAFE_INSET_MM}mm`,
          right: `${SAFE_INSET_MM}mm`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SymbolVariantC
          color={WARM_DARK}
          bgColor="transparent"
          className="w-[16mm] h-[16mm] mt-[5mm]"
        />
        <p
          style={{
            marginTop: "3.5mm",
            lineHeight: 1.2,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "11pt",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: WARM_DARK,
            textAlign: "center",
          }}
        >
          VANTIR STUDIO
        </p>
        <div style={{ marginTop: "4mm", width: "12mm", height: "0.5pt", backgroundColor: WARM_DARK }} />
        <p
          style={{
            marginTop: "4mm",
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "9.5pt",
            lineHeight: 1.35,
            color: WARM_DARK,
            textAlign: "center",
          }}
        >
          Considered work for businesses
          <br />
          that refuse to look ordinary.
        </p>
      </div>
      {showGuides && <GuideOverlay />}
    </div>
  );
}

function BackCard({ showGuides }: { showGuides: boolean }) {
  return (
    <div
      className="card-back"
      style={{
        position: "relative",
        width: `${CARD_WIDTH_MM}mm`,
        height: `${CARD_HEIGHT_MM}mm`,
        backgroundColor: WARM_DARK,
        overflow: "hidden",
        ...PRINT_COLOR_ADJUST,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${SAFE_INSET_MM}mm`,
          right: `${SAFE_INSET_MM}mm`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginTop: "5mm",
            lineHeight: 1.2,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "9.5pt",
            color: WARM_CREAM,
            textAlign: "center",
          }}
        >
          Cinematic brand films &amp; editorial websites
        </p>
        <img
          src="/print/qr-code-wt.svg"
          alt="VANTIR Studio QR code"
          style={{ marginTop: "4mm", width: "20mm", height: "20mm" }}
        />
        <p
          style={{
            marginTop: "2.5mm",
            lineHeight: 1.2,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "8pt",
            letterSpacing: "0.03em",
            color: WARM_CREAM,
            textAlign: "center",
          }}
        >
          see our work ↑
        </p>
        <div style={{ marginTop: "4mm", textAlign: "center" }}>
          <p
            style={{
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "8pt",
              color: WARM_CREAM,
            }}
          >
            contact@vantir.studio
          </p>
          <p
            style={{
              marginTop: "1.5pt",
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "7.5pt",
              color: WARM_CREAM,
            }}
          >
            +32 477 04 50 71
          </p>
          <p
            style={{
              marginTop: "1.5pt",
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "7pt",
              color: MUTED_CAPTION,
            }}
          >
            WhatsApp &amp; calls
          </p>
        </div>
      </div>
      {showGuides && <GuideOverlay />}
    </div>
  );
}

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="print-hide text-xs uppercase tracking-[0.3em] text-[#A39E96]">{label}</span>
      <div
        className="screen-scale-wrapper"
        style={{ width: `calc(${CARD_WIDTH_MM}mm * 2)`, height: `calc(${CARD_HEIGHT_MM}mm * 2)` }}
      >
        <div className="screen-scale-inner" style={{ transform: "scale(2)", transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function BusinessCardPrintPage() {
  const [showGuides, setShowGuides] = useState(false);

  return (
    <>
      <style>{`
        @page { size: ${CARD_WIDTH_MM}mm ${CARD_HEIGHT_MM}mm; margin: 0; }
        @media print {
          .print-hide { display: none !important; }
          .screen-bg { background: none !important; padding: 0 !important; margin: 0 !important; min-height: 0 !important; }
          .screen-scale-wrapper { width: auto !important; height: auto !important; }
          .screen-scale-inner { transform: none !important; }
          .card-front, .card-back { page-break-after: always; break-after: page; }
          .card-back { page-break-after: auto; break-after: auto; }
        }
      `}</style>
      <main
        className="screen-bg flex flex-col items-center gap-12 p-12"
        style={{ backgroundColor: "#2A2A2A", minHeight: "100vh" }}
      >
        <div className="print-hide fixed top-6 right-6 z-50 flex gap-3">
          <button
            type="button"
            onClick={() => setShowGuides((value) => !value)}
            className="rounded border border-[#A39E96] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#F5F1EA] hover:bg-[#3A3A3A]"
          >
            {showGuides ? "Hide" : "Show"} Guides
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded bg-[#C8895A] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#0F0E0C] hover:opacity-90"
          >
            Print
          </button>
        </div>

        <PreviewCard label="FRONT">
          <FrontCard showGuides={showGuides} />
        </PreviewCard>
        <PreviewCard label="BACK">
          <BackCard showGuides={showGuides} />
        </PreviewCard>
      </main>
    </>
  );
}
