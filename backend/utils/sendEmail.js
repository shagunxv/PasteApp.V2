
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, name, userId }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"PasteApp" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to PasteApp!',
    text: `Hey ${name || 'there'},

You have successfully registered to PasteApp!

Your User ID is: ${userId}

Thank you, see you around!`,
  });
};

module.exports = sendEmail;
