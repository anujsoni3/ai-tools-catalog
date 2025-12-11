import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/tools/tool-card";
import { getDeveloperFocusedTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools for developers",
  description:
    "AI tools that improve developer productivity across code, debugging, testing, and onboarding.",
};

export default function DeveloperCollectionPage() {
  const tools = getDeveloperFocusedTools();

  return (
    <div className="w-full space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-400">
          Collection
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Best AI tools for developers
        </h1>
        <p className="max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          Discover assistants for code, reviews, debugging, data work, and developer
          onboarding.
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
