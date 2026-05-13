"use client";

import dynamic from "next/dynamic";

const CopilotChat = dynamic(
  () => import("@/components/copilot-chat").then((m) => m.CopilotChat),
  { ssr: false }
);

export function CopilotChatLazy() {
  return <CopilotChat />;
}
