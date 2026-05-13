"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Lightbulb,
  Gamepad2,
  Camera,
  Navigation,
  Eye,
  Mouse,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    title: "Kinetic Sand Table",
    description:
      "Raspberry Pi + Arduino-driven CNC machine that draws geometric patterns in sand using stepper motors and a steel ball — controlled via web interface.",
    icon: Waves,
    tags: ["Raspberry Pi", "Arduino", "Python", "CNC", "Stepper Motors"],
  },
  {
    title: "LED Mirror",
    description:
      "Infinity mirror with individually addressable LED strips controlled by an Arduino MKR WIFI 1010, responding to audio input and web-based colour control.",
    icon: Lightbulb,
    tags: ["Arduino MKR WIFI 1010", "LED WS2812B", "IoT", "Web Control"],
  },
  {
    title: "Smart Foosball Table",
    description:
      "Automated score tracking via Raspberry Pi camera + computer vision; scores displayed on a live web dashboard with game history.",
    icon: Gamepad2,
    tags: ["Raspberry Pi", "OpenCV", "Python", "Computer Vision"],
  },
  {
    title: "Pi Photobooth",
    description:
      "Raspberry Pi-powered photobooth with physical button trigger, live preview, digital and print output — deployed at events.",
    icon: Camera,
    tags: ["Raspberry Pi", "Python", "GPIO", "Events"],
  },
  {
    title: "Indoor AR Navigation",
    description:
      "Android app using Unity and Vuforia to overlay AR wayfinding markers onto printed QR anchors, enabling turn-by-turn indoor navigation without GPS.",
    icon: Navigation,
    tags: ["Android", "Unity", "C#", "Vuforia", "AR"],
  },
  {
    title: "Real-Time OCR Text-to-Speech",
    description:
      "Raspberry Pi camera captures text from physical surfaces in real time; Tesseract OCR reads it aloud via pyttsx3 — designed as an accessibility aid.",
    icon: Eye,
    tags: ["Raspberry Pi", "Tesseract OCR", "Python", "Accessibility"],
  },
  {
    title: "Virtual Mouse via ML",
    description:
      "MediaPipe hand-tracking model running on Raspberry Pi translates finger gestures into mouse cursor control — no physical mouse required.",
    icon: Mouse,
    tags: ["Raspberry Pi", "MediaPipe", "Python", "Computer Vision", "ML"],
  },
  {
    title: "AI Self-Service Chatbot Platform",
    description:
      "Multi-tenant SaaS platform letting businesses embed custom AI chatbots on their websites. Stripe-integrated subscription tiers, admin dashboard, and LLM routing.",
    icon: Cpu,
    tags: ["Next.js", "LangChain", "OpenAI", "Stripe", "PostgreSQL", "Docker"],
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translateY(0) scale(1)"
          : shouldReduce
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.98)",
        transition: shouldReduce
          ? "opacity 0.01s"
          : `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <article className="group p-5 rounded-2xl border border-border bg-card hover:border-em/40 hover:shadow-lg hover:shadow-em/5 transition-all duration-300 h-full flex flex-col">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-em" aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 section-padding max-w-6xl mx-auto"
      aria-labelledby="projects-heading"
    >
      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          04 / Projects
        </span>
        <h2
          id="projects-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Things I&apos;ve built
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          From AI SaaS platforms to hardware experiments — a mix of professional
          work and personal projects exploring where software meets the physical
          world.
        </p>
      </FadeInView>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PROJECTS.map((project, i) => (
          <FadeInView key={project.title} delay={0.05 + i * 0.06}>
            <ProjectCard project={project} />
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
