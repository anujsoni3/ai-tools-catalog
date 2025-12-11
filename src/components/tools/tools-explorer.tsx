"use client";

import { useMemo, useState } from "react";
import type { AiTool, PricingTier, SortOption, ToolCategory } from "@/lib/types";
import { ToolCard } from "./tool-card";

interface ToolsExplorerProps {
  tools: AiTool[];
  categories: (ToolCategory | string)[];
  pricingTiers: (PricingTier | string)[];
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "rating", label: "Rating (high → low)" },
  { value: "name", label: "Name (A → Z)" },
];

export function ToolsExplorer({ tools, categories, pricingTiers }: ToolsExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [pricing, setPricing] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = tools.filter((tool) => {
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory = category === "all" || tool.category === category;
      const matchesPricing = pricing === "all" || tool.pricing === pricing;

      return matchesQuery && matchesCategory && matchesPricing;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [category, pricing, search, sortBy, tools]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-soft sm:p-5 dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-lg">
              Browse AI tools
            </h1>
            <p className="text-xs text-zinc-500 sm:text-[13px]">
              Search by name or tags, then refine by category, pricing, and rating.
            </p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Showing <span className="font-medium text-zinc-100">{filtered.length}</span> of
            {" "}
            <span className="font-medium text-zinc-100">{tools.length}</span> tools
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-4 sm:items-center">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Search
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or tags..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 outline-none ring-offset-zinc-50 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:border-zinc-700/70 dark:bg-zinc-950/70 dark:text-zinc-100 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-600"
            />
          </label>

          <label>
            <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-950/70 dark:text-zinc-100 dark:ring-offset-zinc-950"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Pricing
            </span>
            <select
              value={pricing}
              onChange={(event) => setPricing(event.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-950/70 dark:text-zinc-100 dark:ring-offset-zinc-950"
            >
              <option value="all">All pricing</option>
              {pricingTiers.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>

          <label className="sm:col-span-2 sm:col-start-3">
            <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-950/70 dark:text-zinc-100 dark:ring-offset-zinc-950"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700/70 dark:bg-zinc-900/60 dark:text-zinc-400">
            No tools match your current filters. Try adjusting your search or
            resetting the filters.
          </div>
        )}
      </div>
    </div>
  );
}
