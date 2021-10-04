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

  // login and compare password from user and database
  loginUser = (user, callback) => {
    userModel.loginUser(user, (err, data) => {
      if (data) {
        // compare both password
        bcrypt.compare(user.Password, data.Password, (err, databaseData) => {
          if (!databaseData) {
            logger.error("invalid password");
            return callback(err, null);
          } else {
            helper.jwtTokenGenerate(data, (err, token) => {
              if (token) {
                return callback(null, token);
              } else {
                throw err;
              }
            });
          }
        });
      } else {
        logger.error(
          "invalid login info , please enter valid email or password login info"
        );
        return callback(
          err + "invalid login info , please enter valid login info"
        );
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
