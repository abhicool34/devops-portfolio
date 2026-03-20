"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS } from "@/lib/data";
import CICDPipeline from "./CICDPipeline";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// once: false so animations replay on scroll up
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

function SkillCard({ group, index }: { group: typeof SKILL_GROUPS[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cardRef, { once: false, margin: "-60px" });
  const animated = useRef(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // Kill old triggers so they rebuild on each inView change
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === cardRef.current) t.kill();
      });

      if (inView) {
        cardRef.current?.querySelectorAll(".skill-fill").forEach((bar) => {
          gsap.to(bar, {
            width: bar.getAttribute("data-width") + "%",
            duration: 1.4, ease: "power2.out", delay: index * 0.05,
          });
        });
      } else {
        // Reset bars when scrolled out so they re-animate coming back
        cardRef.current?.querySelectorAll(".skill-fill").forEach((bar) => {
          gsap.set(bar, { width: 0 });
        });
      }
    }, cardRef);
    return () => ctx.revert();
  }, [inView, index]);

  return (
    <motion.div
      ref={cardRef}
      className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-7 hover:border-[rgba(0,208,132,0.25)] transition-colors duration-250"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={index * 0.5}
    >
      <div className="flex items-center gap-2 font-mono text-[0.82rem] text-text2 font-medium mb-5">
        <span className="w-2 h-2 rounded-full bg-green" />
        {group.title}
      </div>
      <div className="space-y-4">
        {group.skills.map((skill, si) => (
          <div key={si}>
            <div className="flex justify-between mb-1.5">
              <span className="font-mono text-[0.82rem] text-text1">{skill.name}</span>
              <span className="font-mono text-[0.78rem] text-text3">{skill.pct}%</span>
            </div>
            <div className="h-[3px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <div
                className="skill-fill"
                data-width={skill.pct}
                style={{ width: 0, height: "100%", background: "linear-gradient(90deg,#00d084,#58a6ff)", borderRadius: "2px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const ALL_SKILLS = [
  "AWS (EKS, EC2, RDS, S3, Lambda, VPC, CloudFront, Route53, SageMaker, Glue, Lake Formation, IAM, SQS, SES, Bedrock)",
  "GCP (GKE, PubSub, CloudSQL, Composer, Compute Engine)",
  "Terraform", "CloudFormation", "Docker", "Kubernetes (EKS, GKE)", "Helm",
  "Jenkins", "Python", "Shell Scripting", "Puppet", "Ansible",
  "Linux (CentOS, Ubuntu, RedHat)", "Windows Server",
  "ELK", "Datadog", "Grafana", "PagerDuty", "CloudWatch",
  "Bitbucket", "GitHub", "JFrog", "Jira", "ServiceNow",
];

export default function SkillsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-10" ref={ref}>

        {/* Section heading */}
        <motion.div
          className="mb-4"
          initial="hidden" animate={inView ? "visible" : "hidden"}
          variants={fadeUp} custom={0}
        >
          <span className="font-mono text-sm text-green font-medium">02.</span>
          <h2 className="font-sans text-[2.2rem] font-bold text-text1 inline ml-3">Skills &amp; Pipeline</h2>
          <div className="h-px bg-[rgba(48,54,61,0.8)] mt-2 mb-2" />
        </motion.div>

        <motion.p
          className="font-mono text-xs text-text3 mb-12"
          initial="hidden" animate={inView ? "visible" : "hidden"}
          variants={fadeUp} custom={1}
        >
          <span className="text-green">$ </span>cat /etc/skills/pipeline.yaml
        </motion.p>

        {/* ── CI/CD Pipeline Animation ── */}
        <CICDPipeline />

        {/* Skill bar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {SKILL_GROUPS.map((group, i) => <SkillCard key={i} group={group} index={i} />)}
        </div>

        {/* Full tech stack tags */}
        <motion.div
          className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-lg p-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 font-mono text-[0.82rem] text-text2 font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-green" />
            Full Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((skill, i) => (
              <span key={i}
                className="font-mono text-[0.7rem] text-cyan bg-[rgba(88,166,255,0.07)]
                           border border-[rgba(88,166,255,0.15)] rounded px-2.5 py-1
                           hover:bg-[rgba(88,166,255,0.14)] hover:border-[rgba(88,166,255,0.3)] transition-colors duration-150"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
