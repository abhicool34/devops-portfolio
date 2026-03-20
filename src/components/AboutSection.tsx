"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, MapPin, Mail } from "lucide-react";
import { POD_ITEMS, STATS, CONTACT } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: false, margin: "-80px" });
  const counted  = useRef(false);

  useEffect(() => {
    if (!inView) { counted.current = false; return; }
    if (counted.current || !statsRef.current) return;
    counted.current = true;

    const ctx = gsap.context(() => {
      statsRef.current?.querySelectorAll("[data-count]").forEach((el) => {
        const raw     = el.getAttribute("data-count") ?? "0";
        const suffix  = el.getAttribute("data-suffix") ?? "";
        const target  = parseFloat(raw);
        const isDecimal = raw.includes(".");
        gsap.fromTo(
          { val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              (el as HTMLElement).textContent = isDecimal
                ? this.targets()[0].val.toFixed(2) + suffix
                : Math.round(this.targets()[0].val) + suffix;
            },
          }
        );
      });
    }, statsRef);
    return () => ctx.revert();
  }, [inView]);

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-10" ref={ref}>

        <motion.div className="mb-4" variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="font-mono text-sm text-green font-medium">01.</span>
          <h2 className="font-sans text-[2.2rem] font-bold text-text1 inline ml-3">About Me</h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>
        <motion.p className="font-mono text-xs text-text3 mb-12" variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span className="text-green">$ </span>kubectl describe pod/akhilesh-maurya
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bio card */}
          <motion.div
            className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-7 hover:border-[rgba(0,208,132,0.3)] transition-colors duration-250"
            variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
          >
            <div className="flex items-center gap-2 mb-5 font-mono text-xs text-text2">
              <span className="pulse-dot" /><span>pod/akhilesh-maurya — Running</span>
            </div>
            <div className="space-y-4 text-[0.93rem] text-text2 leading-[1.75]">
              <p>
                DevOps &amp; SRE Engineer with <span className="text-green font-medium">8+ years</span> of
                experience in <span className="text-cyan">AWS</span> and <span className="text-cyan">GCP</span> cloud
                environments. Expertise in Infrastructure as Code (Terraform, CloudFormation),
                Kubernetes (EKS/GKE), CI/CD (Jenkins), and production-grade monitoring.
              </p>
              <p>
                Proven track record of deploying <span className="text-green font-medium">50+ applications</span>,
                improving system reliability, reducing downtime, and implementing disaster recovery strategies.
              </p>
              <p>
                Currently at <span className="text-cyan">Honeywell International Inc</span> as
                Software Engineer 2 SRE DevOps, managing 30+ node Kubernetes clusters and
                large-scale AWS infrastructure.
              </p>
            </div>

            <div className="mt-6 space-y-2 border-t border-[rgba(48,54,61,0.5)] pt-4">
              {[
                { icon: <Mail size={13} />,   text: CONTACT.email    },
                { icon: <MapPin size={13} />, text: CONTACT.location },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-[0.75rem] text-text3">
                  <span className="text-green">{item.icon}</span>{item.text}
                </div>
              ))}
            </div>

            <a
              href="/Akhilesh_CV.pdf" download="Akhilesh_Maurya_Resume.pdf"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5
                         bg-[rgba(0,208,132,0.1)] border border-[rgba(0,208,132,0.3)] rounded-lg
                         font-mono text-[0.78rem] text-green
                         hover:bg-[rgba(0,208,132,0.18)] hover:border-green transition-all duration-200 group"
            >
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download Resume
            </a>
          </motion.div>

          {/* Pod list + education */}
          <motion.div className="flex flex-col gap-3" variants={fadeUp} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}>
            {POD_ITEMS.map((pod, i) => (
              <div key={i}
                className="bg-bg3 border border-[rgba(48,54,61,0.5)] rounded-lg px-4 py-3.5 flex items-center gap-4
                           hover:border-[rgba(0,208,132,0.25)] transition-colors duration-200"
              >
                <div className="w-9 h-9 bg-[rgba(0,208,132,0.08)] border border-[rgba(0,208,132,0.15)] rounded-lg flex items-center justify-center text-base flex-shrink-0">
                  {pod.icon}
                </div>
                <div>
                  <div className="font-mono text-[0.82rem] text-text1 font-medium flex items-center gap-2 flex-wrap">
                    {pod.name}
                    <span className="font-mono text-[0.68rem] text-green bg-[rgba(0,208,132,0.1)] border border-[rgba(0,208,132,0.2)] rounded px-2 py-0.5">Running</span>
                  </div>
                  <div className="text-[0.8rem] text-text3 mt-0.5">{pod.desc}</div>
                </div>
              </div>
            ))}
            <div className="bg-bg3 border border-[rgba(48,54,61,0.5)] rounded-lg px-4 py-4 hover:border-[rgba(0,208,132,0.25)] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🎓</span>
                <span className="font-mono text-[0.82rem] text-text1 font-medium">Education</span>
              </div>
              <div className="font-mono text-[0.78rem] text-green">Bachelor Computer Application (BCA)</div>
              <div className="font-mono text-[0.72rem] text-text3 mt-0.5">Tilak Maharashtra University · 2013–2017</div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={i}
              className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-7 text-center
                         hover:border-[rgba(0,208,132,0.3)] hover:-translate-y-0.5 transition-all duration-250"
              variants={fadeUp} custom={4 + i} initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="font-sans text-[2rem] font-extrabold text-text1 block leading-none mb-1.5"
                data-count={s.value} data-suffix={s.suffix}>0{s.suffix}</div>
              <div className="font-mono text-[0.72rem] text-text3 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
