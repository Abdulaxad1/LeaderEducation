import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import {
  serve as swaggerServe,
  setup as swaggerSetup,
} from "swagger-ui-express";

import { swaggerSpec } from "./server/swagger.js";
import { apiRouter } from "./server/routes/index.js";
import { sequelize, connectDB } from "./server/config/database.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  try {
    // PostgreSQL bilan ulanish
    await connectDB();

    // Sequelize modellaridan jadvallar yaratish
    await sequelize.sync();

    console.log("PostgreSQL jadvallari tayyor.");

    const app = express();
    const PORT = process.env.PORT || 3000;
    const isProd = process.env.NODE_ENV === "production";

    app.use(express.json());
    app.set("trust proxy", true);

    const esc = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const baseUrl = (req) => `${req.protocol}://${req.get("host")}`;

    // Robots.txt
    app.get("/robots.txt", (req, res) => {
      res.type("text/plain").send(
        `User-agent: *
Allow: /
Disallow: /api/
Disallow: /api-docs

Sitemap: ${baseUrl(req)}/sitemap.xml
`,
      );
    });

    // Sitemap.xml
    app.get("/sitemap.xml", (req, res) => {
      res.type("application/xml").send(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(baseUrl(req))}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
      );
    });

    // API log
    app.use("/api", (req, _res, next) => {
      console.log(
        `[API ${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`,
      );
      next();
    });

    // Health check
    app.get("/api/health", (_req, res) => {
      res.json({
        status: "ok",
        database: "PostgreSQL",
        timestamp: new Date().toISOString(),
      });
    });

    // Swagger
    app.use(
      "/api-docs",
      swaggerServe,
      swaggerSetup(swaggerSpec, {
        customSiteTitle: "LeaderEducation API",
      }),
    );

    // API routes
    app.use("/api", apiRouter);

    // Production
    if (isProd) {
      const distPath = path.join(__dirname, "dist");

      app.use(express.static(distPath));

      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      // Development
      const { createServer } = await import("vite");

      const vite = await createServer({
        server: {
          middlewareMode: true,
          host: "0.0.0.0",
          allowedHosts: true,
        },
        appType: "spa",
      });

      app.use(vite.middlewares);
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`LeaderEducation Server running on http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Server ishga tushmadi:", error.message);
    process.exit(1);
  }
}

startServer();
