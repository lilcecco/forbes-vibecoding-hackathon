import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Due `next dev` nella stessa cartella non devono condividere `.next`, altrimenti
  // uno sovrascrive i chunk dell'altro (ChunkLoadError). L'anteprima usa `.next-preview`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Il piano di go to market sta nella landing (numeri di src/lib/gtm.ts): /piano ci porta lì
  async redirects() {
    return [{ source: "/piano", destination: "/#strategia", permanent: false }];
  },
};

export default nextConfig;
