import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/tools/tools-explorer";
import { getAllTools, getCategories, getPricingTiers } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Browse tools",
  description:
    "Browse the AI Tools Catalog with search, category filters, pricing filters, and rating-based sorting.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getCategories();
  const pricingTiers = getPricingTiers();

  return (
    <div className="w-full space-y-6">
      <ToolsExplorer
        tools={tools}
        categories={categories}
        pricingTiers={pricingTiers}
      />
    </div>
  );
}
