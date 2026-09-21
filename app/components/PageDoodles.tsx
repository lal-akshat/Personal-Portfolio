"use client";

type Shape = "wave" | "curl" | "loop" | "dash";

type Doodle = {
  top: string;
  left?: string;
  right?: string;
  width: number;
  shape: Shape;
  delay: number;   // staggered entrance, seconds
  rotate?: number; // hand-drawn imperfection
  opacity?: number;
  desk?: boolean;  // hidden on mobile to avoid clutter
};

const SHAPES: Record<Shape, { vb: [number, number]; d: string; dash?: string }> = {
  wave: { vb: [70, 30], d: "M2,15 Q12,2 22,15 T42,15 T62,15" },
  curl: { vb: [50, 50], d: "M4,25 Q4,4 25,4 Q46,4 46,25 Q46,46 25,46" },
  loop: { vb: [34, 34], d: "M4,17 a13,13 0 1 1 26,0 a13,13 0 1 1 -26,0" },
  dash: { vb: [46, 46], d: "M4,23 a19,19 0 1 1 38,0 a19,19 0 1 1 -38,0", dash: "6 10" },
};

/* =========================================================
   DISTRIBUTION
   - Even vertical rhythm as the base (2% → 96% of the full
     page height), then ±jitter so it feels organic rather
     than a grid.
   - Three horizontal bands: left edge, right edge, and a
     faint center band (every 5th doodle) so the middle of
     the page is never empty.
   - Width, rotation, and opacity all vary per doodle.
   ========================================================= */

const COUNT = 55;
const SHAPE_CYCLE: Shape[] = ["wave", "loop", "curl", "dash", "wave", "curl"];
const WIDTH_CYCLE = [30, 38, 46, 62, 34, 50, 70, 56];
const OPACITY_CYCLE = [0.85, 0.7, 0.8, 0.65, 0.75];

const DOODLES: Doodle[] = Array.from({ length: COUNT }, (_, i) => {
  const base = 2 + (i * 94) / (COUNT - 1);      // even base: 2% → 96%
  const vJitter = (((i * 73) % 7) - 3) * 0.35;  // ±1.05% vertical wobble
  const top = Math.min(96, Math.max(2, base + vJitter));

  const width = WIDTH_CYCLE[i % WIDTH_CYCLE.length];
  const shape = SHAPE_CYCLE[i % SHAPE_CYCLE.length];
  const rotate = ((i * 29) % 13) - 6;           // -6° → +6°
  const hJitter = ((i * 53) % 23) + 3;          // 3%–25% edge inset

  const doodle: Doodle = {
    top: `${top.toFixed(1)}%`,
    width,
    shape,
    delay: 0.35 + i * 0.04,
    rotate,
    desk: i % 3 === 1, // hide one in three on mobile
  };

  if (i % 5 === 3) {
    // Faint center band — texture behind the content columns
    doodle.left = `${34 + ((i * 17) % 24)}%`;  // 34%–57%
    doodle.opacity = 0.4 + ((i * 7) % 3) * 0.05; // 0.40–0.50
  } else if (i % 2 === 0) {
    doodle.right = `${hJitter}%`;
    doodle.opacity = OPACITY_CYCLE[i % OPACITY_CYCLE.length];
  } else {
    doodle.left = `${hJitter}%`;
    doodle.opacity = OPACITY_CYCLE[(i + 2) % OPACITY_CYCLE.length];
  }

  return doodle;
});

export default function PageDoodles() {
  return (
    <div className="page-doodles" aria-hidden="true">
      {DOODLES.map((d, i) => {
        const s = SHAPES[d.shape];
        return (
          <svg
            key={i}
            className={d.desk ? "doodle-desk" : undefined}
            width={d.width}
            height={(d.width * s.vb[1]) / s.vb[0]}
            viewBox={`0 0 ${s.vb[0]} ${s.vb[1]}`}
            style={
              {
                top: d.top,
                ...(d.left ? { left: d.left } : { right: d.right }),
                animationDelay: `${d.delay}s`,
                "--r": `${d.rotate ?? 0}deg`,
                "--o": d.opacity ?? 0.8,
              } as React.CSSProperties & { "--r": string; "--o": number }
            }
          >
            <path d={s.d} strokeDasharray={s.dash} />
          </svg>
        );
      })}
    </div>
  );
}