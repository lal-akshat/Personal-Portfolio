"use client";

import { useState } from "react";

interface LampToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export default function LampToggle({
  darkMode,
  onToggle,
}: LampToggleProps) {
  const [pulling, setPulling] = useState(false);

  const handleClick = () => {
    onToggle();
    setPulling(true);

    window.setTimeout(() => {
      setPulling(false);
    }, 420);
  };

  return (
    <button
      type="button"
      className={`lamp-toggle${pulling ? " is-pulling" : ""}`}
      onClick={handleClick}
      aria-label={
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-pressed={darkMode}
    >
      <span className="lamp-mount" aria-hidden="true" />

      {/* ONE continuous string */}
      <span className="lamp-cord" aria-hidden="true" />

      <span
        className={`lamp-bulb ${
          darkMode ? "is-off" : "is-on"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}