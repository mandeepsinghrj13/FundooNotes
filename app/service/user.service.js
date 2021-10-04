/* eslint-disable node/no-callback-literal */
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const helper = require("../Utility/helper");
const logger = require("../Utility/logger.js");
const mailUser = require("../Utility/nodemailer");
// creating a class
class UserService {
  // registraion for new user register
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };

  // loginUser
  loginUser = (user, callback) => {
    // call user.model.js file
    userModel.loginUser(user, (err, data) => {
      if (err) {
        logger.error(" Error");
        return callback(err, null);
      } else {
        // compare both password
        const result = bcrypt.compareSync(user.Password, data.Password);
        if (result) {
          const token = helper.jwtTokenGenerate(data);
          logger.info("Valid Password And Generate Jwt Token");
          return callback(null, token);
        } else {
          logger.error("invalid password");
          return callback("invalid password", null);
        }
      }
    });
  };

  // forgetPassword
  forgetPassword = (user, callback) => {
    userModel.forgetPassword(user, (err, data) => {
      if (err) {
        logger.error("email not in database");
        return callback(err, null);
      } else {
        return callback(null, mailUser.sendEmail(data));
      }
    });
  };
}
module.exports = new UserService();
