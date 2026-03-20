"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-10" ref={ref}>
        <motion.div
          className="mb-4"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <span className="font-mono text-sm text-green font-medium">03.</span>
          <h2 className="font-sans text-[2.2rem] font-bold text-text1 inline ml-3">Projects</h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>

        <motion.p
          className="font-mono text-xs text-text3 mb-12"
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <span className="text-green">$ </span>helm list --all-namespaces
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-7
                         hover:border-[rgba(0,208,132,0.3)] hover:-translate-y-[3px]
                         hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                         transition-all duration-250"
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 bg-bg3 border border-[rgba(48,54,61,0.5)] rounded-lg
                                flex items-center justify-center text-xl">
                  {project.icon}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[0.7rem] text-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                  Production
                </div>
              </div>

              <h3 className="text-[1.05rem] font-semibold text-text1 mb-2.5">{project.title}</h3>
              <p className="text-[0.875rem] text-text2 leading-[1.65] mb-5">{project.desc}</p>

              {/* Pipeline flow */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {project.pipeline.map((step, si) => (
                  <span key={si} className="flex items-center gap-1.5">
                    <span className="font-mono text-[0.68rem] text-text3 bg-bg3
                                     border border-[rgba(48,54,61,0.5)] rounded px-2.5 py-1">
                      {step}
                    </span>
                    {si < project.pipeline.length - 1 && (
                      <span className="text-text3 text-[0.7rem]">→</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="font-mono text-[0.7rem] text-cyan bg-[rgba(88,166,255,0.08)]
                               border border-[rgba(88,166,255,0.15)] rounded px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="flex gap-6 pt-4 border-t border-[rgba(48,54,61,0.5)]">
                {project.metrics.map((m, mi) => (
                  <div key={mi} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.88rem] text-text1 font-semibold">{m.val}</span>
                    <span className="font-mono text-[0.65rem] text-text3 uppercase tracking-wide">{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
