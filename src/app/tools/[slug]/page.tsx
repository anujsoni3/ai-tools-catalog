import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug } from "@/lib/tools";
import type { AiTool } from "@/lib/types";

interface ToolPageProps {
  params: Promise<{ slug: string }>; // 👈 params is now a Promise
}

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata(
  { params }: ToolPageProps
): Promise<Metadata> {
  const { slug } = await params;              // 👈 unwrap the Promise
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found",
      description: "The requested AI tool could not be found in the catalog.",
    };
  }

  return {
    title: tool.name,
    description: tool.shortDescription,
  };
}

function ToolMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800/70 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-300">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-zinc-100">{value}</span>
    </div>
  );
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;                       // 👈 unwrap here too
  const tool = getToolBySlug(slug) as AiTool | undefined;

  if (!tool) {
    notFound();
  }

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/70 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-300">
              {tool.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="text-[11px] text-zinc-400">
              Launched {tool.launchedYear}
            </span>
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {tool.name}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {tool.longDescription}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Primary use cases
          </h2>
          <ul className="mt-2 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
            {tool.useCases.map((useCase) => (
              <li
                key={useCase}
                className="flex items-start gap-2 rounded-xl bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200"
              >
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Tags
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-900/90 px-3 py-1 text-[11px] text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-4 lg:pl-2">
        <div className="space-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 sm:p-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Overview
          </h2>
          <ToolMetaRow label="Pricing" value={tool.pricing.toString()} />
          <ToolMetaRow label="Rating" value={`${tool.rating.toFixed(1)} / 5`} />
          <ToolMetaRow label="Launched" value={tool.launchedYear.toString()} />
        </div>

        <div className="space-y-3 rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-indigo-600/80 via-sky-500/80 to-emerald-500/80 p-4 text-zinc-50 shadow-soft sm:p-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-100/90">
            Visit website
          </h2>
          <p className="text-xs text-indigo-50/90">
            Open the official website to explore pricing, docs, and real product
            screenshots.
          </p>
          <Link
            href={tool.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950/90 px-4 py-2 text-xs font-semibold text-zinc-50 shadow-md transition hover:bg-zinc-950"
          >
            Open {new URL(tool.website).hostname}
          </Link>
        </div>

        <Link
          href="/tools"
          className="inline-flex w-full items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-950/60 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/90"
        >
          ← Back to all tools
        </Link>
      </aside>
    </div>
  );
}
