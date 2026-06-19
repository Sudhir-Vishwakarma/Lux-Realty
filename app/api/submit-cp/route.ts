export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_CP_API_URL;
  if (!url) {
    return Response.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const incoming = await request.formData();
    const fd = new FormData();
    fd.append('formType', 'channel_partner');
    for (const [key, value] of incoming.entries()) {
      fd.append(key, value);
    }

    const res = await fetch(url, { method: 'POST', body: fd });
    const json = await res.json();
    return Response.json(json);
  } catch {
    return Response.json({ status: 'error', message: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
