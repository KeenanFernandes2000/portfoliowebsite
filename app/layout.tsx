import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ContactFormProvider } from "@/components/contact-form-store";
import { AnimatedBackground } from "@/components/animated-bg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keenan Fernandes — Full-Stack AI Engineer",
  description:
    "Full-stack engineer specialising in AI-enabled SaaS platforms, agentic workflows, and scalable web applications. Based in UAE.",
  authors: [{ name: "Keenan Domnick Fernandes" }],
  keywords: [
    "full-stack engineer",
    "AI engineer",
    "Next.js",
    "TypeScript",
    "LangChain",
    "SaaS",
    "UAE",
    "Dubai",
  ],
  openGraph: {
    title: "Keenan Fernandes — Full-Stack AI Engineer",
    description:
      "Full-stack engineer specialising in AI-enabled SaaS platforms, agentic workflows, and scalable web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keenan Fernandes — Full-Stack AI Engineer",
    description:
      "Full-stack engineer specialising in AI-enabled SaaS platforms, agentic workflows, and scalable web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme =
    (await cookies()).get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${theme}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <ContactFormProvider>
            <AnimatedBackground />
            {children}
          </ContactFormProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
