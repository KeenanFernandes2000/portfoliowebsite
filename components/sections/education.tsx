"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const CERTIFICATIONS = [
  "Astrolabs Full-Stack Bootcamp (Dec 2022)",
  "GDSC Cloud Engineering, DS & ML (May 2020)",
  "IBM Cloud Application Developer 2019 Mastery Award",
  "Dell EMC Cloud Infrastructure & Services v3.0",
  "Dell EMC Information Storage & Management",
  "Cisco CCNA Routing & Switching Essentials",
  "Cisco Cybersecurity Essentials",
  "Cisco Intro to IoT",
  "Cisco PCAP — Programming Essentials in Python",
];

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

export function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 section-padding max-w-6xl mx-auto"
      aria-labelledby="education-heading"
    >
      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          05 / Education & Certifications
        </span>
        <h2
          id="education-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12"
        >
          Academic background &amp;
          <br />
          <span className="gradient-text">credentials.</span>
        </h2>
      </FadeInView>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Education card */}
        <FadeInView delay={0.1}>
          <div className="p-6 rounded-2xl border border-em/30 bg-card h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-em" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-mono font-semibold text-em uppercase tracking-widest">
                Education
              </h3>
            </div>

            <div>
              <h4 className="text-lg font-bold text-foreground leading-snug mb-1">
                BEng Computer Systems Engineering
              </h4>
              <p className="text-em font-medium text-sm mb-1">
                Middlesex University
              </p>
              <p className="text-xs text-muted-foreground font-mono mb-4">
                Jan 2018 – Jul 2021 · Dubai, UAE
              </p>

              <div className="flex gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50 flex-1">
                  <p className="text-xl font-bold text-foreground">First Class</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Honours</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50 flex-1">
                  <p className="text-xl font-bold text-em">4.25</p>
                  <p className="text-xs text-muted-foreground mt-0.5">GPA</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Certifications */}
        <FadeInView delay={0.18}>
          <div className="p-6 rounded-2xl border border-border bg-card h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center">
                <Award className="w-5 h-5 text-em" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-mono font-semibold text-em uppercase tracking-widest">
                Certifications
              </h3>
            </div>

            <ul className="space-y-2.5" role="list">
              {CERTIFICATIONS.map((cert, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-em shrink-0"
                    aria-hidden="true"
                  />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
