/* eslint-disable node/no-callback-literal */
// helper.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
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
          return callback("token not generated", null);
        } else {
          return callback(null, token);
        }
      }
    );
  };
}
module.exports = new Helper();
