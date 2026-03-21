"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <footer className="border-t border-[rgba(48,54,61,0.8)] px-4 sm:px-6 md:px-10 py-4 md:py-5 relative z-10">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-3">

          {/* Main row — stack on mobile */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-3 text-center sm:text-left">
            <p className="font-mono text-[0.7rem] md:text-[0.78rem] text-text3">
              <span className="text-green">&gt;_</span>{" "}
              echo &quot;Built with <span className="text-[#ff6b6b]">❤</span> and lots of coffee&quot;
            </p>
            <div className="font-mono text-[0.68rem] md:text-[0.78rem] text-text3 flex gap-2 md:gap-3 items-center flex-wrap justify-center">
              <span>v4.0.0</span>
              <span className="text-[rgba(48,54,61,0.8)]">|</span>
              <span className="hidden sm:inline">Next.js + Tailwind + Framer Motion</span>
              <span className="text-[rgba(48,54,61,0.8)] hidden sm:inline">|</span>
              <span>© 2026 Akhilesh Maurya</span>
            </div>
          </div>

          {/* Status bar — scroll on mobile */}
          <div className="flex gap-4 md:gap-6 pt-2 md:pt-2.5 border-t border-[rgba(48,54,61,0.5)]
                          justify-start md:justify-center overflow-x-auto pb-1
                          scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {[
              { dot: true, text: "SYS: OPERATIONAL" },
              { text: "CPU: 12%" },
              { text: "MEM: 3.2/16 GB" },
              { text: "NET: 1.2 Gbps" },
              { text: "PODS: 4/4 Running" },
              { text: "REGION: ap-south-1" },
            ].map((item, i) => (
              <div key={i}
                className="font-mono text-[0.62rem] md:text-[0.7rem] text-text3
                           flex items-center gap-1 md:gap-1.5 flex-shrink-0">
                {item.dot && <span className="pulse-dot" style={{ width: 5, height: 5 }} />}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <motion.button
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 w-8 h-8 md:w-9 md:h-9
                   bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-full
                   flex items-center justify-center text-green z-50
                   hover:border-green hover:-translate-y-0.5 active:scale-90
                   transition-all duration-200 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={15} />
      </motion.button>
    </>
  );
}
