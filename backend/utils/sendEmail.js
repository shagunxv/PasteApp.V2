
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, name, userId }) => {
  const { data, error } = await resend.emails.send({
    from: 'PasteApp <onboarding@resend.dev>',
    to: [to],
    subject: 'Welcome to PasteApp!',
    text: `Hey ${name || 'there'},

You have successfully registered to PasteApp!

Your User ID is: ${userId}

Thank you, see you around!`,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log('Welcome email sent:', data?.id);
};

module.exports = sendEmail;
