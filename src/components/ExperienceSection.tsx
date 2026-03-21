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
    <section id="experience" className="py-16 md:py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10" ref={ref}>

        <motion.div className="mb-3 md:mb-4"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="font-mono text-sm text-green font-medium">03.</span>
          <h2 className="font-sans text-[1.8rem] md:text-[2.2rem] font-bold text-text1 inline ml-2 md:ml-3">
            Experience
          </h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>

        <motion.p className="font-mono text-xs text-text3 mb-8 md:mb-12"
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="text-green">$ </span>git log --oneline --graph
        </motion.p>

        <div ref={timelineRef} className="relative">
          {/* Timeline line — offset for smaller version marker on mobile */}
          <div
            className="timeline-line absolute left-5 md:left-7 top-4 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg,#00d084 0%,rgba(0,208,132,0.1) 100%)",
              transform: "scaleY(0)", transformOrigin: "top",
            }}
          />

          <div className="space-y-5 md:space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={i}
                className="flex gap-4 md:gap-8"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                {/* Version bubble — smaller on mobile */}
                <div
                  className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-green
                             flex items-center justify-center font-mono text-[0.6rem] md:text-[0.72rem]
                             text-green font-bold bg-bg relative z-10"
                  style={{ boxShadow: "0 0 0 3px #0d1117" }}
                >
                  {exp.version}
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg
                                px-4 md:px-7 py-4 md:py-6
                                hover:border-[rgba(0,208,132,0.25)] transition-colors duration-250">

                  {/* Role + date */}
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="text-[0.95rem] md:text-[1.05rem] font-semibold text-text1 leading-snug">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1 font-mono text-[0.68rem] md:text-[0.75rem] text-text3
                                    bg-bg3 border border-[rgba(48,54,61,0.5)] rounded px-2 md:px-3 py-1
                                    flex-shrink-0">
                      📅 <span className="hidden sm:inline">{exp.period}</span>
                      <span className="sm:hidden">{exp.period.replace(" – ", "–")}</span>
                    </div>
                  </div>

                  {/* Company + location */}
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
                    <span className="text-[0.82rem] md:text-[0.88rem] text-text2">🏢 {exp.company}</span>
                    <span className="text-[0.75rem] md:text-[0.82rem] text-text3">📍 {exp.location}</span>
                  </div>

                  <p className="text-[0.82rem] md:text-[0.875rem] text-text2 leading-[1.65] md:leading-[1.7] mb-3 md:mb-4">
                    {exp.desc}
                  </p>

                  <ul className="space-y-1 mb-3 md:mb-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-[0.82rem] md:text-[0.875rem] text-text2 leading-[1.65] flex items-start gap-2">
                        <span className="text-green flex-shrink-0 mt-[2px]">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, ti) => (
                      <span key={ti}
                        className="font-mono text-[0.65rem] md:text-[0.7rem] text-text2
                                   bg-bg3 border border-[rgba(48,54,61,0.5)] rounded px-2 md:px-2.5 py-0.5 md:py-1">
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
