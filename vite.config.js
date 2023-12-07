import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  erver: {
    proxy: {
      "/api": "http://localhost:3000", // Adjust the URL based on your Node.js server
    },
  },
});
