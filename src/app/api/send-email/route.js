import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'bgiyabliss73@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-gmail-app-password', // The user will need to generate an App Password
      },
    });

    const mailOptions = {
      from: `"Bgiya Bliss" <${process.env.EMAIL_USER || 'bgiyabliss73@gmail.com'}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
