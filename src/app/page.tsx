import Link from "next/link";
import { getFeaturedTools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/tool-card";
import { AnimatedBubbles } from "@/components/animated-bubbles";

export default function Home() {
  const featured = getFeaturedTools(6);

  return (
    <>
      {/* Animated Bubbles Background */}
      <AnimatedBubbles />
      
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start relative z-10">
        <section className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 shadow-soft dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Curated directory · Static dataset · No sign-up
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Discover AI tools without the noise.
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              AI Tools Catalog is a fast, minimal directory of AI products. Browse by
              category, pricing, and rating to find the right tool for your next
              project.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-zinc-50 shadow-soft transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Browse all tools
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
              <span>Search by name or tags</span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span>Filter by category & pricing</span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span>Static JSON dataset</span>
            </div>
          </div>
        </section>

        <section className="flex-1 space-y-4 lg:max-w-md">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Featured tools
            </h2>
            <Link
              href="/collections/free"
              className="text-xs font-medium text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
            >
              View free & freemium
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}