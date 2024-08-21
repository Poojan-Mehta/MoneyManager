import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  content: string;
}

export const sendMail = async ({ to, subject, content }: MailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for SSL
    secure: true, // Use true for SSL (port 465)
    auth: {
      user: process.env.SMTP_EMAIL, // Your Gmail address
      pass: process.env.SMTP_PASSWORD, // Your Gmail password or App Password if 2-Step Verification is enabled
    },
  });

  const mailOptions = {
    from: 'poojanmehta008@gmail.com', // Sender address
    to: to,
    subject: subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
