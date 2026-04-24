import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, date, time, guests, message } = data;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Integrate with your email service (Nodemailer, Resend, SendGrid, etc.)
    // Example with Nodemailer:
    //
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: 'contact@yume-sushi.ma',
    //   subject: `Nouvelle réservation - ${name}`,
    //   html: `
    //     <h2>Nouvelle réservation</h2>
    //     <p><strong>Nom:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Téléphone:</strong> ${phone}</p>
    //     <p><strong>Date:</strong> ${date} à ${time}</p>
    //     <p><strong>Personnes:</strong> ${guests}</p>
    //     <p><strong>Message:</strong> ${message || 'Aucun'}</p>
    //   `,
    // });

    console.log('📅 New reservation:', { name, email, phone, date, time, guests, message });

    return NextResponse.json({ success: true, message: 'Reservation received' });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
