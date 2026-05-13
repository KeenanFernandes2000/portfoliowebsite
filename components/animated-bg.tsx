"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Site-wide animated background.
 * - 4 large blurred gradient orbs drifting on independent loops.
 * - Subtle parallax that follows the mouse.
 * - Faint grid overlay for texture.
 * - Respects prefers-reduced-motion (renders static orbs).
 */
export function AnimatedBackground() {
  const shouldReduce = useReducedMotion();
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (shouldReduce) return;
    let raf = 0;
    let nx = 0;
    let ny = 0;
    const onMove = (e: MouseEvent) => {
      nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setMouse({ x: nx, y: ny });
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldReduce]);

  const orbs = [
    {
      color: "oklch(0.69 0.18 160 / 22%)",
      size: 620,
      from: { x: "-10%", y: "-10%" },
      to: { x: "15%", y: "20%" },
      duration: 28,
      parallax: 25,
    },
    {
      color: "oklch(0.62 0.16 220 / 18%)",
      size: 540,
      from: { x: "70%", y: "5%" },
      to: { x: "50%", y: "35%" },
      duration: 34,
      parallax: -35,
    },
    {
      color: "oklch(0.65 0.2 320 / 14%)",
      size: 480,
      from: { x: "20%", y: "60%" },
      to: { x: "55%", y: "75%" },
      duration: 40,
      parallax: 20,
    },
    {
      color: "oklch(0.69 0.18 160 / 18%)",
      size: 560,
      from: { x: "75%", y: "70%" },
      to: { x: "60%", y: "45%" },
      duration: 36,
      parallax: -30,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base vignette */}
      <div className="absolute inset-0 bg-background" />

      {/* Orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          initial={{ left: o.from.x, top: o.from.y }}
          animate={
            shouldReduce
              ? { left: o.from.x, top: o.from.y }
              : { left: [o.from.x, o.to.x, o.from.x], top: [o.from.y, o.to.y, o.from.y] }
          }
          transition={{
            duration: o.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 50%, ${o.color}, transparent 65%)`,
            filter: "blur(60px)",
            transform: `translate(${mouse.x * o.parallax}px, ${mouse.y * o.parallax}px)`,
            transition: "transform 0.4s ease-out",
            willChange: "transform, left, top",
          }}
        />
      ))}

      {/* Grain / dot texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "var(--foreground)",
        }}
      />

      {/* Top + bottom fade for content readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
