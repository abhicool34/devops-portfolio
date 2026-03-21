"use client";
import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

type HistoryEntry =
  | { kind: "system"; html: string }
  | { kind: "user";   text: string }
  | { kind: "output"; html: string }
  | { kind: "error";  text: string };

function wait(ms: number) { return new Promise<void>((r) => setTimeout(r, ms)); }

export default function ContactSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const bodyRef   = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const [history, setHistory]   = useState<HistoryEntry[]>([]);
  const [input, setInput]       = useState("");
  const [busy, setBusy]         = useState(false);
  const [booted, setBooted]     = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (!booted) {
      async function boot() {
        setBusy(true);
        await wait(400);
        push({ kind: "system", html: `<span class="text-green">$ </span><span class="text-cyan">ssh akhilesh@portfolio.dev</span>` });
        await wait(600);
        push({ kind: "system", html: `<span class="text-[#8b949e]">Connecting to portfolio.dev ...</span>` });
        await wait(800);
        push({ kind: "system", html: `<span class="text-green font-medium">Connection established.</span>` });
        await wait(300);
        push({ kind: "system", html: `&nbsp;` });
        push({ kind: "system", html: `<span class="text-[#8b949e]">Welcome! <span class="text-[#e6edf3] font-medium">Akhilesh Maurya</span> — DevOps Engineer &amp; SRE</span>` });
        await wait(200);
        push({ kind: "system", html: menuHtml() });
        setBusy(false);
        setBooted(true);
      }
      boot();
    }
  }, []); // eslint-disable-line

  function push(entry: HistoryEntry) { setHistory((prev) => [...prev, entry]); }

  function menuHtml() {
    return `
<div class="space-y-0.5 mt-1">
  <div class="text-[#8b949e]">Choose an option:</div>
  <div class="text-cyan">&nbsp;[1]&nbsp; Send a message</div>
  <div class="text-cyan">&nbsp;[2]&nbsp; View resume</div>
  <div class="text-cyan">&nbsp;[3]&nbsp; Connect on LinkedIn</div>
  <div class="text-[#6e7681] text-[0.75em]">&nbsp;[help] menu &nbsp;·&nbsp; [clear] clear &nbsp;·&nbsp; [exit] quit</div>
</div>`;
  }

  async function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHistory((prev) => [raw, ...prev.filter((c) => c !== raw)]);
    setHistIdx(-1);
    push({ kind: "user", text: raw });
    setBusy(true);
    await wait(160);

    if (cmd === "1" || cmd === "message" || cmd === "mail" || cmd === "email" || cmd === "send a message") {
      push({ kind: "output", html: `<span class="text-green">▶ Opening mail client...</span>` });
      await wait(400);
      push({ kind: "output", html: `<span class="text-[#8b949e]">→ <a href="mailto:${CONTACT.email}" class="text-cyan underline underline-offset-2 hover:text-green transition-colors">${CONTACT.email}</a></span>` });
      window.location.href = `mailto:${CONTACT.email}`;
    } else if (cmd === "2" || cmd === "resume" || cmd === "cv" || cmd === "view resume") {
      push({ kind: "output", html: `<span class="text-green">▶ Navigating to About section...</span>` });
      await wait(500);
      push({ kind: "output", html: `<span class="text-[#8b949e]">→ Scroll up for the <span class="text-green">Download Resume</span> button.</span>` });
      await wait(300);
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "3" || cmd === "linkedin") {
      push({ kind: "output", html: `<span class="text-green">▶ Opening LinkedIn profile...</span>` });
      await wait(400);
      push({ kind: "output", html: `<span class="text-[#8b949e]">→ <a href="${CONTACT.linkedin}" target="_blank" rel="noreferrer" class="text-cyan underline underline-offset-2 hover:text-green transition-colors">${CONTACT.linkedin}</a></span>` });
      window.open(CONTACT.linkedin, "_blank");
    } else if (cmd === "help" || cmd === "menu") {
      push({ kind: "output", html: menuHtml() });
    } else if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      push({ kind: "system", html: menuHtml() });
    } else if (cmd === "whoami") {
      push({ kind: "output", html: `<span class="text-green">akhilesh-maurya</span> <span class="text-[#8b949e]">— DevOps Engineer | SRE</span>` });
    } else if (cmd === "pwd") {
      push({ kind: "output", html: `<span class="text-[#8b949e]">/home/akhilesh/portfolio</span>` });
    } else if (cmd === "ls" || cmd === "ls -la") {
      push({ kind: "output", html: `<span class="text-cyan">about/&nbsp; skills/&nbsp; experience/&nbsp; resume.pdf</span>` });
    } else if (cmd === "date") {
      push({ kind: "output", html: `<span class="text-[#8b949e]">${new Date().toString()}</span>` });
    } else if (cmd === "uptime") {
      push({ kind: "output", html: `<span class="text-[#8b949e]">8+ years — no downtime recorded ✓</span>` });
    } else if (cmd === "cat resume.pdf") {
      push({ kind: "output", html: `<span class="text-green">▶ Downloading resume...</span>` });
      await wait(400);
      const a = document.createElement("a");
      a.href = "/Akhilesh_CV.pdf"; a.download = "Akhilesh_Maurya_Resume.pdf"; a.click();
    } else if (cmd === "exit" || cmd === "quit" || cmd === "logout") {
      push({ kind: "output", html: `<span class="text-[#8b949e]">Thanks for visiting! Connection closed.</span>` });
    } else {
      push({ kind: "error", text: `bash: ${raw}: command not found — type 'help' for options.` });
    }
    setBusy(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !busy) { const v = input; setInput(""); runCommand(v); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next); setInput(cmdHistory[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const opts = ["1","2","3","help","clear","whoami","pwd","ls","date","uptime","exit","resume","linkedin","message","cat resume.pdf"];
      const match = opts.find((o) => o.startsWith(input.toLowerCase()) && o !== input.toLowerCase());
      if (match) setInput(match);
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10" ref={ref}>

        {/* Heading */}
        <motion.div className="text-center mb-10 md:mb-16"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <h2 className="font-sans text-[2rem] md:text-[2.6rem] font-bold text-text1 mb-3">
            <span className="font-mono text-sm md:text-base text-green mr-2 md:mr-3">04.</span>
            Get In Touch
          </h2>
          <p className="text-[0.88rem] md:text-[0.95rem] text-text2 max-w-[380px] md:max-w-[440px] mx-auto leading-[1.7]">
            Looking for a DevOps engineer who can transform your infrastructure? Let&apos;s connect.
          </p>
        </motion.div>

        {/* Interactive SSH Terminal */}
        <motion.div
          className="max-w-[700px] mx-auto mb-8 md:mb-12"
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div
            className="bg-bg2 border border-[rgba(48,54,61,0.8)] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-1.5 px-3 md:px-4 py-2.5 md:py-3 bg-bg3 border-b border-[rgba(48,54,61,0.8)]">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28ca41]" />
              <span className="font-mono text-[0.65rem] md:text-xs text-text3 ml-2 flex-1 truncate">
                ssh akhilesh@portfolio.dev
              </span>
              <span className="font-mono text-[0.65rem] md:text-xs text-text3 hidden sm:block">
                interactive shell
              </span>
            </div>

            {/* Output */}
            <div
              ref={bodyRef}
              className="px-3 md:px-5 pt-3 md:pt-4 pb-2 font-mono text-[0.75rem] md:text-[0.81rem]
                         leading-[1.8] md:leading-[1.85] h-[260px] md:h-[300px] overflow-y-auto"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#00d084 #161b22" }}
            >
              {history.map((entry, i) => {
                if (entry.kind === "system" || entry.kind === "output")
                  return <div key={i} dangerouslySetInnerHTML={{ __html: entry.html }} className="block" />;
                if (entry.kind === "user")
                  return (
                    <div key={i} className="block">
                      <span className="text-green">$ </span>
                      <span className="text-text1">{entry.text}</span>
                    </div>
                  );
                if (entry.kind === "error")
                  return <div key={i} className="block text-[#ff6b6b] break-all">{entry.text}</div>;
                return null;
              })}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-1 px-3 md:px-5 py-2.5 md:py-3 border-t border-[rgba(48,54,61,0.5)]">
              <span className="text-green font-mono text-[0.75rem] md:text-[0.81rem] flex-shrink-0">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={busy}
                autoComplete="off"
                spellCheck={false}
                placeholder={booted ? "type a command… (try 'help')" : ""}
                className="flex-1 bg-transparent border-none outline-none
                           font-mono text-[0.75rem] md:text-[0.81rem]
                           text-text1 placeholder-text3 caret-green disabled:opacity-50"
              />
              {busy && <span className="term-cursor" />}
            </div>

            {/* Quick hint bar */}
            <div className="px-3 md:px-5 py-1.5 border-t border-[rgba(48,54,61,0.3)]
                            flex gap-2 md:gap-3 flex-wrap items-center">
              {["1","2","3","help","clear"].map((hint) => (
                <button key={hint}
                  onClick={() => { setInput(hint); inputRef.current?.focus(); }}
                  className="font-mono text-[0.6rem] md:text-[0.65rem] text-text3 hover:text-cyan
                             transition-colors cursor-pointer bg-transparent border-none"
                >
                  [{hint}]
                </button>
              ))}
              <span className="font-mono text-[0.6rem] md:text-[0.65rem] text-text3 ml-auto hidden sm:block">
                ↑↓ history · Tab complete
              </span>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-6 md:gap-8 justify-center flex-wrap items-center"
          variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-[0.85rem] md:text-[0.88rem] text-text2
                       hover:text-text1 transition-colors duration-200">
            <Linkedin size={17} /> LinkedIn
          </a>

          {/* Email reveal */}
          <button
            onClick={() => setEmailRevealed((v) => !v)}
            className="flex items-center gap-2 text-[0.85rem] md:text-[0.88rem] text-text2
                       hover:text-text1 transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
            title="Click to reveal email address"
          >
            <Mail size={17} />
            <AnimatePresence mode="wait">
              {emailRevealed ? (
                <motion.span key="email"
                  initial={{ opacity: 0, width: 0, x: -8 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden whitespace-nowrap font-mono text-green text-[0.82rem]"
                >
                  {CONTACT.email}
                </motion.span>
              ) : (
                <motion.span key="label"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-text2"
                >
                  Email
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Phone reveal */}
          <button
            onClick={() => setPhoneRevealed((v) => !v)}
            className="flex items-center gap-2 text-[0.85rem] md:text-[0.88rem] text-text2
                       hover:text-text1 transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
            title="Click to reveal phone number"
          >
            <Phone size={17} />
            <AnimatePresence mode="wait">
              {phoneRevealed ? (
                <motion.span key="num"
                  initial={{ opacity: 0, width: 0, x: -8 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden whitespace-nowrap font-mono text-green text-[0.82rem]"
                >
                  {CONTACT.phone}
                </motion.span>
              ) : (
                <motion.span key="label"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-text2"
                >
                  Phone
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
