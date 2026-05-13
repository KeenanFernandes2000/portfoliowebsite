"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Mail, Send, ExternalLink, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const valid =
    name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length > 3;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:keenan030900@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 section-padding max-w-7xl mx-auto"
      aria-labelledby="contact-heading"
    >
      <FadeInView>
        <span className="text-xs font-mono text-em tracking-widest uppercase mb-4 block">
          05 / Contact
        </span>
        <h2
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Let&apos;s build something{" "}
          <span className="gradient-text">remarkable.</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-12 leading-relaxed">
          Open to senior engineering roles, tech-lead positions, and interesting
          freelance projects — especially in AI, SaaS, or government tech. Drop
          a note below or reach out directly.
        </p>
      </FadeInView>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
        {/* Left: direct contact channels */}
        <FadeInView delay={0.05}>
          <div className="space-y-3">
            <a
              href="mailto:keenan030900@gmail.com"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-em/50 hover:bg-em-muted/30 transition-all duration-200 focus-ring"
            >
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Email
                </span>
                <span className="block text-sm font-medium text-foreground truncate group-hover:text-em transition-colors">
                  keenan030900@gmail.com
                </span>
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/keenan-fernandes-9906b4171/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-em/50 hover:bg-em-muted/30 transition-all duration-200 focus-ring"
            >
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  LinkedIn
                </span>
                <span className="block text-sm font-medium text-foreground group-hover:text-em transition-colors">
                  @keenan-fernandes
                </span>
              </span>
            </a>

            <a
              href="tel:+971501133872"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-em/50 hover:bg-em-muted/30 transition-all duration-200 focus-ring"
            >
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Phone
                </span>
                <span className="block text-sm font-medium text-foreground group-hover:text-em transition-colors">
                  +971 50-113-3872
                </span>
              </span>
            </a>
          </div>
        </FadeInView>

        {/* Right: form */}
        <FadeInView delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me a bit about the role, project, or idea…"
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors resize-y min-h-[140px]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!valid}
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl focus-ring transition-all duration-200",
                valid
                  ? "bg-em text-white hover:opacity-90 shadow-lg shadow-em/20"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  Opening your mail client…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              Submitting opens your email client with the message pre-filled —
              no data is stored.
            </p>
          </form>
        </FadeInView>
      </div>
    </section>
  );
}
