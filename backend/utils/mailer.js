import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactNotification({ name, email, company, message }) {
  if (!process.env.SMTP_HOST) {
    console.log('[mailer] SMTP not configured — skipping email send. Message logged instead:', { name, email, company, message });
    return;
  }
  await transporter.sendMail({
    from: `"VisionDeck Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_INBOX || process.env.SMTP_USER,
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message}`,
  });
}
