"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import PageDoodles from "./components/PageDoodles";

const FACTS: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        led <span className="chip chip-sky">VEX Robotics</span> for four
        seasons, going from team member to Team Lead directing design,
        build, and test
      </>
    ),
  },
  {
    text: (
      <>
        built <span className="chip chip-peach">Caissa</span>, a chess
        engine in <span className="chip chip-lavender">C#</span> with an AI
        opponent across 3 rule sets
      </>
    ),
  },
  {
    text: (
      <>
        laying out PCBs in <span className="chip chip-mint">Altium</span>{" "}
        for a robotic arm on the Student Design Team
      </>
    ),
  },
  {
    text: (
      <>
        shipped a full-stack{" "}
        <span className="chip chip-rose">task manager</span> with Next.js,
        TypeScript &amp; SQL
      </>
    ),
  },
  {
    text: (
      <>
        built a <span className="chip chip-yellow">Java Swing</span> image
        editor with custom pixel-manipulation filters
      </>
    ),
  },
  {
    text: (
      <>
        starting Computer Engineering{" "}
        <span className="chip chip-sky">@Waterloo</span> this fall
      </>
    ),
  },
  {
    text: <>seeking summer 2027 co-op opportunities</>,
  },
];

const STICKERS = [
  { label: "♞", cls: "sticker-peach", rotate: -8 },
  { label: "C#", cls: "sticker-lavender", rotate: 5 },
  { label: "⌁", cls: "sticker-sky", rotate: -3 },
  { label: "</>", cls: "sticker-mint", rotate: 7 },
];

const PROJECTS = [
  {
    title: "Caissa",
    date: "aug '26",
    image:
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1200&q=85",
    description:
      "A C# chess engine and WinForms desktop app built from scratch, with reusable board, piece, move, and game-state models. Implements full movement, check, checkmate, and capture logic for all 6 piece types across Standard, Chess960, and Atomic rule sets, plus an AI opponent with its own move-evaluation logic and a UI layer with move highlighting, clocks, and move history.",
    tags: ["C#", ".NET", "WinForms"],
  },
  {
    title: "Task Management Web App",
    date: "jul '26",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
    description:
      "A full-stack task manager built with Next.js and TypeScript, supporting task creation, editing, organization, and status tracking end to end. Backed by a SQL schema and persistence layer so tasks and project state reliably survive across sessions.",
    tags: ["TypeScript", "Next.js", "SQL"],
  },
  {
    title: "Portfolio",
    date: "aug '26",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
    description:
      "This site — a responsive personal portfolio built with Next.js and TypeScript, with a light/dark mode toggle and scroll-triggered animation. Deployed on Vercel with continuous deployment so every pushed change goes live automatically.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Java Image Editor",
    date: "jun '26",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    description:
      "A desktop image editor built in Java Swing, separating image data, editing operations, and UI into distinct components. Event-driven controls apply edits interactively, including grayscale, cropping, rotation, and brightness adjustment via custom pixel-manipulation algorithms.",
    tags: ["Java", "Swing", "OOP"],
  },
  {
    title: "Simon",
    date: "may '26",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    description:
      "A memory game built on Arduino, focused on embedded programming and hardware interaction — reading button input, driving LEDs, and timing sequences directly on the board.",
    tags: ["Arduino", "C++"],
  },
  {
    title: "NBA Research",
    date: "apr '26",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85",
    description:
      "A data project exploring the relationship between player height and rebounding using publicly available NBA statistics.",
    tags: ["Python", "Data"],
  },
];

const EXPERIENCE = [
  {
    role: "Team Lead",
    org: "VEX Robotics Team",
    date: "2022 – 2026",
    accent: "peach",
    bullets: [
      "Competed for 4 consecutive seasons, progressing from team member to Team Lead directing the full design, build, test, and iteration cycle",
      "Directed mechanical design, robot assembly, and programming priorities to deliver a functioning competition robot each season",
      "Ran reliability tests ahead of competition to catch failure points early, reducing the risk of in-match breakdowns",
    ],
  },
  {
    role: "New Member, Electrical Team",
    org: "Student Design Team",
    date: "2026 – Present",
    accent: "mint",
    bullets: [
      "Design and lay out printed circuit boards in Altium Designer for onboard vehicle electronics",
      "Collaborate with senior electrical and mechanical members on component selection and board layout ahead of a moving robotic-arm subsystem build",
    ],
  },
  {
    role: "Computer Engineering",
    org: "University of Waterloo",
    date: "2026 – 2031",
    accent: "sky",
    bullets: ["Bachelor of Applied Science, starting Computer Engineering this fall"],
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    cls: "sky",
    items: ["C#", "Java", "C++", "Python", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    label: "Frameworks & Tools",
    cls: "mint",
    items: [".NET", "WinForms", "React", "Next.js", "Arduino", "Git", "Vercel", "Altium Designer"],
  },
  {
    label: "Concepts",
    cls: "lavender",
    items: [
      "OOP",
      "Data Structures & Algorithms",
      "API Integration",
      "GUI Development",
      "Debugging",
      "PCB Design",
    ],
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site">
      <LoadingScreen />
      <PageDoodles />

      {/* =====================================================
          TOP-RIGHT LINK TOOLBAR
          ===================================================== */}

      <div className="top-toolbar">
        <a
          href="mailto:a7lal@uwaterloo.ca"
          aria-label="Email"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/lal-akshat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
          </svg>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
        </a>

        <a
          href="/resume.pdf"
          download
          aria-label="Resume"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </a>

        <span className="toolbar-divider" />

        <button
          type="button"
          className="toolbar-btn theme-toggle"
          aria-label="Toggle theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </div>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-stickers" aria-hidden="true">
            {STICKERS.map((s) => (
              <span
                key={s.label}
                className={`sticker ${s.cls}`}
                style={{ transform: `rotate(${s.rotate}deg)` }}
              >
                {s.label}
              </span>
            ))}
          </div>

          <h1 className="hero-name">AKSHAT LAL</h1>

          <p className="hero-role">
            <span className="chip chip-yellow chip-role">
              Computer Engineering
            </span>{" "}
            <span className="hero-role-muted">@University of Waterloo</span>
          </p>

          <p className="hero-bio">
            i build at the <span className="circled">intersection</span> of{" "}
            <span className="squiggle">hardware</span>,{" "}
            <span className="squiggle">software</span>, and problem-solving
          </p>

          <div className="facts-list">
            {FACTS.map((fact, i) => (
              <p
                key={i}
                className="fact-row"
                style={{ animationDelay: `${0.55 + i * 0.08}s` }}
              >
                <span className="fact-arrow">&gt;</span>
                {fact.text}
              </p>
            ))}
          </div>

          <nav className="hero-nav">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="mailto:a7lal@uwaterloo.ca">Contact</a>
          </nav>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
          ===================================================== */}

      <section id="projects" className="container-wide projects-section reveal">
        <h2 className="section-title">Projects</h2>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article className="project" key={project.title}>
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              <div className="project-meta">
                <span>{project.title}</span>
                <span className="date">{project.date}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
          ===================================================== */}

      <section id="experience" className="container lower-section reveal">
        <h2 className="section-title">Experience</h2>

        <div className="experience-list">
          {EXPERIENCE.map((job) => (
            <div className={`experience-card accent-${job.accent}`} key={job.role + job.org}>
              <div className="experience-head">
                <div>
                  <p className="experience-role">{job.role}</p>
                  <p className="experience-org">{job.org}</p>
                </div>
                <span className="experience-date">{job.date}</span>
              </div>

              <ul className="experience-bullets">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SKILLS
          ===================================================== */}

      <section id="skills" className="container lower-section reveal">
        <h2 className="section-title">Skills</h2>

        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div className="skills-group" key={group.label}>
              <p className="skills-group-title">{group.label}</p>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item} className={`skill-tag skill-tag-${group.cls}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="reveal">
        <span>© 2026 Akshat Lal</span>
        <div className="footer-links">
          <a href="mailto:a7lal@uwaterloo.ca">Email</a>
          <a href="https://linkedin.com/in/lal-akshat">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </main>
  );
}