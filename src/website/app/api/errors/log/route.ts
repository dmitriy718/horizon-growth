import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Error log file path - on VPS this will be /var/www/horizon/logs/errors.log
const LOG_DIR = process.env.ERROR_LOG_DIR || path.join(process.cwd(), "logs");
const ERROR_LOG_FILE = path.join(LOG_DIR, "errors.log");

interface ErrorLogEntry {
  type: string;
  message: string;
  stack?: string;
  digest?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  ip?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ErrorLogEntry = await request.json();

    // Add IP address from request
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || 
               request.headers.get("x-real-ip") || 
               "unknown";

    const logEntry: ErrorLogEntry = {
      ...body,
      ip,
      timestamp: body.timestamp || new Date().toISOString(),
    };

    // Log to console (always)
    console.error("[Error Log]", JSON.stringify(logEntry, null, 2));

    // Try to write to file
    try {
      await ensureLogDir();
      const logLine = JSON.stringify(logEntry) + "\n";
      await fs.appendFile(ERROR_LOG_FILE, logLine, "utf-8");
    } catch (fileError) {
      console.error("[Error Log] Failed to write to file:", fileError);
    }

    // In production, you could also send to:
    // - Sentry (recommended for production)
    // - DigitalOcean App Platform logs
    // - A Slack webhook for critical errors
    // - Email notification for critical errors

    // Example: Send critical errors to Slack (if configured)
    if (body.type === "global_error" || body.type === "server_error") {
      await sendSlackNotification(logEntry).catch(() => {});
    }

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error("[Error Log API] Failed:", error);
    return NextResponse.json(
      { error: "Failed to log error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve recent errors (protected)
export async function GET(request: NextRequest) {
  try {
    // Simple API key auth for error log access
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.ERROR_LOG_API_KEY || process.env.OPENAI_API_KEY;

    if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const type = searchParams.get("type"); // Filter by error type

    try {
      await ensureLogDir();
      const content = await fs.readFile(ERROR_LOG_FILE, "utf-8");
      const lines = content.trim().split("\n").filter(Boolean);
      
      let errors = lines
        .map((line) => {
          try {
            return JSON.parse(line) as ErrorLogEntry;
          } catch {
            return null;
          }
        })
        .filter((e): e is ErrorLogEntry => e !== null);

      // Filter by type if specified
      if (type) {
        errors = errors.filter((e) => e.type === type);
      }

      // Return most recent first
      errors = errors.reverse().slice(0, limit);

      return NextResponse.json({
        errors,
        total: errors.length,
        logFile: ERROR_LOG_FILE,
      });
    } catch (error) {
      // File doesn't exist or can't be read
      return NextResponse.json({
        errors: [],
        total: 0,
        message: "No error logs found",
      });
    }
  } catch (error) {
    console.error("[Error Log API] GET failed:", error);
    return NextResponse.json(
      { error: "Failed to retrieve errors" },
      { status: 500 }
    );
  }
}

async function ensureLogDir() {
  try {
    await fs.access(LOG_DIR);
  } catch {
    await fs.mkdir(LOG_DIR, { recursive: true });
  }
}

async function sendSlackNotification(error: ErrorLogEntry) {
  const webhookUrl = process.env.SLACK_ERROR_WEBHOOK;
  if (!webhookUrl) return;

  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🚨 ${error.type.toUpperCase()} on Horizon Credit`,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Error:*\n${error.message}` },
          { type: "mrkdwn", text: `*URL:*\n${error.url || "N/A"}` },
          { type: "mrkdwn", text: `*Time:*\n${error.timestamp}` },
          { type: "mrkdwn", text: `*Digest:*\n${error.digest || "N/A"}` },
        ],
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

