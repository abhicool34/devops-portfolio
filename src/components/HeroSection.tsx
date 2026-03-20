"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroTerminal from "./HeroTerminal";

export default function HeroSection() {
  const [heroVisible, setHeroVisible] = useState(false);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-start pt-20 pb-16 px-6 relative z-10">
      <motion.div
        className="w-full flex justify-center mt-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <HeroTerminal onComplete={() => setHeroVisible(true)} />
      </motion.div>

      <div className="w-full max-w-[680px] text-center pt-14 flex flex-col items-center">
        <motion.h1
          className="font-sans font-black tracking-tight leading-none mb-5 whitespace-nowrap"
          style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="text-text1">Akhilesh </span>
          <span style={{
            background: "linear-gradient(90deg,#00d084 0%,#00e5c3 40%,#58a6ff 70%,#a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Maurya</span>
        </motion.h1>

        <motion.div
          className="flex gap-5 items-center justify-center text-text2 flex-wrap mb-4"
          style={{ fontSize: "0.97rem" }}
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span>DevOps Engineer</span>
          <span className="text-text3 text-sm">|</span>
          <span>SRE</span>
          <span className="text-text3 text-sm">|</span>
          <span>Platform Engineer</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 font-mono text-sm font-semibold text-green justify-center mb-11"
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <span className="pulse-dot" />
          <span>Available for hire</span>
        </motion.div>

        <motion.button
          className="flex flex-col items-center gap-1 text-text3 text-xs cursor-pointer bg-transparent border-none arrow-bounce"
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown size={20} />
        </motion.button>
      </div>
    </section>
  );
}
