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
