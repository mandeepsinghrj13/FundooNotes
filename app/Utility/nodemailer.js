/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prefer-const */
const nodemailer = require("nodemailer");
const auth = require("../Utility/helper");
const logger = require("./logger");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Pass,
    },
  });
  logger.info("Jwt Token Generate");
  const token = auth.jwtTokenGenerate(data, process.env.SECRET_KEY_FOR_RESET);

  /**
   * show in email
   */
  const mailOptions = {
    from: process.env.Email,
    to: data.email,
    subject: "Reset password Link",
    html: `
    <h2>please click on this link to change your password</h2>
    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
    <a href="${process.env.CLIENT_URL}/resetpassword/${token}"><h2>please click on this link to change your password</h2></a>
                `,
  };

  /**
   * send email
   */
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return null;
    } else {
      const data = {
        link: process.env.CLIENT_URL + "/resetpassword/" + token,
        response: info.response,
      };
      return data;
    }
  });
};
class SendResetPassMail {
  sendConfirmMail = (token, data) => {
    const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Pass,
      },
    });

    transporter.sendMail({
      from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
      to: data.email, // list of receivers
      subject: "Verify Your E-Mail - Fundoo notes account", // Subject line
      text: `Hello ${data.firstName}.`, // plain text body
      html: `<b>Hello ${data.firstName}. Here is your link to Verify Mail: <button href="${link}"> <a href="${link}">reset password</a></button></b>`, // html body
    });
  };
}

module.exports = new SendResetPassMail();
