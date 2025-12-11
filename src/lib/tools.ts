import toolsJson from "../../data/ai-tools.json";
import type { AiTool, PricingTier, ToolCategory } from "./types";

export const tools: AiTool[] = toolsJson as AiTool[];

export function getAllTools(): AiTool[] {
  return tools;
}

export function getToolBySlug(slug: string): AiTool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getFeaturedTools(limit = 6): AiTool[] {
  return tools
    .filter((tool) => tool.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getCategories(): ToolCategory[] {
  const set = new Set<string>();
  tools.forEach((tool) => set.add(tool.category));
  return Array.from(set).sort() as ToolCategory[];
}

export function getPricingTiers(): PricingTier[] {
  const set = new Set<string>();
  tools.forEach((tool) => set.add(tool.pricing));
  return Array.from(set).sort() as PricingTier[];
}

export function getFreeAndFreemiumTools(): AiTool[] {
  return tools.filter((tool) => tool.pricing === "Free" || tool.pricing === "Freemium");
}

export function getDeveloperFocusedTools(): AiTool[] {
  return tools.filter((tool) =>
    ["Developer Tools", "Code Assistant", "Data & Analytics"].includes(tool.category) ||
    tool.tags.some((tag) => tag.toLowerCase().includes("developer"))
  );
}
