/** Static export of JEE EDGE 100 for GitHub Pages. Reuses ../src components and ../content data. */
const basePath = process.env.PAGES_BASE_PATH ?? "";
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { externalDir: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
