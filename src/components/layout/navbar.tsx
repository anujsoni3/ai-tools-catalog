import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/80"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 text-xs font-semibold text-white shadow-soft">
            AI
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              AI Tools Catalog
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Curated directory of AI products
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:flex">
          <Link
            href="/tools"
            className="transition hover:text-zinc-900 hover:underline hover:underline-offset-4 dark:hover:text-zinc-50"
          >
            All tools
          </Link>
          <Link
            href="/collections/free"
            className="transition hover:text-zinc-900 hover:underline hover:underline-offset-4 dark:hover:text-zinc-50"
          >
            Free tools
          </Link>
          <Link
            href="/collections/developers"
            className="transition hover:text-zinc-900 hover:underline hover:underline-offset-4 dark:hover:text-zinc-50"
          >
            For developers
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden sm:inline-flex rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Browse tools
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
