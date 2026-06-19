export async function submitLeadForm(
  data: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) return { success: false, message: 'API URL not configured.' };

  try {
    const fd = new FormData();
    fd.append('formType', 'lead');
    Object.entries(data).forEach(([key, value]) => fd.append(key, value));

    const res = await fetch(url, { method: 'POST', body: fd });
    const json = await res.json();
    if (json.status === 'success') return { success: true, message: json.message || 'Lead submitted successfully.' };
    return { success: false, message: json.message || 'Submission failed. Please try again.' };
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
    const json = await res.json();
    if (json.status === 'success') return { success: true, message: json.message || 'Registration submitted successfully.' };
    return { success: false, message: json.message || 'Submission failed. Please try again.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}
