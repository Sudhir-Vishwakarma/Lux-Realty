export async function submitLeadForm(
  data: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) return { success: false, message: 'API URL not configured.' };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, message: 'Lead submitted successfully.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}

export async function submitChannelPartnerForm(
  data: FormData
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_CP_API_URL;
  if (!url) return { success: false, message: 'API URL not configured.' };

  try {
    const res = await fetch(url, { method: 'POST', body: data });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, message: 'Registration submitted successfully.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}
