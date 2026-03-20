"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function ExperienceSection() {
  const ref         = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView      = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      const line = timelineRef.current?.querySelector(".timeline-line") as HTMLElement;
      if (!line) return;
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%", end: "bottom 70%", scrub: 0.5,
        onUpdate: (self) => { gsap.set(line, { scaleY: self.progress, transformOrigin: "top" }); },
        onLeaveBack: () => { gsap.set(line, { scaleY: 0, transformOrigin: "top" }); },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-10" ref={ref}>
        <motion.div className="mb-4" variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="font-mono text-sm text-green font-medium">03.</span>
          <h2 className="font-sans text-[2.2rem] font-bold text-text1 inline ml-3">Experience</h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>
        <motion.p className="font-mono text-xs text-text3 mb-12" variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="text-green">$ </span>git log --oneline --graph
        </motion.p>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-7 top-4 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg,#00d084 0%,rgba(0,208,132,0.1) 100%)", scale: 0, transformOrigin: "top" }} />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={i} className="flex gap-8"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-green
                             flex items-center justify-center font-mono text-[0.72rem] text-green font-bold bg-bg relative z-10"
                  style={{ boxShadow: "0 0 0 4px #0d1117" }}
                >{exp.version}</div>

                <div className="flex-1 bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg px-7 py-6
                                hover:border-[rgba(0,208,132,0.25)] transition-colors duration-250">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <h3 className="text-[1.05rem] font-semibold text-text1">{exp.role}</h3>
                    <div className="flex items-center gap-1.5 font-mono text-[0.75rem] text-text3
                                    bg-bg3 border border-[rgba(48,54,61,0.5)] rounded px-3 py-1">
                      📅 {exp.period}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-[0.88rem] text-text2">🏢 {exp.company}</span>
                    <span className="text-[0.82rem] text-text3">📍 {exp.location}</span>
                  </div>
                  <p className="text-[0.875rem] text-text2 leading-[1.7] mb-4">{exp.desc}</p>
                  <ul className="space-y-1 mb-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-[0.875rem] text-text2 leading-[1.7] flex items-start gap-2">
                        <span className="text-green flex-shrink-0 mt-[3px]">•</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, ti) => (
                      <span key={ti} className="font-mono text-[0.7rem] text-text2 bg-bg3 border border-[rgba(48,54,61,0.5)] rounded px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
