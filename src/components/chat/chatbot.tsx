"use client";

import { useState } from "react";
import { tools } from "@/lib/tools";
import type { AiTool } from "@/lib/types";

type Sender = "user" | "bot";

interface Message {
  id: number;
  from: Sender;
  text: string;
}

function formatToolSummary(tool: AiTool): string {
  return `${tool.name} · ${tool.category} · ${tool.pricing} · rating ${tool.rating.toFixed(
    1,
  )}/5`;
}

function recommendTools(query: string): AiTool[] {
  const q = query.toLowerCase();

  // Try exact / near-exact name or slug match first.
  const exact = tools.find((tool) => {
    const name = tool.name.toLowerCase();
    const slug = tool.slug.toLowerCase();
    return q === name || q === slug || q.includes(name) || q.includes(slug);
  });

  if (exact) {
    return [exact];
  }

  const keywords = q
    .split(/[^a-z0-9]+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (keywords.length === 0) return [];

  const scored: { tool: AiTool; score: number }[] = tools.map((tool) => {
    const haystack = [
      tool.name,
      tool.slug,
      tool.category,
      tool.pricing,
      tool.shortDescription,
      ...tool.tags,
      ...tool.useCases,
    ]
      .join(" ")
      .toLowerCase();

    const score = keywords.reduce((total, word) => {
      if (!word) return total;
      if (haystack.includes(word)) return total + 1;
      return total;
    }, 0);

    return { tool, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.tool.rating - a.tool.rating;
    })
    .slice(0, 3)
    .map((item) => item.tool);
}

async function fetchBotReply(messages: Message[]): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    return data.reply || "Sorry, I couldn’t generate a response.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text:
        "Hi! I’m your AI tools guide. Ask me what this site does or tell me what you’re building, and I’ll suggest tools from the catalog.",
    },
  ]);

  const handleSend = async () => {
  const trimmed = input.trim();
  if (!trimmed) return;

  setMessages((prev) => {
    const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
    return [...prev, { id: nextId, from: "user", text: trimmed }];
  });

  setInput("");

  const newMessages: Message[] = [...messages, { id: Date.now(), from: "user" as const, text: trimmed }];
  const reply = await fetchBotReply(newMessages);

  setMessages((prev) => {
    const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
    return [...prev, { id: nextId, from: "bot", text: reply }];
  });
};


  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="pointer-events-auto w-72 max-w-[85vw] rounded-2xl border border-zinc-800/80 bg-zinc-950/95 p-3 text-xs text-zinc-100 shadow-soft backdrop-blur-sm sm:w-80">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 text-[10px] font-semibold text-zinc-950">
                AI
              </span>
              <div>
                <p className="text-[11px] font-semibold leading-tight">AI catalog assistant</p>
                <p className="text-[10px] text-zinc-400">Ask about tools & this site</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            >
              <span className="sr-only">Close chat</span>
              ×
            </button>
          </div>

          <div className="mb-2 max-h-64 space-y-2 overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "user"
                    ? "ml-auto max-w-[90%] rounded-2xl bg-indigo-600/90 px-3 py-2 text-[11px] text-zinc-50"
                    : "mr-auto max-w-[95%] whitespace-pre-wrap rounded-2xl bg-zinc-900/90 px-3 py-2 text-[11px] text-zinc-100"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="mt-1 flex items-center gap-1">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about tools or this site..."
              className="flex-1 rounded-xl border border-zinc-700/80 bg-zinc-950/90 px-3 py-1.5 text-[11px] text-zinc-100 outline-none ring-offset-zinc-950 placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:ring-offset-1"
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-50 shadow-sm transition hover:bg-indigo-400 disabled:opacity-50"
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 text-sm font-semibold text-zinc-950 shadow-soft transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <span className="sr-only">Toggle AI tools assistant</span>
        ?
      </button>
    </div>
  );
}
