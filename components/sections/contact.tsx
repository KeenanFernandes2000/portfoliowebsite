"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Mail, ExternalLink, Phone } from "lucide-react";

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

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 section-padding max-w-7xl mx-auto"
      aria-labelledby="contact-heading"
    >
      {/* Big CTA block */}
      <FadeInView>
        <div className="relative rounded-3xl border border-em/20 bg-card overflow-hidden p-8 md:p-16 text-center">
          {/* Background decoration */}
          <div
            className="absolute inset-0 -z-0 opacity-30"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 120%, oklch(0.69 0.18 160 / 20%), transparent)",
            }}
          />

          <div className="relative z-10">
            <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
              06 / Contact
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Let&apos;s build something
              <br />
              <span className="gradient-text">remarkable together.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              I&apos;m open to senior engineering roles, technical lead
              positions, and interesting freelance projects — especially in AI,
              SaaS, or government tech.
            </p>

            {/* Contact buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:keenan030900@gmail.com"
                className="inline-flex items-center gap-2.5 bg-em text-white font-semibold text-sm px-8 py-4 rounded-xl hover:opacity-90 transition-opacity focus-ring shadow-xl shadow-em/25 w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                keenan030900@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/keenan-fernandes-9906b4171/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-border hover:border-em hover:text-em text-muted-foreground font-semibold text-sm px-8 py-4 rounded-xl transition-colors duration-200 focus-ring w-full sm:w-auto justify-center"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href="tel:+971501133872"
                className="inline-flex items-center gap-2.5 border border-border hover:border-em hover:text-em text-muted-foreground font-semibold text-sm px-8 py-4 rounded-xl transition-colors duration-200 focus-ring w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                +971 50-113-3872
              </a>
            </div>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}
