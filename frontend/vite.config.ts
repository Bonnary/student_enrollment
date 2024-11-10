// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["nodemailer"], // Exclude nodemailer from client bundle
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
