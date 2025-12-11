import Link from "next/link";
import type { AiTool } from "@/lib/types";

interface ToolCardProps {
  tool: AiTool;
  compact?: boolean;
}

export function ToolCard({ tool, compact }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-soft ring-offset-zinc-50 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:ring-offset-zinc-950 dark:hover:border-zinc-500/80 dark:hover:bg-zinc-900/95"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {tool.name}
            </h3>
            {tool.featured ? (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                Featured
              </span>
            ) : null}
          </div>
          <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
            {tool.shortDescription}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {tool.category}
          </span>
          <span className="text-[10px] text-zinc-500">{tool.pricing}</span>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {tool.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 transition group-hover:bg-zinc-200 group-hover:text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-400 dark:group-hover:bg-zinc-700/90 dark:group-hover:text-zinc-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>{tool.rating.toFixed(1)} rating</span>
        </span>
        <span className="inline-flex items-center gap-1 text-zinc-400 group-hover:text-zinc-100">
          <span>View details</span>
          <span aria-hidden className="translate-y-px transition group-hover:translate-x-0.5">
            -&gt;
          </span>
        </span>
      </div>
    </Link>
  );
}
