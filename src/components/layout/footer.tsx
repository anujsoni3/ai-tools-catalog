import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white/90 dark:border-zinc-800/60 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">
          Built as an example catalog of modern AI tools. Data is static and for
          demonstration purposes only.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/tools"
            className="transition hover:text-zinc-700 hover:underline hover:underline-offset-4 dark:hover:text-zinc-300"
          >
            Browse all tools
          </Link>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-700 hover:underline hover:underline-offset-4 dark:hover:text-zinc-300"
          >
            Built with Next.js
          </a>
        </div>
      </div>
    </footer>
  );
}
