const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendTokenemail = (data) => {
  const dataForToken = {
    email: data.email,
  };
  return jwt.sign(dataForToken, process.env.SECRET_KEY, { expiresIn: "1H" });
};
