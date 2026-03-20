# Akhilesh Maurya — DevOps Portfolio

Personal portfolio site for **Akhilesh Maurya**, DevOps Engineer & SRE at Honeywell International.

Built with:
- **Next.js 15** (App Router + TypeScript)
- **Tailwind CSS 3**
- **Framer Motion 11** — section reveals, entrance animations
- **GSAP 3 + ScrollTrigger** — skill bar fills, timeline line draw, stat counters

---

## Quick Start (3 steps)

### Step 1 — Prerequisites
Install **Node.js 18+**: https://nodejs.org

```bash
node -v   # must be v18 or higher
npm -v    # must be v9 or higher
```

### Step 2 — Install
```bash
cd devops-portfolio
npm install
```

### Step 3 — Run
```bash
npm run dev
```

Open **http://localhost:3000** ✅

---

## Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
devops-portfolio/
├── public/
│   └── Akhilesh_CV.pdf          ← Resume PDF (for download button)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             ← Assembles all sections
│   │   └── globals.css
│   ├── components/
│   │   ├── GridBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HeroTerminal.tsx     ← Typewriter animation
│   │   ├── AboutSection.tsx     ← Bio + Download Resume button
│   │   ├── SkillsSection.tsx    ← GSAP skill bars
│   │   ├── ExperienceSection.tsx← 4 jobs + GSAP timeline
│   │   ├── ContactSection.tsx   ← Fully interactive terminal
│   │   └── Footer.tsx
│   └── lib/
│       └── data.ts              ← ALL content lives here
```

---

## Contact Terminal Commands

The SSH terminal on the Contact page is fully interactive:

| Command | Action |
|---------|--------|
| `1` | Opens mail client (send email) |
| `2` | Scrolls to About section (download resume) |
| `3` | Opens LinkedIn profile |
| `4` | Opens GitHub |
| `help` | Shows menu again |
| `clear` | Clears terminal |
| `whoami` | Shows identity |
| `ls` | Lists files |
| `pwd` | Shows current path |
| `date` | Shows current date |
| `uptime` | Shows "8+ years uptime" |
| `cat resume.pdf` | Downloads the resume |
| `exit` | Closes connection |
| ↑ / ↓ | Navigate command history |
| Tab | Auto-complete commands |

---

## Updating Content

All content is in **`src/lib/data.ts`**:
- `TERMINAL_LINES` — hero terminal output
- `STATS` — the 4 stat cards
- `POD_ITEMS` — running pod list
- `SKILL_GROUPS` — skill bars + percentages
- `EXPERIENCE` — job timeline (4 entries)
- `CONTACT` — email, phone, LinkedIn, GitHub

To update the resume PDF, replace `public/Akhilesh_CV.pdf` with the new file.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm: command not found` | Install Node.js from https://nodejs.org |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Resume not downloading | Make sure `public/Akhilesh_CV.pdf` exists |
