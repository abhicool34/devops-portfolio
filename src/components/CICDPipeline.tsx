"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

// Pipeline stages exactly as seen in the video
const STAGES = [
  {
    id: "source",
    label: "Source",
    sub: "Git Push",
    color: "#00d084",       // cyan-green
    icon: (
      // git branch icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="6"  cy="6"  r="2" />
        <circle cx="6"  cy="18" r="2" />
        <circle cx="18" cy="6"  r="2" />
        <path d="M6 8v8" />
        <path d="M18 8a6 6 0 0 1-6 6H8" />
      </svg>
    ),
  },
  {
    id: "build",
    label: "Build",
    sub: "Compile & Package",
    color: "#f0a500",       // yellow
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0z" />
        <path d="M5 16l-1 3 3-1 9-9-2-2z" />
        <path d="M13 6l2 2" />
      </svg>
    ),
  },
  {
    id: "test",
    label: "Test",
    sub: "Unit & Integration",
    color: "#7c3aed",       // purple
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 3v11a3 3 0 0 0 6 0V3" />
        <path d="M6 3h12" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    id: "deploy",
    label: "Deploy",
    sub: "K8s Rollout",
    color: "#00d084",       // green
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    id: "monitor",
    label: "Monitor",
    sub: "Observability",
    color: "#f97316",       // orange
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

// Connector between two stages
// activeSegment = which connector is currently lit (0-3)
// dotProgress   = 0..1 how far along that connector the dot is
function Connector({
  idx,
  activeSegment,
  dotProgress,
  completed,
}: {
  idx: number;
  activeSegment: number;
  dotProgress: number;
  completed: boolean[];
}) {
  const isActive    = idx === activeSegment;
  const isDone      = completed[idx];
  const lineColor   = isDone || isActive ? "#00d084" : "rgba(48,54,61,0.9)";

  return (
    <div className="flex-1 relative flex items-center" style={{ height: 4, margin: "0 2px" }}>
      {/* Background track */}
      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(48,54,61,0.9)" }} />

      {/* Filled portion */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 rounded-full"
        style={{ background: "linear-gradient(90deg,#00d084,#58a6ff)" }}
        animate={{ width: isDone ? "100%" : isActive ? `${dotProgress * 100}%` : "0%" }}
        transition={{ duration: 0.05, ease: "linear" }}
      />

      {/* Moving dot */}
      {isActive && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
          style={{
            background: "#00d084",
            boxShadow: "0 0 8px #00d084, 0 0 16px rgba(0,208,132,0.5)",
            left: `calc(${dotProgress * 100}% - 6px)`,
          }}
        />
      )}
    </div>
  );
}

export default function CICDPipeline() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" }); // once:false for scroll-up replay

  // Animation state
  const [activeSegment, setActiveSegment] = useState(-1); // which connector line is animating
  const [dotProgress,   setDotProgress]   = useState(0);  // 0..1 along active segment
  const [completed,     setCompleted]     = useState<boolean[]>([false, false, false, false]);
  const [activeStage,   setActiveStage]   = useState(-1); // which stage box is "lit"
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef  = useRef<number>(0);
  const startedRef = useRef(false);

  function resetAll() {
    setActiveSegment(-1);
    setDotProgress(0);
    setCompleted([false, false, false, false]);
    setActiveStage(-1);
    startedRef.current = false;
  }

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      runPipeline();
    }
    if (!inView) {
      // reset so it replays when scrolled back in
      cancelAnimationFrame(rafRef.current);
      if (animRef.current) clearTimeout(animRef.current);
      resetAll();
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [inView]); // eslint-disable-line

  async function runPipeline() {
    // Activate stage 0 (Source) immediately
    setActiveStage(0);
    await delay(400);

    // Animate connectors 0 → 3 sequentially
    for (let seg = 0; seg < 4; seg++) {
      setActiveSegment(seg);
      await animateSegment(seg);
      // Mark segment done, activate next stage
      setCompleted((prev) => { const n = [...prev]; n[seg] = true; return n; });
      setActiveStage(seg + 1);
      await delay(300);
    }

    // Pause at completion, then loop
    await delay(1200);
    resetAll();
    await delay(300);
    startedRef.current = false; // allow re-trigger (but inView still true → instant restart)
    runPipeline();
  }

  function animateSegment(seg: number): Promise<void> {
    return new Promise((resolve) => {
      const duration = 900; // ms per segment
      const start    = performance.now();
      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        setDotProgress(t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDotProgress(1);
          resolve();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    });
  }

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => { animRef.current = setTimeout(resolve, ms); });
  }

  return (
    <motion.div
      ref={ref}
      className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-8 mb-10"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}   // once:false → replay on scroll up
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 font-mono text-[0.82rem] text-text2 font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
        CI/CD Pipeline Flow
      </div>

      {/* Pipeline row */}
      <div className="flex items-center">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center flex-1 min-w-0">
            {/* Stage node */}
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Icon box */}
              <motion.div
                className="w-[72px] h-[72px] rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: activeStage === i
                    ? `rgba(${hexToRgb(stage.color)}, 0.15)`
                    : "rgba(28,33,40,0.9)",
                  border: `1.5px solid ${activeStage === i ? stage.color : "rgba(48,54,61,0.8)"}`,
                  boxShadow: activeStage === i
                    ? `0 0 18px rgba(${hexToRgb(stage.color)},0.35), inset 0 0 12px rgba(${hexToRgb(stage.color)},0.08)`
                    : "none",
                  color: activeStage === i ? stage.color : "#6e7681",
                  transition: "all 0.35s ease",
                }}
              >
                {stage.icon}
                {/* Pulse ring when active */}
                {activeStage === i && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `1.5px solid ${stage.color}` }}
                    animate={{ opacity: [0.8, 0], scale: [1, 1.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <div
                className="font-sans text-[0.82rem] font-semibold text-center leading-tight"
                style={{ color: activeStage === i ? stage.color : "#e6edf3", transition: "color 0.3s" }}
              >
                {stage.label}
              </div>
              <div className="font-mono text-[0.68rem] text-text3 text-center mt-0.5 whitespace-nowrap">
                {stage.sub}
              </div>
            </div>

            {/* Connector (not after last stage) */}
            {i < STAGES.length - 1 && (
              <div className="flex-1 mx-3 mt-[-28px]">
                <Connector
                  idx={i}
                  activeSegment={activeSegment}
                  dotProgress={dotProgress}
                  completed={completed}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// hex "#rrggbb" → "r,g,b"
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
