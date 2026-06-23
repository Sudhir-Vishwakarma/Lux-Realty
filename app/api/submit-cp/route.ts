import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_CP_API_URL;
  if (!url) {
    return NextResponse.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const incoming = await request.formData();
    const params = new URLSearchParams();

    // formType is already appended by ChannelPartnerForm before sending
    for (const [key, value] of incoming.entries()) {
      if (typeof value === 'string') {
        params.append(key, value);
      }
      // File entries are skipped — Apps Script stores text fields only
    }

    // Apps Script flow: POST to exec → doPost runs → 302 redirect → GET returns JSON output
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    const text = await res.text();
    console.log('[submit-cp] Apps Script response:', text.substring(0, 500));

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      console.error('[submit-cp] Non-JSON response from Apps Script:', text.substring(0, 1000));
      return NextResponse.json(
        { status: 'error', message: 'Script returned an unexpected response. Check server logs.' },
        { status: 502 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
    console.error('[submit-cp] Error:', message);
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
