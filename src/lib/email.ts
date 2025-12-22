import { getServerEnv } from "./serverEnv";

export async function sendDownloadEmail(opts: {
  to: string;
  downloadUrl: string;
  itemCount: number;
}) {
  const resendKey = getServerEnv("RESEND_API_KEY");
  const from = getServerEnv("EMAIL_FROM");

  if (!resendKey || !from) {
    throw new Error("Missing RESEND_API_KEY or EMAIL_FROM (required to email download link)");
  }

  const subject = `Your TRNDFY download link (${opts.itemCount} item${opts.itemCount === 1 ? "" : "s"})`;
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; line-height: 1.5;">
      <h2>Thanks for your purchase</h2>
      <p>Your download link:</p>
      <p><a href="${opts.downloadUrl}">${opts.downloadUrl}</a></p>
      <p style="color:#666;">If you didn’t request this, ignore this email.</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: opts.to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Email send failed: ${txt}`);
  }
}


