/* eslint-disable node/no-callback-literal */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
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

  jwtTokenGenerate = (data, callback) => {
    jwt.sign(
      { email: data.email, firstName: data.firstName, lastName: data.lastName },
      process.env.SECRET_KEY,
      (err, data) => {
        if (err) {
          logger.error("token not generated");
          return callback(err, null);
        } else {
          logger.info("token  generated");
          return callback(null, data);
        }
      }
    );
  };
}
module.exports = new Helper();
