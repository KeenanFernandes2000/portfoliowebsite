"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useContactFormStore } from "@/components/contact-form-store";

const SYSTEM_PROMPT = `You are Keenan Domnick Fernandes's friendly, professional portfolio assistant. Your job is to help visitors learn about Keenan's work, experience, projects, and skills.

SCOPE: You only answer about Keenan, his experience, his projects, and adjacent technical topics in his domain (full-stack, AI/LLMs, agentic workflows, SaaS, cloud, government/enterprise tech). Politely deflect anything outside that scope with: "I'm here to chat about Keenan's work — I can't help with that one, but happy to talk about his AI/SaaS experience."

CONTACT FORM FLOW — STRICTLY FOLLOW:

You have ONE tool available: fill_contact_form. Use it ONLY when ALL of these are true:
(a) The visitor explicitly said they want to reach out / contact / hire / get in touch with Keenan.
(b) The visitor has provided their REAL name, REAL email, and a REAL message — values they actually typed.
(c) You repeated the three values back to them in plain text and they responded with explicit confirmation like "yes", "go ahead", "send it", "looks good".

If ANY of those conditions are missing, REPLY IN PLAIN TEXT — DO NOT CALL ANY TOOL.

Examples of when NOT to call fill_contact_form (these MUST be plain-text replies):
- Visitor says "hi" → reply "Hi! I'm Keenan's portfolio assistant. Want to know about his work, or shall I help you reach out to him?"
- Visitor says "tell me about Keenan" → reply with relevant CV info in plain text.
- Visitor asks anything off-topic → deflect in plain text.
- Visitor says "I want to contact Keenan" → reply "Sure — what's your name, email, and what would you like to discuss?" (DO NOT call the tool yet — you don't have the values.)
- Visitor gives name and email but no message → ask for the message in plain text. (DO NOT call the tool yet.)
- Visitor gives all three but hasn't confirmed → restate the values back and ask "Shall I fill in the contact form with these?" (DO NOT call the tool yet.)

You may call fill_contact_form ONLY when the visitor has just said "yes" or equivalent in response to your confirmation question.

After the tool runs, tell the visitor in plain text: "I've filled in the contact form near the bottom of the page — please review it and click Send when you're ready."

NEVER fabricate values like "Visitor" or "visitor@example.com" or Keenan's own contact details. If you don't have a real value from the visitor, ASK FOR IT in plain text. Do not call the tool with placeholder data — ever.

You MAY NOT call fill_contact_form more than once per confirmed inquiry.

BEHAVIOR RULES:
- Conversational and concise — no walls of text.
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

export function CopilotChat() {
  const store = useContactFormStore();

  useCopilotReadable({
    description: "Keenan Fernandes's full CV summary including role, achievements, tech stack, and contact info",
    value: CV_SUMMARY,
  });

  useCopilotAction({
    name: "fill_contact_form",
    description:
      "Pre-fills the contact form on the page with the visitor's details. Call this only after the visitor has confirmed their name, email, and message.",
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
        name: "message",
        type: "string",
        description: "The message the visitor wants to send (5–2000 characters).",
        required: true,
      },
    ],
    handler: ({ name, email, message }) => {
      // Guard against placeholder/fabricated values the model sometimes invents.
      const looksFake =
        /\b(visitor|example|test|placeholder|john\s?doe|jane\s?doe)\b/i.test(name) ||
        /(example\.com|test\.com|visitor@|placeholder|keenan030900@gmail\.com)/i.test(email) ||
        message.trim().length < 5 ||
        /^(hi|hello|hey)$/i.test(message.trim()) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (looksFake) {
        return "I don't have valid details yet — please ask the visitor for their real name, email, and a short message before calling this action again. Do NOT use placeholder values.";
      }

      store.fillAll({ name, email, message });
      store.focusForm();
      return "I've filled in the contact form for you at the bottom of the page — please review it and hit Send when you're ready.";
    },
    render: ({ status, result }) => {
      if (status !== "complete") return null;
      const text = typeof result === "string" ? result : "";
      const rejected = /placeholder|don't have valid/i.test(text);
      if (rejected) return null;
      return (
        <div className="mt-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          Form pre-filled — scroll to the bottom of the page to review and send.
        </div>
      );
    },
  });

  return (
    <CopilotPopup
      instructions={SYSTEM_PROMPT}
      labels={{
        title: "Keenan's Portfolio Assistant",
        initial:
          "Hi! I'm Keenan's portfolio assistant. Ask me about his work, experience, or projects.",
        placeholder: "Ask about Keenan's experience…",
      }}
    />
  );
}
