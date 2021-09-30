/* eslint-disable node/no-callback-literal */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
        logger.error("error is hashing");
        return callback("error is hashing", null);
      } else {
        return callback(null, hashpassword);
      }
    });
  };

  jwtTokenGenerate = (data, callback) => {
    jwt.sign(
      { id: data._id, firstName: data.firstName, lastName: data.lastName },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          logger.error("token not generated");
          return callback("token not generated", null);
        } else {
          logger.info("token  generated");
          return callback(null, token);
        }
      }
    );
  };
}
module.exports = new Helper();
