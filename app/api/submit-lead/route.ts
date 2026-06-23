import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) {
    return NextResponse.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const data = await request.json() as Record<string, string>;
    const params = new URLSearchParams();
    params.append('formType', 'lead');
    Object.entries(data).forEach(([key, value]) => params.append(key, value ?? ''));

    // Apps Script flow: POST to exec → doPost runs → 302 redirect → GET returns JSON output
    // fetch with redirect:'follow' correctly converts the POST→GET on 302 (per HTTP spec)
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    const text = await res.text();
    console.log('[submit-lead] Apps Script response:', text.substring(0, 500));

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      console.error('[submit-lead] Non-JSON response from Apps Script:', text.substring(0, 1000));
      return NextResponse.json(
        { status: 'error', message: 'Script returned an unexpected response. Check server logs.' },
        { status: 502 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
    console.error('[submit-lead] Error:', message);
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
