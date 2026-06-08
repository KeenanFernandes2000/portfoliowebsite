import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keenan Fernandes — coding barista",
  description:
    "Keenan Fernandes — Full-Stack AI Engineer. Brewing AI-enabled SaaS platforms and agentic workflows, end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-accent="coral" suppressHydrationWarning>
      <head>
        {/* set theme/accent before first paint to avoid flash for returning users */}
        <script
          id="cb-theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cb-theme');if(t)document.documentElement.setAttribute('data-theme',t);var a=localStorage.getItem('cb-accent');if(a)document.documentElement.setAttribute('data-accent',a);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="noise">
        <div id="boot">
          brewing<span className="blink">_</span>
        </div>
        {children}
      </body>
    </html>
  );
}
