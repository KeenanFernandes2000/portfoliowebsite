"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useContactFormStore } from "@/components/contact-form-store";

const SYSTEM_PROMPT = `You are Keenan Domnick Fernandes's friendly, professional portfolio assistant. Your job is to help visitors learn about Keenan's work, experience, projects, and skills.

SCOPE: You only answer about Keenan, his experience, his projects, and adjacent technical topics in his domain (full-stack, AI/LLMs, agentic workflows, SaaS, cloud, government/enterprise tech). Politely deflect anything outside that scope with: "I'm here to chat about Keenan's work — I can't help with that one, but happy to talk about his AI/SaaS experience."

CONTACT FORM FLOW:
When a visitor wants to get in touch or reach out to Keenan:
1. Ask for their name, email address, and a short description of what they'd like to discuss.
2. Once you have all three, restate the details back to the visitor and ask them to confirm.
3. ONLY after they confirm, call the fill_contact_form action with the collected values.
4. After the action runs, tell the visitor the form has been pre-filled at the bottom of the page and they should review it and click "Send message" when ready.
- NEVER call fill_contact_form on a greeting, casual message, or without all three confirmed values.
- NEVER claim to send emails or messages yourself — you only pre-fill the form.
- NEVER call fill_contact_form more than once per confirmed request.

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
      store.fillAll({ name, email, message });
      store.focusForm();
      return "I've filled in the contact form for you at the bottom of the page — please review it and hit Send when you're ready.";
    },
    render: () => (
      <div className="mt-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
        Form pre-filled — scroll to the bottom of the page to review and send.
      </div>
    ),
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
