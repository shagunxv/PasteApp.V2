
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, name, userId }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"PasteApp" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Welcome to PasteApp!',
    text: `Hey ${name || 'there'}, you are successfully registered to PasteApp.

ID is: ${userId}

Thank you, see you around!`,
  });
};

module.exports = sendEmail;
