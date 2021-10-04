const nodemailer = require("nodemailer");
const auth = require("./email_token_send");
require("dotenv").config();
exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Pass,
    },
  });

  const token = auth.sendTokenemail(data);
  const mailOptions = {
    from: process.env.Email,
    to: data.email,
    subject: "Reset password Link",
    html: `<h2>please click on this link to change the password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                `,
  };

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
