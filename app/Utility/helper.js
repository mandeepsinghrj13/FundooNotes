/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable lines-between-class-members */
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
      id: data.id,
    };
    return jwt.sign(dataForToken, process.env.SECRET_KEY, { expiresIn: "60m" });
  };
  getEmailFromToken(token) {
    console.log("inside helper get token");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded, "D");
    console.log(decoded.email, "token helper");
    return decoded.email;
  }
  verifyingToken = (req, res, next) => {
    try {
      const { token } = req.params;
      console.log(token, "token in helper");
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (data) {
          console.log("varify");
          next();
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered",
      });
    }
  };
}
module.exports = new Helper();
