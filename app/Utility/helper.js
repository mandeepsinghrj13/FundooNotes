/* eslint-disable node/handle-callback-err */
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
    return jwt.sign(dataForToken, process.env.SECRET_KEY, { expiresIn: "2H" });
  };

  /**
   * decodetoken
   * @param {*} token
   * @param {*} callback
   * @returns
   */
  decodeToken = (token, callback) => {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode) {
      return callback(null, decode);
    } else {
      return callback("Cannot Decode token", null);
    }
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
      this.decodeToken(token, (error, decode) => {
        if (decode) {
          // console.log(
          //   "token decode email and id" + decode.email + " id " + decode.id
          // );
          logger.info("token verified");
          next();
        } else {
          logger.info("token verify error");
          // console.log("token verify error");
        }
      });
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered",
      });
    }
  };
  // getEmailFromToken(token) {
  //   console.log("inside helper get token");
  //   const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //   console.log(decoded.email, "token helper");
  //   return decoded.email;
  // }
  // verifyingToken = (req, res, next) => {
  //   try {
  //     const { token } = req.params;
  //     console.log(token, "token in helper");
  //     jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
  //       if (data) {
  //         console.log("varify");
  //         next();
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   } catch (error) {
  //     res.status(401).send({
  //       error: "Your token has expiered",
  //     });
  //   }
  // };
}
module.exports = new Helper();
