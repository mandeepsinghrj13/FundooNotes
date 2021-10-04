/* eslint-disable node/no-callback-literal */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
require("dotenv").config();
class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
        logger.error("error is hashing");
        return callback(err, null);
      } else {
        return callback(null, hashpassword);
      }
    });
  };

  jwtTokenGenerate = (data) => {
    const dataForToken = {
      email: data.email,
      Password: data.Password,
    };
    return jwt.sign(dataForToken, process.env.SECRET_KEY, { expiresIn: "1H" });
  };
}
module.exports = new Helper();
