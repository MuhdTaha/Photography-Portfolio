import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import siteData from '../../data/site.json'
 
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const dryRun = import.meta.env.EMAIL_DRY_RUN === 'true';
  const forceFail = import.meta.env.EMAIL_FORCE_FAIL === 'true';

  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const category = data.get('category');

  if (forceFail) {
    return new Response(JSON.stringify({ error: 'Forced failure for testing' }), { status: 500 });
  }

  if (dryRun) {
    return new Response(JSON.stringify({ message: 'Dry run success (no email sent)' }), { status: 200 });
  }

  try {
    const result = await resend.emails.send({
      from: 'Contact Form <contact@ali1visuals.com>',
      to: siteData.email,
      subject: `New Inquiry from ${name}`,
      html: `
        <h1>New Message from Ali1Visuals Portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (result.error) {
      return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }
};