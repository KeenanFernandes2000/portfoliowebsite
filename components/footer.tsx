import * as React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 section-padding max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-center text-xs text-muted-foreground font-mono">
        <p>
          &copy; {new Date().getFullYear()} Keenan Domnick Fernandes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
