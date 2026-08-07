// Email sending via fetch-based API (Cloudflare Workers compatible)
// Replaces nodemailer which requires Node.js net/tls sockets

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    const emailUser = process.env.EMAIL_USER || 'bgiyabliss73@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    if (!emailPass) {
      console.error('EMAIL_PASS is not set');
      return Response.json(
        { success: false, error: 'Email configuration error — EMAIL_PASS not set' },
        { status: 500 }
      );
    }

    // Use Gmail's SMTP relay via a simple HTTPS wrapper.
    // For production on Cloudflare Workers, the recommended approach is to use
    // an HTTP-based email service. Here we use Resend / SendGrid / Mailgun.
    //
    // OPTION 1: If you set up Resend (https://resend.com — free tier: 100 emails/day):
    //   Set RESEND_API_KEY in your Cloudflare environment variables.
    //
    // OPTION 2: If you prefer SendGrid:
    //   Set SENDGRID_API_KEY in your Cloudflare environment variables.
    //
    // Below we try Resend first, then SendGrid, then return an error with instructions.

    const resendKey = process.env.RESEND_API_KEY;
    const sendgridKey = process.env.SENDGRID_API_KEY;

    if (resendKey) {
      // --- Resend ---
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: `Bgiya Bliss <${emailUser}>`,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || JSON.stringify(data));
      }
      return Response.json({ success: true, messageId: data.id });
    }

    if (sendgridKey) {
      // --- SendGrid ---
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: Array.isArray(to) ? to[0] : to }] }],
          from: { email: emailUser, name: 'Bgiya Bliss' },
          subject,
          content: [{ type: 'text/html', value: html }],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'SendGrid API error');
      }
      return Response.json({ success: true, messageId: 'sendgrid-sent' });
    }

    // No email provider configured
    return Response.json(
      {
        success: false,
        error: 'No email provider configured. Set RESEND_API_KEY or SENDGRID_API_KEY in your Cloudflare environment variables.',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
