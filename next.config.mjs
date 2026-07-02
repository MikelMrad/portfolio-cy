/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static export → out/ (no server); `next build` emits it directly
  trailingSlash: true, // /about → /about/index.html, resolves on plain static hosts
  images: {
    unoptimized: true, // default image optimizer is unsupported under `output: 'export'`
  },
  reactCompiler: true, // stable in Next 16; requires babel-plugin-react-compiler (installed)
};

export default nextConfig;
