
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, name, userId }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"PasteApp" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to PasteApp!',
    text: `Hey ${name || 'there'}, you have successfully registered to PasteApp!

Your User ID is: ${userId}

Thank you, see you around!`,
  });
};

module.exports = sendEmail;
