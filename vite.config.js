import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "logo-doce-mel.png",
        "pix-qrcode.png",
      ],

      manifest: {
        name: "Sorveteria Doce Mel - Cardápio Digital",

        short_name: "Doce Mel",

        description:
          "Cardápio digital da Sorveteria Doce Mel para pedidos via WhatsApp.",

        theme_color: "#69263d",

        background_color: "#fff3df",

        display: "standalone",

        orientation: "portrait",

        start_url: "./",

        scope: "./",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },

          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },

          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,

        globPatterns: [
          "**/*.{js,css,html,png,jpg,jpeg,jfif,webp,svg,ico}",
        ],
      },
    }),
  ],

  base: "/",
});