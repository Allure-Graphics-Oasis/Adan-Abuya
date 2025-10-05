const express = require('express');
const { Resend } = require('resend');

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // or your verified domain
      to: process.env.CONTACT_RECEIVER_EMAIL,
      reply_to: email,
      subject: `${subject || 'New Contact Message'} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    console.log('Email sent:', data);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

module.exports = router;
