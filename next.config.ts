import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Due `next dev` nella stessa cartella non devono condividere `.next`, altrimenti
  // uno sovrascrive i chunk dell'altro (ChunkLoadError). L'anteprima usa `.next-preview`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
