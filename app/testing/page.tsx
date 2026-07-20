import { fetchFromPayload, fetchSiteSettings } from "@/app/lib/payload";

export default async function TestingPage() {
  const siteId = process.env.PAYLOAD_SITE_ID || "";
  const apiUrl = process.env.PAYLOAD_API_URL || "not set";

  // Test 1: Check environment variables
  const envCheck = {
    PAYLOAD_API_URL: apiUrl,
    PAYLOAD_SITE_ID: siteId || "not set",
  };

  // Test 2: Fetch site settings
  let settingsResult: { success: boolean; data?: unknown; error?: string };
  try {
    const settings = await fetchSiteSettings(siteId);
    settingsResult = settings
      ? { success: true, data: settings }
      : { success: false, error: "No settings returned (null)" };
  } catch (err) {
    settingsResult = {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }

  // Test 3: Raw API connectivity check (hit a known collection endpoint)
  let apiResult: { success: boolean; status?: number; error?: string };
  try {
    const res = await fetch(`${apiUrl}/api/site-settings?limit=1`, {
      cache: "no-store",
    });
    apiResult = { success: res.ok, status: res.status };
  } catch (err) {
    apiResult = {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }

  // Test 4: Fetch a generic collection to check tenant scoping
  let collectionsResult: {
    success: boolean;
    count?: number;
    data?: unknown;
    error?: string;
  };
  try {
    const docs = await fetchFromPayload("site-settings", siteId);
    collectionsResult = docs
      ? { success: true, count: docs.length, data: docs }
      : { success: false, error: "No documents returned (null)" };
  } catch (err) {
    collectionsResult = {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }

  return (
    <main className="mx-auto max-w-4xl p-8 font-mono text-sm text-black">
      <h1 className="mb-6 text-2xl font-bold">
        Payload CMS Integration Test — MatchPoint
      </h1>

      {/* Environment Check */}
      <section className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-bold">1. Environment Variables</h2>
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(envCheck, null, 2)}
        </pre>
      </section>

      {/* API Connectivity */}
      <section className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-bold">2. API Connectivity</h2>
        <p>
          Status:{" "}
          <span
            className={apiResult.success ? "text-green-600" : "text-red-600"}
          >
            {apiResult.success ? "SUCCESS" : "FAILED"}
          </span>
          {apiResult.status !== undefined && (
            <span className="ml-2 text-gray-500">
              (HTTP {apiResult.status})
            </span>
          )}
        </p>
        {apiResult.error && (
          <p className="text-red-600">Error: {apiResult.error}</p>
        )}
      </section>

      {/* Site Settings */}
      <section className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-bold">3. Site Settings</h2>
        <p>
          Status:{" "}
          <span
            className={
              settingsResult.success ? "text-green-600" : "text-red-600"
            }
          >
            {settingsResult.success ? "SUCCESS" : "FAILED"}
          </span>
        </p>
        {settingsResult.error && (
          <p className="text-red-600">Error: {settingsResult.error}</p>
        )}
        {settingsResult.success && (
          <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
            {JSON.stringify(settingsResult.data, null, 2)}
          </pre>
        )}
      </section>

      {/* Tenant Scoping */}
      <section className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-bold">4. Tenant Scoping</h2>
        <p>
          Status:{" "}
          <span
            className={
              collectionsResult.success ? "text-green-600" : "text-red-600"
            }
          >
            {collectionsResult.success ? "SUCCESS" : "FAILED"}
          </span>
        </p>
        {collectionsResult.success && (
          <p>Documents found: {collectionsResult.count}</p>
        )}
        {collectionsResult.error && (
          <p className="text-red-600">Error: {collectionsResult.error}</p>
        )}
        {collectionsResult.success && collectionsResult.count === 0 && (
          <p className="text-amber-600">
            Note: Collection exists but has no documents for this site.
          </p>
        )}
      </section>

      <p className="text-xs text-gray-500">
        If all tests show SUCCESS, the Payload CMS integration is working
        correctly for MatchPoint.
      </p>
    </main>
  );
}
