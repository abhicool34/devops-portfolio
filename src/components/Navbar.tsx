"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar({ visible }: { visible: boolean }) {
  const [active, setActive]   = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const progress       = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(total > 0 ? (window.scrollY / total) * 100 : 0);
      const ids = NAV_LINKS.map((l) => l.toLowerCase()).filter((id) => id !== "home");
      let current = "Home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100)
          current = id.charAt(0).toUpperCase() + id.slice(1);
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
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
        className="fixed top-0 left-0 right-0 z-50
                   bg-[rgba(13,17,23,0.95)] backdrop-blur-md
                   border-b border-[rgba(48,54,61,0.8)]"
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-14">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm tracking-tight flex-shrink-0"
            onClick={(e) => { e.preventDefault(); scrollTo("Home"); }}
          >
            <span className="text-green">&gt;_</span>
            <span className="text-text1"> akhilesh</span>
            <span className="text-cyan">@</span>
            <span className="text-text1">devops</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`font-sans text-sm tracking-wide transition-colors duration-200
                    bg-transparent border-none cursor-pointer
                    ${active === link ? "text-text1" : "text-text2 hover:text-text1"}`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text2 hover:text-green transition-colors
                       bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden md:hidden border-t border-[rgba(48,54,61,0.5)]"
        >
          <div className="px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`text-left font-sans text-sm py-2.5 px-3 rounded-lg
                  transition-colors duration-150 bg-transparent border-none cursor-pointer w-full
                  ${active === link
                    ? "text-green bg-[rgba(0,208,132,0.08)]"
                    : "text-text2 hover:text-text1 hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
              >
                {active === link && <span className="mr-2 text-green text-xs">▶</span>}
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
