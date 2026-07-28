import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Form submission body:", body);

    // Forward real client IP / UA / referrer so the Payload-side CleanTalk
    // hook scores the actual visitor, not the VPS. The plugin reads
    // clientInfo.ip / clientInfo.userAgent / clientInfo.referrer when present.
    const userIP =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-client-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "";
    const referrer =
      request.headers.get("referer") || request.headers.get("referrer") || "";

    const payloadBody = {
      ...body,
      clientInfo: {
        ip: userIP,
        userAgent,
        referrer,
      },
    };

    const response = await fetch(
      "https://payload-poc-xi.vercel.app/api/form-submissions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      },
    );

    const data = await response.json();
    console.log("Payload API response status:", response.status);
    console.log("Payload API response data:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Form submission failed", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
