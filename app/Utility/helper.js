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

  jwtTokenGenerate = (data, sec) => {
    const dataForToken = {
      email: data.email,
      id: data.id,
    };
    return jwt.sign(dataForToken, sec, { expiresIn: "48h" });
  };

  jwtTokenGenerateforConfirm = (payload, secretkey, callback) => {
    jwt.sign({ email: payload.email }, secretkey, { expiresIn: "5h" }, (err, token) => {
      if (err) {
        return callback("token not generated", null);
      } else {
        return callback(null, token);
      }
    });
  };

  /**
   * verifytoken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  verifyToken = (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      // console.log("head: " + header);
      const token = myArr[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        // console.log(
        //   "token decode email and" + decode.email + " id " + decode.id
        // );
        logger.info("token verified");
        req.userData = decode;
        next();
      } else {
        logger.info("token verify error");
      }
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered",
      });
    }
  };

  /**
   * verifyTokenforreset
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  verifyTokenforreset = (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      // console.log("head: " + header);
      const token = myArr[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY_FOR_RESET);
      if (decode) {
        // console.log(
        //   "token decode email and" + decode.email + " id " + decode.id
        // );
        logger.info("token verified");
        req.userData = decode;
        next();
      } else {
        logger.info("token verify error");
      }
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered",
      });
    }
  };
}
module.exports = new Helper();
