"use client";
import { useEffect, useRef, useState } from "react";
import { TERMINAL_LINES } from "@/lib/data";

interface Line { type: string; text: string; typed: string; done: boolean; }
function wait(ms: number) { return new Promise<void>((r) => setTimeout(r, ms)); }

export default function HeroTerminal({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines]               = useState<Line[]>([]);
  const [showFinalPrompt, setShowFinal] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, showFinalPrompt]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      await wait(800);
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled) return;
        const lineData = TERMINAL_LINES[i];
        const full  = lineData.text;
        const speed = lineData.type === "cmd" ? 42
                    : lineData.type === "out" && i === 1 ? 0
                    : lineData.type === "out" ? 30
                    : lineData.type === "info" ? 26 : 32;
        if (speed === 0) {
          setLines((p) => [...p, { ...lineData, typed: full, done: true }]);
          await wait(280); continue;
        }
        setLines((p) => [...p, { ...lineData, typed: "", done: false }]);
        for (let c = 0; c <= full.length; c++) {
          if (cancelled) return;
          setLines((p) => p.map((l, idx) =>
            idx === i ? { ...l, typed: full.slice(0, c), done: c === full.length } : l
          ));
          await wait(speed);
        }
        await wait(lineData.type === "cmd" ? 200 : lineData.type === "success" ? 350 : 180);
      }
      if (cancelled) return;
      setShowFinal(true);
      await wait(500);
      if (!cancelled) onComplete();
    }
    run();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line

  return (
    <div className="w-full max-w-[680px] bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 md:px-4 py-2.5 md:py-3 bg-bg3 border-b border-[rgba(48,54,61,0.8)]">
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57] flex-shrink-0" />
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e] flex-shrink-0" />
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28ca41] flex-shrink-0" />
        {/* Shorten title on mobile */}
        <span className="font-mono text-[0.65rem] md:text-xs text-text3 ml-1.5 md:ml-2 flex-1 truncate">
          <span className="hidden sm:inline">akhilesh@devops-portfolio:~</span>
          <span className="sm:hidden">devops-portfolio:~</span>
        </span>
        <span className="font-mono text-[0.65rem] md:text-xs text-text3 flex-shrink-0 hidden sm:block">⚡ PID: 1337</span>
      </div>

      {/* Body — smaller font + less padding on mobile */}
      <div
        ref={bodyRef}
        className="px-3 md:px-6 py-3 md:py-5 font-mono text-[0.72rem] md:text-[0.82rem] leading-[1.8] md:leading-[1.9] min-h-[160px] md:min-h-[190px] overflow-hidden"
      >
        {lines.map((line, i) => {
          if (line.type === "cmd") return (
            <div key={i} className="block break-all sm:break-normal">
              <span className="text-green">$ </span>
              <span className="text-cyan">{line.typed}</span>
              {!line.done && <span className="term-cursor" />}
            </div>
          );
          if (line.type === "out") return (
            <div key={i} className="block text-[#cdd9e5] break-all sm:break-normal">
              {line.typed}{!line.done && <span className="term-cursor" />}
            </div>
          );
          if (line.type === "info") return (
            <div key={i} className="block break-all sm:break-normal">
              <span className="text-cyan">[INFO]</span>
              <span className="text-text2"> {line.typed}</span>
              {!line.done && <span className="term-cursor" />}
            </div>
          );
          if (line.type === "success") return (
            <div key={i} className="block text-green font-medium break-all sm:break-normal">
              {line.typed}{!line.done && <span className="term-cursor" />}
            </div>
          );
          return null;
        })}
        {showFinalPrompt && (
          <div className="block">
            <span className="text-green">$ </span>
            <span className="term-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
