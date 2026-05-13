import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { BuiltInAgent } from "@copilotkit/runtime/v2";
import { createOpenAI } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting ─────────────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// ── Build runtime once at module scope ────────────────────────────────────────
function buildRuntime() {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

  const nvidia = createOpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const agent = new BuiltInAgent({
    model: nvidia.chat("meta/llama-3.3-70b-instruct"),
    toolChoice: "auto",
  });

  return new CopilotRuntime({
    agents: { default: agent },
  });
}

const runtime = buildRuntime();

// ── Route handler ─────────────────────────────────────────────────────────────
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  if (!runtime) {
    console.error("[copilotkit] NVIDIA_API_KEY is not set.");
    return NextResponse.json(
      { error: "AI service is not configured." },
      { status: 500 }
    );
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 }
    );
  }

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req) as Promise<NextResponse>;
};
