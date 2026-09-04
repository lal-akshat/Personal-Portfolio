"use client";

import { useEffect, useState } from "react";

const NAME = "Akshat Lal";

// Fixed positions so server/client markup always match
const STARS = [
  { top: "10%", left: "8%", size: 2, delay: 0.1 },
  { top: "18%", left: "22%", size: 1.5, delay: 0.6 },
  { top: "9%", left: "41%", size: 1.5, delay: 1.1 },
  { top: "24%", left: "63%", size: 2, delay: 0.3 },
  { top: "14%", left: "82%", size: 1.5, delay: 0.9 },
  { top: "32%", left: "92%", size: 2, delay: 0.2 },
  { top: "42%", left: "6%", size: 1.5, delay: 1.3 },
  { top: "58%", left: "16%", size: 2, delay: 0.5 },
  { top: "68%", left: "36%", size: 1.5, delay: 0.8 },
  { top: "78%", left: "58%", size: 2, delay: 1.2 },
  { top: "62%", left: "78%", size: 1.5, delay: 0.4 },
  { top: "50%", left: "90%", size: 2, delay: 1.0 },
  { top: "85%", left: "12%", size: 1.5, delay: 0.7 },
  { top: "90%", left: "44%", size: 2, delay: 1.4 },
  { top: "88%", left: "70%", size: 1.5, delay: 0.15 },
  { top: "36%", left: "48%", size: 1.5, delay: 1.05 },
  { top: "5%", left: "60%", size: 1.5, delay: 0.55 },
  { top: "75%", left: "88%", size: 2, delay: 0.95 },
];

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (reduced) {
      const t = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = previousOverflow;
      }, 250);

      return () => {
        clearTimeout(t);
        document.body.style.overflow = previousOverflow;
      };
    }

    const exitTimer = setTimeout(
      () => setExiting(true),
      2200
    );

    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 2850);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loader${exiting ? " loader-exit" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">
        Loading Akshat Lal&apos;s portfolio
      </span>

      <div className="loader-stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="loader-star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="loader-content" aria-hidden="true">
        <p className="loader-signature">
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              className="loader-letter"
              style={{
                animationDelay: `${0.12 + i * 0.045}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <span className="loader-underline">
          <span />
        </span>

        <p className="loader-tagline">
          computer engineering &mdash; university of waterloo
        </p>

        <div className="loader-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}