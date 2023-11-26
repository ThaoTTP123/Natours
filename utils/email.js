const nodemailer = require('nodemailer');
module.exports = class Email {
  constructor() {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    rhis.from = `ThaoTTP ${process.env.EMAIL_FROM}`;
  }
  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }
    return nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  send(template, ubject) {}
  sendWelcome() {
    this.send('welcome', 'Welcome to the Natours family');
  }
};
const sendEmail = async (options) => {
  const mailOptions = {
    from: 'ThaoTTP <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };
  await transporter.sendMail(mailOptions);
};
