"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Mail, Send, ExternalLink, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactFormStore } from "@/components/contact-form-store";

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

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const {
    name,
    email,
    message,
    setName,
    setEmail,
    setMessage,
    registerNameInputRef,
  } = useContactFormStore();
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [serverError, setServerError] = React.useState<string>("");
  const shouldReduce = useReducedMotion();

  const valid =
    name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length > 3;

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || isSubmitting) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: honeypot }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setServerError(
          data.error ?? "Something went wrong, please try again or email me directly."
        );
        setStatus("error");
      }
    } catch {
      setServerError(
        "Something went wrong, please try again or email me directly."
      );
      setStatus("error");
    }
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
              href="https://github.com/KeenanFernandes2000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-em/50 hover:bg-em-muted/30 transition-all duration-200 focus-ring"
            >
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  GitHub
                </span>
                <span className="block text-sm font-medium text-foreground group-hover:text-em transition-colors">
                  @KeenanFernandes2000
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card">
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Email
                </span>
                <span className="block text-sm font-medium text-foreground truncate">
                  keenan030900@gmail.com
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card">
              <span className="w-10 h-10 rounded-xl bg-em-muted flex items-center justify-center text-em shrink-0">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Phone
                </span>
                <span className="block text-sm font-medium text-foreground">
                  +971 50-113-3872
                </span>
              </span>
            </div>
          </div>
        </FadeInView>

        {/* Right: form or success */}
        <FadeInView delay={0.1}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduce ? 0.01 : 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card p-8 sm:p-10 flex flex-col items-center text-center gap-4"
                role="alert"
                aria-live="polite"
              >
                <div className="w-14 h-14 rounded-full bg-em-muted flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-em" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    Message sent!
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Check your inbox for a confirmation. I&apos;ll get back to you
                    within a few days.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5"
                noValidate
                suppressHydrationWarning
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
                transition={{ duration: shouldReduce ? 0.01 : 0.2 }}
              >
                {/* Honeypot — visually hidden, ignored by real users */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px" }}
                  suppressHydrationWarning
                />

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
                      ref={registerNameInputRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      suppressHydrationWarning
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      suppressHydrationWarning
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-em focus:outline-none focus:ring-2 focus:ring-em/30 transition-colors resize-y min-h-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    suppressHydrationWarning
                  />
                </div>

                {/* Inline error banner */}
                {status === "error" && serverError && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 leading-relaxed"
                  >
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!valid || isSubmitting}
                  className={cn(
                    "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl focus-ring transition-all duration-200",
                    valid && !isSubmitting
                      ? "bg-em text-white hover:opacity-90 shadow-lg shadow-em/20"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeInView>
      </div>
    </section>
  );
}
