export async function submitLeadForm(
  data: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
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
  try {
    const res = await fetch('/api/submit-cp', { method: 'POST', body: data });
    const json = await res.json();
    if (json.status === 'success') return { success: true, message: json.message || 'Registration submitted successfully.' };
    return { success: false, message: json.message || 'Submission failed. Please try again.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}
