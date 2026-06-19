export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) {
    return Response.json({ status: 'error', message: 'API URL not configured.' }, { status: 500 });
  }

  try {
    const data = await request.json() as Record<string, string>;
    const fd = new FormData();
    fd.append('formType', 'lead');
    Object.entries(data).forEach(([key, value]) => fd.append(key, value ?? ''));

    const res = await fetch(url, { method: 'POST', body: fd });
    const json = await res.json();
    return Response.json(json);
  } catch {
    return Response.json({ status: 'error', message: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
