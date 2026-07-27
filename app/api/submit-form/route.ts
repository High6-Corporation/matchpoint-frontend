import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Form submission body:", body);

    // Payload's form-builder plugin flags server-to-server requests as spam
    // unless an Authorization header is present (authenticated requests skip
    // spam protection). We include the PAYLOAD_API_KEY so the proxy is
    // treated as an authenticated API call.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const apiKey = process.env.PAYLOAD_API_KEY ?? "matchpoint-forms-proxy";
    headers["Authorization"] = `forms ${apiKey}`;

    const response = await fetch(
      "https://payload-poc-xi.vercel.app/api/form-submissions",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
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
