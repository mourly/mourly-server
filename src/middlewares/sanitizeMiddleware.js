const DOMPurify = require("isomorphic-dompurify");

const sanitizeObj = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = sanitizeText(obj[key]);
    } else if (typeof obj[key] === "object") {
      sanitize(obj[key]);
    }
  }
  return obj;
};

const sanitizeText = (text) =>
  DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

module.exports = { sanitizeText, sanitizeObj };
