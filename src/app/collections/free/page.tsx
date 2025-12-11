import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/tools/tool-card";
import { getFreeAndFreemiumTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free & freemium tools",
  description:
    "Explore AI tools that are free or offer generous freemium plans across multiple categories.",
};

export default function FreeCollectionPage() {
  const tools = getFreeAndFreemiumTools();

  return (
    <div className="w-full space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          Collection
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Free & freemium AI tools
        </h1>
        <p className="max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          Start experimenting with AI without pulling out a credit card. These tools
          are either fully free or include generous free tiers.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center text-xs font-medium text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
        >
          ← Back to all tools
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>
    </div>
  );
}
