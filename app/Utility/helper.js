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
    return jwt.sign(dataForToken, process.env.SECRET_KEY, { expiresIn: "24H" });
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
}
module.exports = new Helper();
