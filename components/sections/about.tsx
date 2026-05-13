"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { Code2, Brain, Server, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    label: "Full-Stack",
    desc: "End-to-end ownership from DB schema to pixel-perfect UI",
  },
  {
    icon: Brain,
    label: "AI/LLM",
    desc: "LangChain, LangGraph, voice agents, agentic workflows",
  },
  {
    icon: Server,
    label: "Cloud & Infra",
    desc: "AWS, Azure, Docker, Dokploy — production-grade deploys",
  },
  {
    icon: Users,
    label: "Technical Lead",
    desc: "Client-facing delivery lead, junior mentor, cross-team coordination",
  },
];

function FadeInView({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translateY(0)"
          : shouldReduce
          ? "translateY(0)"
          : "translateY(28px)",
        transition: shouldReduce
          ? "opacity 0.01s"
          : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function About() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 section-padding max-w-7xl mx-auto"
      aria-labelledby="about-heading"
    >
      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          01 / About
        </span>
        <h2
          id="about-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12"
        >
          Building at the intersection of
          <br />
          <span className="gradient-text">AI and great software.</span>
        </h2>
      </FadeInView>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Text */}
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <FadeInView delay={0.1}>
            <p>
              I&apos;m a full-stack engineer based in the UAE, specialising in
              AI-enabled SaaS platforms and agentic workflows. I enjoy owning
              products end to end — from database design and API architecture
              all the way to polished frontends and production deployments on
              AWS and Azure.
            </p>
          </FadeInView>
          <FadeInView delay={0.18}>
            <p>
              At{" "}
              <span className="text-foreground font-medium">Potential FZ LLC</span>
              , I lead the technical delivery of government and enterprise
              projects. Most notably, I built and scaled{" "}
              <span className="text-em font-medium">VX-Academy</span> for the
              Department of Culture and Tourism – Abu Dhabi into a platform
              serving 20,000+ users, cutting peak-load database resource usage
              by over 80% through query optimisation and app-level caching.
            </p>
          </FadeInView>
          <FadeInView delay={0.26}>
            <p>
              Outside of work I&apos;m drawn to hardware projects — kinetic
              sand tables, AR indoor navigation, smart IoT devices — anywhere
              software meets the physical world. I hold a{" "}
              <span className="text-foreground font-medium">
                First Class Honours BEng
              </span>{" "}
              from Middlesex University (4.25 GPA) and a collection of
              certifications spanning cloud, networking, and data science.
            </p>
          </FadeInView>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-2 gap-4">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <FadeInView key={label} delay={0.1 + i * 0.08}>
              <div className="group p-5 rounded-2xl border border-border bg-card hover:border-em/40 hover:bg-em-muted transition-all duration-300 h-full">
                <div className="w-9 h-9 rounded-lg bg-em-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-4.5 h-4.5 text-em" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
