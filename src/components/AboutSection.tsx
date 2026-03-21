"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, MapPin, Mail } from "lucide-react";
import { POD_ITEMS, STATS, CONTACT } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

function AnimatedStat({ value, suffix, label, icon }: {
  value: string; suffix: string; label: string; icon: string;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: false, margin: "-60px" });
  const [display, setDisplay] = useState(value + suffix);
  const frameRef = useRef<number>(0);
  const hasRun   = useRef(false);
  const isDecimal = value.includes(".");
  const numeric   = parseFloat(value);
  const DURATION  = 1800;

  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true;
      const startTime = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - startTime) / DURATION, 1);
        const eased    = 1 - Math.pow(1 - progress, 2);
        const current  = numeric * eased;
        setDisplay(isDecimal ? current.toFixed(2) + suffix : Math.round(current) + suffix);
        if (progress < 1) { frameRef.current = requestAnimationFrame(tick); }
        else { setDisplay(value + suffix); }
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    if (!inView) {
      hasRun.current = false;
      cancelAnimationFrame(frameRef.current);
      setDisplay("0" + suffix);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView]); // eslint-disable-line

  return (
    <motion.div
      ref={ref}
      className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-5 md:p-7 text-center
                 hover:border-[rgba(0,208,132,0.3)] hover:-translate-y-0.5 transition-all duration-250"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-xl md:text-2xl mb-2 md:mb-3">{icon}</div>
      <div className="font-sans text-[1.6rem] md:text-[2rem] font-extrabold text-text1 leading-none mb-1 md:mb-1.5 tabular-nums">
        {display}
      </div>
      <div className="font-mono text-[0.62rem] md:text-[0.72rem] text-text3 uppercase tracking-widest leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="about" className="py-16 md:py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10" ref={ref}>

        {/* Heading */}
        <motion.div className="mb-3 md:mb-4"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="font-mono text-sm text-green font-medium">01.</span>
          <h2 className="font-sans text-[1.8rem] md:text-[2.2rem] font-bold text-text1 inline ml-2 md:ml-3">
            About Me
          </h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>

        <motion.p className="font-mono text-xs text-text3 mb-8 md:mb-12"
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="text-green">$ </span>kubectl describe pod/akhilesh-maurya
        </motion.p>

        {/* Two-column → single on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">

          {/* Bio card */}
          <motion.div
            className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-5 md:p-7
                       hover:border-[rgba(0,208,132,0.3)] transition-colors duration-250"
            variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
          >
            <div className="flex items-center gap-2 mb-4 md:mb-5 font-mono text-xs text-text2">
              <span className="pulse-dot" />
              <span className="truncate">pod/akhilesh-maurya — Running</span>
            </div>
            <div className="space-y-3 md:space-y-4 text-[0.88rem] md:text-[0.93rem] text-text2 leading-[1.7] md:leading-[1.75]">
              <p>
                DevOps &amp; SRE Engineer with{" "}
                <span className="text-green font-medium">8+ years</span> of experience in{" "}
                <span className="text-cyan">AWS</span> and{" "}
                <span className="text-cyan">GCP</span> cloud environments. Expertise in
                Infrastructure as Code (Terraform, CloudFormation), Kubernetes (EKS/GKE),
                CI/CD (Jenkins), and production-grade monitoring.
              </p>
              <p>
                Proven track record of deploying{" "}
                <span className="text-green font-medium">50+ applications</span>, improving
                system reliability, reducing downtime, and implementing disaster recovery strategies.
              </p>
              <p>
                Currently at{" "}
                <span className="text-cyan">Honeywell International Inc</span> as Software
                Engineer 2 SRE DevOps, managing 30+ node Kubernetes clusters and large-scale
                AWS infrastructure.
              </p>
            </div>

            <div className="mt-5 space-y-2 border-t border-[rgba(48,54,61,0.5)] pt-4">
              {[
                { icon: <Mail size={13} />,   text: CONTACT.email    },
                { icon: <MapPin size={13} />, text: CONTACT.location },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-[0.72rem] md:text-[0.75rem] text-text3">
                  <span className="text-green flex-shrink-0">{item.icon}</span>
                  <span className="break-all">{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href="/Akhilesh_CV.pdf"
              download="Akhilesh_Maurya_Resume.pdf"
              className="mt-4 md:mt-5 inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5
                         bg-[rgba(0,208,132,0.1)] border border-[rgba(0,208,132,0.3)] rounded-lg
                         font-mono text-[0.75rem] md:text-[0.78rem] text-green
                         hover:bg-[rgba(0,208,132,0.18)] hover:border-green
                         active:scale-95 transition-all duration-200 group"
            >
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download Resume
            </a>
          </motion.div>

          {/* Pod list + education */}
          <motion.div
            className="flex flex-col gap-2.5 md:gap-3"
            variants={fadeUp} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}
          >
            {POD_ITEMS.map((pod, i) => (
              <div key={i}
                className="bg-bg3 border border-[rgba(48,54,61,0.5)] rounded-lg px-3 md:px-4 py-3 md:py-3.5
                           flex items-center gap-3 md:gap-4
                           hover:border-[rgba(0,208,132,0.25)] transition-colors duration-200"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[rgba(0,208,132,0.08)]
                                border border-[rgba(0,208,132,0.15)] rounded-lg
                                flex items-center justify-center text-sm md:text-base flex-shrink-0">
                  {pod.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[0.75rem] md:text-[0.82rem] text-text1 font-medium flex items-center gap-1.5 flex-wrap">
                    <span className="truncate">{pod.name}</span>
                    <span className="font-mono text-[0.62rem] md:text-[0.68rem] text-green
                                     bg-[rgba(0,208,132,0.1)] border border-[rgba(0,208,132,0.2)]
                                     rounded px-1.5 py-0.5 flex-shrink-0">
                      Running
                    </span>
                  </div>
                  <div className="text-[0.75rem] md:text-[0.8rem] text-text3 mt-0.5 truncate">{pod.desc}</div>
                </div>
              </div>
            ))}

            {/* Education */}
            <div className="bg-bg3 border border-[rgba(48,54,61,0.5)] rounded-lg px-3 md:px-4 py-3.5 md:py-4
                            hover:border-[rgba(0,208,132,0.25)] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm md:text-base">🎓</span>
                <span className="font-mono text-[0.78rem] md:text-[0.82rem] text-text1 font-medium">Education</span>
              </div>
              <div className="font-mono text-[0.73rem] md:text-[0.78rem] text-green">
                Bachelor Computer Application (BCA)
              </div>
              <div className="font-mono text-[0.68rem] md:text-[0.72rem] text-text3 mt-0.5">
                Tilak Maharashtra University · 2013–2017
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats — 2×2 on mobile, 4×1 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS.map((s, i) => (
            <AnimatedStat key={i} icon={s.icon} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

      </div>
    </section>
  );
}
