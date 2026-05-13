"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillGroup {
  category: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "PHP", "Java"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Bootstrap"],
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Pinecone", "REST APIs"],
  },
  {
    category: "AI / LLM",
    skills: [
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "Anthropic API",
      "Ollama",
      "AI Chatbots",
      "Voice Agents",
      "Agentic Workflows",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Dokploy", "AWS", "Azure", "S3 / Object Storage", "CI/CD", "Production Support"],
  },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);

function Marquee({ items }: { items: string[] }) {
  const shouldReduce = useReducedMotion();
  const doubled = [...items, ...items];

  if (shouldReduce) {
    return (
      <div className="flex flex-wrap gap-2 py-4">
        {items.map((s) => (
          <span
            key={s}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-border text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden py-4 relative"
      aria-label="Skill ticker"
      aria-hidden="true"
    >
      <div
        className="flex gap-3 w-max"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-em hover:text-em transition-colors duration-200 cursor-default whitespace-nowrap"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

function FadeInView({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
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
          : "translateY(24px)",
        transition: shouldReduce
          ? "opacity 0.01s"
          : `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkillCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <FadeInView delay={delay}>
      <div
        className={cn(
          "p-5 rounded-2xl border bg-card h-full transition-all duration-200",
          hovered
            ? "border-em/50 shadow-[0_0_0_1px_var(--color-em)] bg-em-muted/30"
            : "border-border"
        )}
      >
        <h3 className="text-xs font-mono font-semibold tracking-widest uppercase mb-4 text-muted-foreground">
          {group.category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="text-sm px-3 py-1 rounded-lg border border-border bg-muted/50 text-foreground hover:border-em hover:bg-em-muted transition-colors duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </FadeInView>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 section-padding max-w-6xl mx-auto"
      aria-labelledby="skills-heading"
    >
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          03 / Skills
        </span>
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Tools of the trade
        </h2>
      </FadeInView>

      <FadeInView delay={0.1}>
        <div className="mb-12">
          <Marquee items={ALL_SKILLS} />
        </div>
      </FadeInView>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((group, i) => (
          <SkillCard key={group.category} group={group} delay={0.1 + i * 0.07} />
        ))}
      </div>
    </section>
  );
}
