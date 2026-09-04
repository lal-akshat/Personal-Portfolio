"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";

const NAV_SECTIONS = [
  "me",
  "projects",
  "thoughts",
  "bookshelf",
  "mind",
];

type BulletPart =
  | string
  | { label: string; color: "blue" | "orange" | "green" | "pink" | "purple" };

const heroBullets: BulletPart[][] = [
  [
    "incoming Computer Engineering student @ ",
    { label: "University of Waterloo", color: "blue" },
  ],
  [
    "building ",
    { label: "Caissa", color: "orange" },
    ", a chess application focused on making complex systems actually work",
  ],
  [
    "interested in ",
    { label: "software", color: "blue" },
    " · ",
    { label: "systems", color: "purple" },
    " · ",
    { label: "hardware", color: "green" },
    " · problem solving",
  ],
  [
    "learning by building things, breaking them, and figuring out why they work",
  ],
  ["exploring the space between ideas and implementation"],
  [
    "currently preparing for ",
    { label: "Waterloo", color: "blue" },
    " · Fall 2026",
  ],
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("me");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* ========================================================
     SCROLL REVEAL
     ======================================================== */

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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ========================================================
     ACTIVE SIDEBAR SECTION
     ======================================================== */

  useEffect(() => {
    const sections = NAV_SECTIONS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* ========================================================
     PROJECTS
     ======================================================== */

  const projects = [
    {
      title: "Caissa",
      date: "aug '26",
      image:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1200&q=85",
      description:
        "A chess application built from the ground up, with a focus on game logic and interface design.",
      tags: ["C#", "WinForms"],
    },
    {
      title: "Portfolio",
      date: "aug '26",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
      description:
        "A personal site for documenting projects, ideas, and the things I am learning.",
      tags: ["Next.js", "TypeScript"],
    },
    {
      title: "Simon",
      date: "may '26",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
      description:
        "A small Arduino project built around memory, interaction, and embedded programming.",
      tags: ["Arduino", "C++"],
    },
    {
      title: "NBA Research",
      date: "apr '26",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85",
      description:
        "A data project exploring the relationship between player height and rebounding.",
      tags: ["Python", "Data"],
    },
  ];

  return (
    <main className="site">
      <LoadingScreen />

      {/* =====================================================
          TOP UTILITY BAR
          ===================================================== */}

      <header className="topbar">
        <div className="socials">
          <a
            href="mailto:akshat.lal@example.com"
            aria-label="Email"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
              />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </a>

          <a href="#" aria-label="YouTube">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 17a24 24 0 0 1 0-10 3 3 0 0 1 2.1-2.1 62 62 0 0 1 14.8 0A3 3 0 0 1 21.5 7a24 24 0 0 1 0 10 3 3 0 0 1-2.1 2.1 62 62 0 0 1-14.8 0A3 3 0 0 1 2.5 17Z" />
              <path d="m10 9 5 3-5 3Z" />
            </svg>
          </a>

          <a href="#" aria-label="LinkedIn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8Z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a href="#" aria-label="GitHub">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-3.4a3.3 3.3 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12 12 0 0 0-6.4 0C6.1 2.1 5 2.4 5 2.4a4.7 4.7 0 0 0-.1 3.5A5.1 5.1 0 0 0 3.5 9.4c0 5.1 3.1 6.3 6.1 6.6a3.3 3.3 0 0 0-.9 2.5V22" />
              <path d="M9 20c-3 1-5.5 0-7-3" />
            </svg>
          </a>

          <a href="#" aria-label="X">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l16 16" />
              <path d="M20 4 4 20" />
            </svg>
          </a>

          <a href="#" aria-label="More">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
            </svg>
          </a>
        </div>

        <button
          type="button"
          className="theme-toggle"
          aria-label="Toggle theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section id="me" className="hero">
        <div
          className="hero-particles"
          aria-hidden="true"
        >
          <span className="hero-dot dot-01" />
          <span className="hero-dot dot-02" />
          <span className="hero-dot dot-03" />
          <span className="hero-dot dot-04" />
          <span className="hero-dot dot-05" />
          <span className="hero-dot dot-06" />
          <span className="hero-dot dot-07" />
          <span className="hero-dot dot-08" />
          <span className="hero-dot dot-09" />
          <span className="hero-dot dot-10" />
          <span className="hero-dot dot-11" />
          <span className="hero-dot dot-12" />
          <span className="hero-dot dot-13" />
          <span className="hero-dot dot-14" />
          <span className="hero-dot dot-15" />
          <span className="hero-dot dot-16" />
          <span className="hero-dot dot-17" />
          <span className="hero-dot dot-18" />
          <span className="hero-dot dot-19" />
          <span className="hero-dot dot-20" />
          <span className="hero-dot dot-21" />
          <span className="hero-dot dot-22" />
          <span className="hero-dot dot-23" />
          <span className="hero-dot dot-24" />
          <span className="hero-dot dot-25" />
          <span className="hero-dot dot-26" />
          <span className="hero-dot dot-27" />
          <span className="hero-dot dot-28" />
          <span className="hero-dot dot-29" />
          <span className="hero-dot dot-30" />
        </div>

        <div className="hero-inner">
          <div className="hero-intro">
            <h1 className="hero-name">
              Akshat Lal
            </h1>

            <div className="hero-rule" />

            <p className="hero-badge">
              <span className="badge-highlight">
                Computer Engineering
              </span>
              <span>@ University of Waterloo</span>
            </p>

            <p className="hero-lead">
              i build at the{" "}
              <span className="accent-circle">intersection</span> of{" "}
              <span className="accent-underline">software</span>,{" "}
              <span className="accent-underline">systems</span>, and{" "}
              <span className="accent-underline">hardware</span>
            </p>

            <div className="hero-bullets">
              {heroBullets.map((line, i) => (
                <p className="bullet-line" key={i}>
                  <span className="bullet-marker">&gt;</span>
                  {line.map((part, j) =>
                    typeof part === "string" ? (
                      <span key={j}>{part}</span>
                    ) : (
                      <span
                        key={j}
                        className={`inline-tag tag-${part.color}`}
                      >
                        {part.label}
                      </span>
                    )
                  )}
                </p>
              ))}
            </div>

            <div className="hero-links">
              <a href="#projects">
                View projects
                <span>↗</span>
              </a>

              <a href="#thoughts">
                Read my thoughts
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          ↓
        </div>
      </section>

      {/* =====================================================
          SIDEBAR + CONTENT
          ===================================================== */}

      <div className="layout sidebar-visible">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-small">AKSHAT</div>
            <div className="logo-large">LAL</div>
          </div>

          <nav className="side-nav">
            <a
              href="#me"
              className={
                activeSection === "me" ? "active" : ""
              }
            >
              me
            </a>

            <a
              href="#projects"
              className={
                activeSection === "projects"
                  ? "active"
                  : ""
              }
            >
              projects
            </a>

            <a
              href="#thoughts"
              className={
                activeSection === "thoughts"
                  ? "active"
                  : ""
              }
            >
              drawer of thoughts
            </a>

            <a
              href="#bookshelf"
              className={
                activeSection === "bookshelf"
                  ? "active"
                  : ""
              }
            >
              bookshelf
            </a>

            <a
              href="#mind"
              className={
                activeSection === "mind" ? "active" : ""
              }
            >
              my mind
            </a>
          </nav>

          <div className="music-player">
            <div className="music-controls">
              <button aria-label="Previous">
                ◀
              </button>

              <div className="album-art">
                <div className="album-circle">
                  <span>✦</span>
                </div>
              </div>

              <button aria-label="Next">
                ▶
              </button>
            </div>

            <div className="music-title">
              ♪ Sometimes...
            </div>
          </div>
        </aside>

        <section className="content">
          <section
            id="projects"
            className="projects-section reveal"
          >
            <div className="section-title">
              <span className="section-dot" />
              <span>projects</span>
            </div>

            <div className="project-grid">
              {projects.map((project, i) => (
                <article
                  className="project reveal"
                  key={project.title}
                  style={{
                    transitionDelay: `${(i % 2) * 0.08}s`,
                  }}
                >
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </div>

                  <div className="project-meta">
                    <span>{project.title}</span>

                    <span className="date">
                      {project.date}
                    </span>
                  </div>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="experience"
            className="lower-section reveal"
          >
            <div className="section-title">
              <span className="section-dot" />
              <span>experience</span>
            </div>

            <div className="simple-list">
              <div className="list-row">
                <span>University of Waterloo</span>
                <span>2026 — present</span>
              </div>

              <div className="list-row">
                <span>Chess Club</span>
                <span>President</span>
              </div>

              <div className="list-row">
                <span>Robotics</span>
                <span>Engineering</span>
              </div>
            </div>
          </section>

          <section
            id="thoughts"
            className="lower-section reveal"
          >
            <div className="section-title">
              <span className="section-dot" />
              <span>drawer of thoughts</span>
            </div>

            <div className="thought">
              <span className="thought-date">01</span>
              <p>
                Building things is probably the fastest way
                to figure out what you actually enjoy.
              </p>
            </div>

            <div className="thought">
              <span className="thought-date">02</span>
              <p>
                Make something small. Make it work. Then make
                it better.
              </p>
            </div>
          </section>

          <section
            id="bookshelf"
            className="lower-section reveal"
          >
            <div className="section-title">
              <span className="section-dot" />
              <span>bookshelf</span>
            </div>

            <div className="books">
              <span>
                Designing Data-Intensive Applications
              </span>
              <span>The Pragmatic Programmer</span>
              <span>Clean Code</span>
            </div>
          </section>

          <section
            id="mind"
            className="lower-section mind-section reveal"
          >
            <div className="section-title">
              <span className="section-dot" />
              <span>my mind</span>
            </div>

            <p>
              Currently thinking about software, systems,
              chess, design, university, and what to build
              next.
            </p>
          </section>

          <footer className="reveal">
            <span>© 2026 Akshat Lal</span>
            <span>built with curiosity</span>
          </footer>
        </section>
      </div>
    </main>
  );
}