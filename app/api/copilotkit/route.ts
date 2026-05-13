import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting ─────────────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── CopilotKit runtime setup ──────────────────────────────────────────────────
function buildRuntime() {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return null;
  }

  const openai = new OpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey,
  });

  const serviceAdapter = new OpenAIAdapter({
    openai,
    model: "meta/llama-3.3-70b-instruct",
  });

  const runtime = new CopilotRuntime();

  return { runtime, serviceAdapter };
}

// ── Route handler ─────────────────────────────────────────────────────────────
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  // Guard missing API key
  if (!process.env.NVIDIA_API_KEY) {
    console.error("[copilotkit] NVIDIA_API_KEY is not set — cannot serve LLM requests.");
    return NextResponse.json(
      { error: "AI service is not configured." },
      { status: 500 }
    );
  }

  // Rate limit
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 }
    );
  }

  const services = buildRuntime();
  if (!services) {
    return NextResponse.json(
      { error: "AI service is not configured." },
      { status: 500 }
    );
  }

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: services.runtime,
    serviceAdapter: services.serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req) as Promise<NextResponse>;
};
