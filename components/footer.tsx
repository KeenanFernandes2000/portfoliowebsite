import * as React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 section-padding max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <p>
          &copy; {new Date().getFullYear()} Keenan Domnick Fernandes. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5">
          Built with{" "}
          <span className="text-em">Next.js 15</span>,{" "}
          <span className="text-em">Tailwind CSS v4</span> &amp;{" "}
          <span className="text-em">Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
