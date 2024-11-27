import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  esolve: {
    alias: {
      "@": "/src", // Ensure this matches your structure
    },
    extensions: [".js", ".vue"], // Ensure .js files are included
  },
});
