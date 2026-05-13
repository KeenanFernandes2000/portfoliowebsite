"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail, ExternalLink, ChevronRight } from "lucide-react";

const ROTATING_TITLES = [
  "Full-Stack AI Engineer",
  "Agentic Workflow Architect",
  "SaaS Platform Builder",
  "Technical Lead",
];

function RotatingTitle() {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const shouldReduce = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduce) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_TITLES.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [shouldReduce]);

  return (
    <span
      className="block text-em transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0 }}
      aria-live="polite"
      aria-label={ROTATING_TITLES[index]}
    >
      {ROTATING_TITLES[index]}
    </span>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-em-muted blur-3xl opacity-60" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[oklch(0.65_0.15_200_/_8%)] blur-3xl opacity-40" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

export function Hero() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.12,
        delayChildren: shouldReduce ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-16"
      aria-label="Hero section"
    >
      <GridBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-em bg-em-muted border border-em/20 rounded-full px-4 py-1.5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-em animate-pulse" aria-hidden="true" />
            Available for new projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4"
        >
          Keenan{" "}
          <span className="gradient-text">Fernandes</span>
        </motion.h1>

        {/* Rotating subtitle */}
        <motion.div
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-8 h-12 flex items-center justify-center"
        >
          <RotatingTitle />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building AI-enabled SaaS platforms and agentic workflows — end to end,
          from architecture to deployment. Currently leading technical delivery
          on government and enterprise projects in the UAE.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:keenan030900@gmail.com"
            className="inline-flex items-center gap-2 bg-em text-white font-medium text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity focus-ring shadow-lg shadow-em/20"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Get in touch
          </a>
          <a
            href="https://www.linkedin.com/in/keenan-fernandes-9906b4171/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border hover:border-em hover:text-em text-muted-foreground font-medium text-sm px-6 py-3 rounded-xl transition-colors duration-200 focus-ring"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            LinkedIn
          </a>
          <button
            onClick={() => handleScroll("#experience")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-em transition-colors duration-200 focus-ring rounded-lg px-2 py-1"
          >
            View work
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          {[
            { value: "5+", label: "Years exp." },
            { value: "20k+", label: "Users served" },
            { value: "10+", label: "Products shipped" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-em">{value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduce ? 0 : 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-em transition-colors duration-200 focus-ring rounded-lg p-2"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
