export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_CP_API_URL;
  if (!url) {
    return Response.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const incoming = await request.formData();

    // Send text fields only via URLSearchParams (files are stored separately via Drive)
    const params = new URLSearchParams();
    params.append('formType', 'channel_partner');
    for (const [key, value] of incoming.entries()) {
      if (typeof value === 'string') {
        params.append(key, value);
      }
      // File entries are skipped — Apps Script stores text data only
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    const text = await res.text();

    try {
      const json = JSON.parse(text);
      return Response.json(json);
    } catch {
      if (res.status >= 200 && res.status < 400) {
        return Response.json({ status: 'success', message: 'Registration submitted successfully.' });
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
