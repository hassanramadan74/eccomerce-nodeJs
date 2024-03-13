// npm install nodemailer

import nodemailer from "nodemailer";

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "routeegyptnodejs@gmail.com",
      pass: "dqbpxivrjrasuvwj",
    },
  });

  const info = await transporter.sendMail({
    from: '"Route Academy" <routeegyptnodejs@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: options.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
