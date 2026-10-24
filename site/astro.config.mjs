import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  site: "https://alexandrerusilas.github.io",
  base: "/alexandrerusilas",
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
