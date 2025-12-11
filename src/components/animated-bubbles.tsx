"use client";

import { useState, useEffect } from 'react';

interface Bubble {
  id: number;
  size: number;
  delay: number;
  duration: number;
  left: number;
  top: number;
  name: string;
  color: string;
}

const aiTools = [
  { name: 'ChatGPT', color: 'from-emerald-500/30 to-teal-500/30 border-emerald-400/40' },
  { name: 'Midjourney', color: 'from-purple-500/30 to-pink-500/30 border-purple-400/40' },
  { name: 'DALL·E', color: 'from-orange-500/30 to-red-500/30 border-orange-400/40' },
  { name: 'Claude', color: 'from-amber-500/30 to-yellow-500/30 border-amber-400/40' },
  { name: 'Gemini', color: 'from-blue-500/30 to-cyan-500/30 border-blue-400/40' },
  { name: 'Copilot', color: 'from-indigo-500/30 to-blue-500/30 border-indigo-400/40' },
  { name: 'Stable Diffusion', color: 'from-violet-500/30 to-purple-500/30 border-violet-400/40' },
  { name: 'Perplexity', color: 'from-sky-500/30 to-blue-500/30 border-sky-400/40' },
  { name: 'Runway', color: 'from-green-500/30 to-emerald-500/30 border-green-400/40' },
  { name: 'ElevenLabs', color: 'from-fuchsia-500/30 to-pink-500/30 border-fuchsia-400/40' },
  { name: 'Jasper', color: 'from-rose-500/30 to-red-500/30 border-rose-400/40' },
  { name: 'Notion AI', color: 'from-slate-500/30 to-gray-500/30 border-slate-400/40' },
  { name: 'Wordtune', color: 'from-cyan-500/30 to-teal-500/30 border-cyan-400/40' },
  { name: 'Synthesia', color: 'from-lime-500/30 to-green-500/30 border-lime-400/40' },
  { name: 'Luma AI', color: 'from-pink-500/30 to-rose-500/30 border-pink-400/40' },
  
];

const BubbleElement = ({ size, delay, duration, left, top, name, color }: Omit<Bubble, 'id'>) => (
  <div
    className={`absolute rounded-full bg-gradient-to-br ${color} backdrop-blur-sm border flex items-center justify-center transition-all hover:scale-110 cursor-default`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
    <span 
      className="relative z-10 font-semibold text-white/90 text-center px-2"
      style={{
        fontSize: `${Math.max(size / 8, 9)}px`,
        lineHeight: '1.2',
      }}
    >
      {name}
    </span>
  </div>
);

export function AnimatedBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate random bubbles with AI tool names
    const newBubbles = Array.from({ length: 15 }, (_, i) => {
      const tool = aiTools[i % aiTools.length];
      return {
        id: i,
        size: Math.random() * 50 + 60, // 60-110px (larger for text)
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 5, // 5-9 seconds (slower)
        left: Math.random() * 70 + 5, // 5-75% (centered in region)
        top: Math.random() * 60 + 40, // 10-80% (more centered vertically)
        name: tool.name,
        color: tool.color,
      };
    });
    setBubbles(newBubbles);
  }, []);

  return (
    <>
      {/* Keyframe animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(20px, -20px) scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Animated Bubbles - positioned to match the blue region */}
      <div className="pointer-events-none fixed left-[10%] bottom-[5%] h-[550px] w-[700px] overflow-hidden opacity-70 z-0">
        {bubbles.map((bubble) => (
          <BubbleElement key={bubble.id} {...bubble} />
        ))}
      </div>
    </>
  );
}