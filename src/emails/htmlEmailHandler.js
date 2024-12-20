const fs = require("fs");
const path = require("path");
const { sendMail } = require("../config/nodemailer");

// ----- Get Email Template ----- //
const getEmailTemplate = (fileName) => {
  try {
    const filePath = path.join(__dirname, `${fileName}.html`);

    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.log("Get Email Template Error: ", err);
  }
};

// ----- Populate Email Template ----- //
const populateEmailTemplate = (template, variables) => {
  return template.replace(
    /{{(.*?)}}/g,
    (_, key) => variables[key.trim()] || ""
  );
};

// ----- Send Welcome Email ----- //
const sendWelcomeMail = async (email, username) => {
  const html = getEmailTemplate("welcome");

  if (!html) return false;

  const changedHtml = populateEmailTemplate(html, { username });

  const res = await sendMail({
    to: email,
    subject: "You're Part of the Mourly Family Now! ❤️",
    text: "We're so excited to have you on board. Mourly allows you to connect with friends securely and enjoy encrypted messaging.",
    html: changedHtml,
  });

  return res;
};

// ----- Exports ----- //
module.exports = {
  populateEmailTemplate,
  getEmailTemplate,
  sendWelcomeMail,
};
