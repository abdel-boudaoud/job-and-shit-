require("dotenv").config();

const nodemailer = require("nodemailer");

const sendMail = (target) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: target,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };
