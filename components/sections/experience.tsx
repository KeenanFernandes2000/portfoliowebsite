"use client";

import * as React from "react";
import { useInView, AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Job {
  company: string;
  role: string;
  period: string;
  year: string;
  location: string;
  featured?: boolean;
  featuredLabel?: string;
  bullets: string[];
  tags: string[];
  url?: string;
}

const JOBS: Job[] = [
  {
    company: "Potential FZ LLC",
    role: "Full-Stack AI Product Engineer / Technical Lead",
    period: "Nov 2023 – Present",
    year: "2023",
    location: "UAE",
    featured: true,
    featuredLabel: "VX-Academy — Featured Case Study",
    bullets: [
      "Built full-stack SaaS platforms, AI chatbots, voice agents, and agentic workflows across multiple client and internal projects.",
      "Led development of VX-Academy for the Department of Culture and Tourism – Abu Dhabi: a learning and certification platform for frontline tourism workers (hotels, restaurants, taxis).",
      "Scaled VX-Academy to ~4,000–5,000 active users / ~20,000 total; cut peak-load DB resource usage by >80% via query optimisation, indexing, and app-level caching.",
      "Designed AI concierge and AI examiner features: course guidance, progress tracking, role-play assessment, and data sovereignty.",
      "Built an AI self-service chatbot SaaS platform with Stripe-integrated subscription workflows.",
      "Owned architecture across most projects: DB design, AI workflow design, deployment, and infra.",
      "Replaced manual deploys with Docker-based workflows via Dokploy; production support on AWS and Azure.",
      "Direct technical contact for enterprise and government clients; mentored junior developers.",
    ],
    tags: [
      "Next.js", "TypeScript", "Node.js", "PostgreSQL", "LangChain", "LangGraph",
      "Docker", "AWS", "Azure", "Stripe", "Redis", "Pinecone",
    ],
  },
  {
    company: "Emicool",
    role: "Data Science Intern",
    period: "Oct 2022 – Jun 2023",
    year: "2022",
    location: "UAE",
    bullets: [
      "Preprocessed and migrated Oracle Fusion data; saved ~120 hours of manual work via Alteryx, Python, Pandas, and NumPy automation.",
      "Migrated Power BI dashboards to Incorta — built 80+ dashboards across 5 departments with ETL pipelines.",
      "Processed >1 billion plant sensor records/day with Apache Spark for RSB regulatory compliance.",
      "Built Python automation scripts: file consolidation, PDF bill extraction, Google review scraping, SQL Server data transfer.",
      "Built feature engineering pipelines on 50+ variables; trained Random Forest and Decision Tree models predicting customer complaints at 70% accuracy.",
    ],
    tags: [
      "Python", "Pandas", "NumPy", "Spark", "Alteryx", "SQL", "Power BI", "Incorta", "Oracle Fusion",
    ],
  },
  {
    company: "The Assembly",
    role: "Team Lead & Lab Incharge",
    period: "May 2021 – Jul 2022",
    year: "2021",
    location: "Dubai, UAE",
    bullets: [
      "Led interns coordinating tech, media, and event projects using Trello for task management.",
      "Directed, edited, and produced 50+ YouTube videos (Premiere Pro, OBS Studio).",
      "Maintained and upgraded 7 legacy lab projects, including 3D-printed hardware repairs.",
      "Designed a portable livestreaming setup for multiple In5 Dubai locations.",
      "Contributed to 2 projects showcased at GITEX Technology Week 2021.",
    ],
    tags: ["Team Leadership", "Premiere Pro", "OBS", "3D Printing", "GITEX 2021"],
  },
  {
    company: "Ookiyo",
    role: "Remote Web Developer",
    period: "Dec 2020 – Dec 2021",
    year: "2020",
    location: "Remote",
    bullets: [
      "Built responsive websites with HTML, CSS, JavaScript, WordPress, and HubSpot.",
      "Set up Zapier automation workflows; applied SEO best practices and cross-browser support.",
    ],
    tags: ["HTML/CSS", "JavaScript", "WordPress", "HubSpot", "Zapier", "SEO"],
  },
];

function FadeInView({
  children,
  delay = 0,
  fromLeft = false,
}: {
  children: React.ReactNode;
  delay?: number;
  fromLeft?: boolean;
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
          ? "translateX(0)"
          : shouldReduce
          ? "translateX(0)"
          : `translateX(${fromLeft ? "-24px" : "24px"})`,
        transition: shouldReduce
          ? "opacity 0.01s"
          : `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function JobCard({
  job,
  index,
  align = "left",
}: {
  job: Job;
  index: number;
  align?: "left" | "right";
}) {
  const [expanded, setExpanded] = React.useState(index === 0);
  const isLeft = align === "left";

  return (
    <FadeInView delay={index * 0.08} fromLeft={!isLeft}>
      <article
        className={cn(
          "relative rounded-2xl border bg-card transition-all duration-300",
          job.featured
            ? "border-em/40 shadow-lg shadow-em/5"
            : "border-border hover:border-border/80"
        )}
      >
        {/* Featured badge */}
        {job.featured && (
          <div className="absolute -top-3 left-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-em bg-background border border-em/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-em" aria-hidden="true" />
              {job.featuredLabel}
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                {job.period} · {job.location}
              </p>
              <h3 className="text-lg font-semibold text-foreground leading-snug">
                {job.role}
              </h3>
              <p className="text-sm text-em font-medium mt-0.5">{job.company}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn(
                "shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-em hover:text-em transition-all duration-200 focus-ring cursor-pointer",
                expanded && "border-em text-em"
              )}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-0">
            {job.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-mono rounded-md"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Expandable bullets */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                key="bullets"
                role="list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25, ease: "easeOut" },
                }}
                className="overflow-hidden"
              >
                <div className="mt-5 space-y-2.5">
                  {job.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-em shrink-0"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </article>
    </FadeInView>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 section-padding max-w-7xl mx-auto"
      aria-labelledby="experience-heading"
    >
      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          02 / Experience
        </span>
        <h2
          id="experience-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12"
        >
          Where I&apos;ve worked
          <br />
          <span className="gradient-text">and what I built.</span>
        </h2>
      </FadeInView>

      {/* Alternating timeline */}
      <div className="relative">
        {/* Center spine — desktop */}
        <div
          className="absolute hidden md:block left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"
          aria-hidden="true"
        />
        {/* Left spine — mobile */}
        <div
          className="absolute md:hidden left-6 top-0 bottom-0 w-px bg-border -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="space-y-16 md:space-y-20">
          {JOBS.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={job.company + job.period}
                className="relative grid grid-cols-[3rem_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-4 md:gap-x-12 items-start"
              >
                {/* Desktop: card column (1 or 3) */}
                <div
                  className={cn(
                    "hidden md:block",
                    isLeft ? "md:col-start-1 md:text-right" : "md:col-start-3"
                  )}
                >
                  <JobCard job={job} index={i} align={isLeft ? "right" : "left"} />
                </div>

                {/* Desktop: center year marker */}
                <div className="hidden md:flex md:col-start-2 md:row-start-1 flex-col items-center gap-2 pt-6 relative z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-em bg-background"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-mono font-semibold text-em tracking-widest">
                    {job.year}
                  </span>
                </div>

                {/* Mobile: spine column */}
                <div className="md:hidden flex flex-col items-center pt-6 relative">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-em bg-background z-10"
                    aria-hidden="true"
                  />
                  <span className="mt-1 text-[10px] font-mono font-semibold text-em tracking-widest">
                    {job.year}
                  </span>
                </div>

                {/* Mobile: card column */}
                <div className="md:hidden">
                  <JobCard job={job} index={i} align="left" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
