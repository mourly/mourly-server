const nodemailer = require("nodemailer");

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  secure: true,
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `Mourly <${MAIL_USER}>`,
    subject,
    html,
    to,
    text,
    envelope: {
      from: MAIL_USER,
      to,
    },
  };

  try {
    await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.log("Send Mail Error: ", err);
    return false;
  }
};

module.exports = { transporter, sendMail };
