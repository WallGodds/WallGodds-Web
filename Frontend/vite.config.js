import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Middleware plugin to serve root /Wallpapers directory
const serveWallpapers = () => ({
  name: "serve-wallpapers",
  configureServer(server) {
    server.middlewares.use("/Wallpapers", (req, res, next) => {
      const wallpapersRoot = path.resolve(__dirname, "..", "Wallpapers");
      const filePath = path.join(wallpapersRoot, req.url);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
        const ext = path.extname(filePath).toLowerCase();
        const mimeMap = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".webp": "image/webp",
          ".gif": "image/gif",
        };
        res.setHeader(
          "Content-Type",
          mimeMap[ext] || "application/octet-stream",
        );
        fs.createReadStream(filePath).pipe(res);
      } else {
        next();
      }
    });
  },
});

export default defineConfig({
  plugins: [react(), serveWallpapers()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
