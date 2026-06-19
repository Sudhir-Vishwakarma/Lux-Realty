export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) {
    return Response.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const data = await request.json() as Record<string, string>;

    // URLSearchParams is more reliable than FormData for text-only data with Google Apps Script
    const params = new URLSearchParams();
    params.append('formType', 'lead');
    Object.entries(data).forEach(([key, value]) => params.append(key, value ?? ''));

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    // Read as text first — Google Apps Script may return non-JSON on errors
    const text = await res.text();

    try {
      const json = JSON.parse(text);
      return Response.json(json);
    } catch {
      // If response isn't JSON but request reached the server, treat as success
      if (res.status >= 200 && res.status < 400) {
        return Response.json({ status: 'success', message: 'Lead submitted successfully.' });
      }
      return Response.json(
        { status: 'error', message: `Server returned status ${res.status}.` },
        { status: 502 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
    return Response.json({ status: 'error', message }, { status: 500 });
  }
}
