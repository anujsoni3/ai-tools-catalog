import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ai-tools-catalog.local";
  const tools = getAllTools();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tools",
    "/collections/free",
    "/collections/developers",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.launchedYear, 0, 1).toISOString(),
  }));

  return [...staticRoutes, ...toolRoutes];
}
