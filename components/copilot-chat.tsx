"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const SYSTEM_PROMPT = `You are Keenan Domnick Fernandes's friendly, professional portfolio assistant. Your job is to help visitors learn about Keenan's work and, when they're interested in reaching out, collect their name, email, and the reason for getting in touch, then use the submit_inquiry action to send Keenan a message.

SCOPE: You only answer about Keenan, his experience, his projects, and adjacent technical topics in his domain (full-stack, AI/LLMs, agentic workflows, SaaS, cloud, government/enterprise tech). Politely deflect anything outside that scope with: "I'm here to chat about Keenan's work — I can't help with that one, but happy to talk about his AI/SaaS experience or set up a quick intro."

BEHAVIOR RULES:
- Conversational and concise — no walls of text.
- DO NOT call submit_inquiry on greetings, questions, or casual conversation. It is ONLY for sending a confirmed message after a visitor has explicitly said they want to contact Keenan AND provided all three required fields: name, email, and purpose.
- Greet visitors normally without taking any action. Wait for them to express interest in reaching out.
- When a visitor wants to reach out, hire Keenan, or set up an intro, FIRST ask for any missing detail (name, email, purpose). NEVER fabricate values. NEVER submit until you have all three confirmed by the visitor.
- Always restate the name, email, and purpose back to the visitor and ask "shall I send this to Keenan?" before calling submit_inquiry.
- Only after the visitor explicitly confirms (e.g. "yes please", "go ahead"), call submit_inquiry once with the exact values they provided.
- After the action returns, relay its result message faithfully — do NOT invent a success message if the action returned an error.
- Never invent facts about Keenan beyond what's in the CV content below.
- Do not claim real-time information you don't have.

CV CONTENT:
Keenan Domnick Fernandes — Full-Stack AI Engineer & Technical Lead based in UAE.
Contact: keenan030900@gmail.com, +971 50-113-3872, LinkedIn: keenan-fernandes-9906b4171

Summary: Full-stack engineer specializing in AI-enabled SaaS platforms, agentic workflows, and scalable web applications. Owns products end to end — architecture, backend, frontend, cloud, production support. Currently leads technical delivery across government and enterprise projects (platforms with thousands of active users) while mentoring junior developers.

Skills:
- Languages: TypeScript, JavaScript, Python, SQL, PHP, Java
- Frontend: React, Next.js, Tailwind CSS, shadcn/ui, TanStack, Bootstrap
- Backend/DB: Node.js, Express, PostgreSQL, MongoDB, Redis, Pinecone, REST APIs
- AI/LLM: LangChain, LangGraph, chatbots, agents, voice-to-voice workflows, OpenAI/Anthropic/Ollama
- Cloud/DevOps: Docker, Dokploy, AWS, Azure, S3/storage, containers, production support

Experience:
1. Potential FZ LLC (Nov 2023 – Present) — Full-Stack AI Product Engineer / Technical Lead. Built full-stack SaaS platforms, AI chatbots, voice agents, agentic workflows. Led VX-Academy for Department of Culture and Tourism – Abu Dhabi (learning/certification platform for frontline tourism: hotels, restaurants, taxis). Scaled VX-Academy to ~4-5k active users, ~20k total. Cut peak-load DB resource use by >80% via query/indexing/app-level optimizations. Designed AI concierge & AI examiner features. Built AI self-service chatbot SaaS with Stripe. Owned architecture (structure, DB design, AI workflows, deployment, infra). Migrated from manual to Docker via Dokploy. Production support on AWS + Azure. Direct technical contact for clients; mentored juniors.
2. Emicool (Oct 2022 – Jun 2023) — Data Science Intern. Oracle Fusion data migration (saved ~120 hours via Alteryx/Python/Pandas/NumPy). Built 80+ Incorta dashboards across 5 departments. Processed >1B plant sensor records/day with Spark for RSB compliance. Random Forest / Decision Tree models predicting customer complaints at 70% accuracy.
3. The Assembly (May 2021 – Jul 2022) — Team Lead & Lab Incharge. Led interns, produced 50+ YouTube videos, maintained 7 legacy lab projects, contributed to 2 GITEX Technology Week 2021 projects.
4. Ookiyo (Dec 2020 – Dec 2021) — Remote Web Developer. WordPress, HubSpot, Zapier, SEO.

Education: Middlesex University — BEng Computer Systems Engineering, First Class Honors, 4.25 GPA (Jan 2018 – Jul 2021).

Certifications: Astrolabs Full-Stack Bootcamp; GDSC Cloud/DS/ML; IBM Cloud App Developer 2019 Mastery; Dell EMC Cloud Infrastructure & Storage; Cisco CCNA, Cybersecurity, IoT, PCAP Python.

Personal projects: Kinetic Sand Table, LED Mirror, Smart Foosball Table, Photobooth, Indoor AR Navigation, Real-Time OCR TTS, ML Virtual Mouse (mostly Raspberry Pi & Arduino).`;

const CV_SUMMARY = {
  name: "Keenan Domnick Fernandes",
  currentRole: "Full-Stack AI Product Engineer & Technical Lead at Potential FZ LLC (Nov 2023 – Present)",
  location: "UAE",
  contact: {
    email: "keenan030900@gmail.com",
    phone: "+971 50-113-3872",
    linkedin: "https://www.linkedin.com/in/keenan-fernandes-9906b4171/",
  },
  topAchievements: [
    "Scaled VX-Academy (Dept of Culture & Tourism Abu Dhabi) to 4-5k active / 20k total users",
    "Cut peak-load DB resource usage by >80% via query & indexing optimisations",
    "Built AI concierge, AI examiner, and voice-to-voice agent features",
    "Led end-to-end architecture, deployment, and production support on AWS + Azure",
  ],
  stack: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL", "PHP", "Java"],
    frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Pinecone"],
    ai: ["LangChain", "LangGraph", "OpenAI", "Anthropic", "Ollama", "voice agents"],
    cloud: ["Docker", "Dokploy", "AWS", "Azure", "S3"],
  },
  education: "BEng Computer Systems Engineering, First Class Honors, 4.25 GPA — Middlesex University (2018–2021)",
};

// ── Inline action render cards ────────────────────────────────────────────────
function SendingCard() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
      style={{
        borderColor: "var(--em)",
        backgroundColor: "oklch(0.69 0.18 160 / 8%)",
        color: "var(--em)",
      }}
    >
      <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
      </svg>
      <span>Sending your message to Keenan…</span>
    </div>
  );
}

function SuccessCard() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
      style={{
        borderColor: "oklch(0.55 0.15 145)",
        backgroundColor: "oklch(0.55 0.15 145 / 10%)",
        color: "oklch(0.65 0.15 145)",
      }}
    >
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Message sent! Check your inbox for a confirmation email.</span>
    </div>
  );
}

function ErrorCard() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
      style={{
        borderColor: "oklch(0.65 0.2 27)",
        backgroundColor: "oklch(0.65 0.2 27 / 10%)",
        color: "oklch(0.65 0.2 27)",
      }}
    >
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
      </svg>
      <span>Something went wrong — please try the contact form below instead.</span>
    </div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────
export function CopilotChat() {
  // Structured context for the LLM
  useCopilotReadable({
    description: "Keenan Fernandes's full CV summary including role, achievements, tech stack, and contact info",
    value: CV_SUMMARY,
  });

  // Action: send inquiry via /api/inquiry
  useCopilotAction({
    name: "submit_inquiry",
    description:
      "Send a message to Keenan on behalf of the visitor. Use this when the visitor wants to reach out, hire Keenan, or ask for an intro. Always confirm name, email, and purpose with the visitor before calling this.",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The visitor's full name.",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "The visitor's email address (must be a valid email).",
        required: true,
      },
      {
        name: "purpose",
        type: "string",
        description: "The reason the visitor is reaching out (e.g. job opportunity, project collaboration, general intro).",
        required: true,
      },
    ],
    render: ({ status, result }) => {
      if (status === "executing" || status === "inProgress") return <SendingCard />;
      if (status === "complete") {
        const text = typeof result === "string" ? result : "";
        const looksLikeError = /something went wrong|network error|doesn't look valid|wait a bit/i.test(text);
        return looksLikeError ? <ErrorCard /> : <SuccessCard />;
      }
      return <ErrorCard />;
    },
    handler: async ({ name, email, purpose }) => {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        return "That email address doesn't look valid — could you double-check it?";
      }

      const message = `Reaching out via portfolio chatbot.\n\nPurpose: ${purpose}`;

      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.status === 429) {
          return "You've sent quite a few messages — please wait a bit before trying again.";
        }

        const data = (await res.json()) as { ok?: boolean; error?: string };

        if (!res.ok || !data.ok) {
          return `Something went wrong sending the message (${data.error ?? "unknown error"}). You can also reach Keenan directly via the contact form on this page.`;
        }

        return "Done! Your message has been sent to Keenan, and you'll receive a confirmation email shortly.";
      } catch {
        return "Network error — please try the contact form on this page instead.";
      }
    },
  });

  return (
    <CopilotPopup
      instructions={SYSTEM_PROMPT}
      labels={{
        title: "Chat with Keenan's AI",
        initial:
          "Hi! I'm Keenan's portfolio assistant. Ask me about his work, experience, or projects — or let me set up an intro for you.",
        placeholder: "Ask about Keenan's experience…",
      }}
    />
  );
}
