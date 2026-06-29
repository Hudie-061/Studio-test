declare module "gifenc" {
  export interface GIFEncoderWriteFrameOptions {
    palette?: number[][];
    delay?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
    repeat?: number;
  }

  export interface GIFEncoderInstance {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      opts?: GIFEncoderWriteFrameOptions
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  }

  export function GIFEncoder(opts?: Record<string, unknown>): GIFEncoderInstance;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: Record<string, unknown>
  ): number[][];
  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: number[][],
    format?: string
  ): Uint8Array;
}
