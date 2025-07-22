import type { NextRequest } from 'next/server';
// @ts-ignore – nodemailer lacks built-in types in some setups
import nodemailer from 'nodemailer';
// Simple in-memory rate-limit storage (IP → timestamps array)
const rateLimitMap = new Map<string, number[]>();

export const runtime = 'nodejs';

const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3;

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

  // Rate-limit check
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = (timestamps as number[]).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), { status: 429 });
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);

  try {
    const data = await req.json();

    // Honeypot check: 有填代表機器人
    if (data.company_website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 }); // pretend success
    }

    const {
      inquiryType,
      firstName,
      lastName,
      company,
      jobTitle,
      email,
      message,
    } = data;

    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields.' }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailText = `聯絡表單來信\n\n` +
      `Inquiry Type: ${inquiryType}\n` +
      `姓名: ${lastName}${firstName}\n` +
      `公司: ${company || ''}\n` +
      `職稱: ${jobTitle || ''}\n` +
      `Email: ${email}\n\n` +
      `訊息:\n${message}`;

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `網站聯絡表單: ${lastName}${firstName}`,
      text: mailText,
      replyTo: email,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error('Contact API error', err);
    return new Response(JSON.stringify({ ok: false, error: 'Internal error' }), { status: 500 });
  }
} 