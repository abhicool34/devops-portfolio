"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("Home");
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(total > 0 ? (window.scrollY / total) * 100 : 0);

      // Update active section
      const sectionIds = NAV_LINKS.map((l) => l.toLowerCase()).filter((id) => id !== "home");
      let current = "Home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id.charAt(0).toUpperCase() + id.slice(1);
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  const scrollTo = (id: string) => {
    if (id === "Home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        id="progress-bar"
        style={{ width: smoothProgress.get() + "%" }}
      />
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-14
                   bg-[rgba(13,17,23,0.92)] backdrop-blur-md border-b border-[rgba(48,54,61,0.8)]"
      >
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm tracking-tight"
          onClick={(e) => { e.preventDefault(); scrollTo("Home"); }}
        >
          <span className="text-green">&gt;_</span>
          <span className="text-text1"> akhilesh</span>
          <span className="text-cyan">@</span>
          <span className="text-text1">devops</span>
        </a>

        {/* Links */}
        <ul className="flex gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={`font-sans text-sm tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer
                  ${active === link ? "text-text1" : "text-text2 hover:text-text1"}`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
