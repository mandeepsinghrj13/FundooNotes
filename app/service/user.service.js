/* eslint-disable node/no-callback-literal */
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const helper = require("../Utility/helper");
const logger = require("../Utility/logger.js");
const mailUser = require("../Utility/nodemailer");
const jwt = require("jsonwebtoken");
const sendLinkMail = require("../utility/nodemailer");
const rabit = require("../utility/rabitmq");
// creating a class
class UserService {
  // registraion for new user register
  // registerUser = (user, callback) => {
  //   userModel.registerUser(user, (err, data) => {
  //     if (err) {
  //       return callback(err, null);
  //     } else {
  //       return callback(null, data);
  //     }
  //   });
  // };
  registerUser = (user, callback) => {
    // helper.sendWelcomeMail(user);
    userModel.registerUser(user, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        const secretkey = process.env.SECRET_KEY_FOR_CONFIRM;
        helper.jwtTokenGenerateforConfirm(data, secretkey, (err, token) => {
          if (token) {
            console.log("service forget id and token : ", data.id, " ", token);
            // Send mail
            rabit.sender(data, data.email);
            sendLinkMail.sendConfirmMail(token, data);
            return callback(null, token);
          } else {
            return callback(err, null);
          }
        });
        return callback(null, data);
      }
    });
  };

  confirmRegister = (data, callback) => {
    const decode = jwt.verify(data.token, process.env.SECRET_KEY_FOR_CONFIRM);
    if (decode) {
      rabit
        .receiver(decode.email)
        .then((val) => {
          userModel.confirmRegister(JSON.parse(val), (error, data) => {
            if (data) {
              return callback(null, data);
            } else {
              return callback(error, null);
            }
          });
        })
        .catch(() => {
          console.log("failed");
        });
    }
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
          const token = helper.jwtTokenGenerate(data, process.env.SECRET_KEY);
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
      if (data === null) {
        logger.error("email not in database");
        return callback(err, null);
      } else {
        return callback(null, mailUser.sendEmail(data));
      }
    });
  };

  /**
   * resetpassword
   * @param {*} resetInfo
   * @param {*} callback
   */
  resetPassword = (resetInfo, callback) => {
    userModel.resetPassword(resetInfo, (error, data) => {
      if (data) {
        return callback(null, data);
      } else {
        return callback(error, null);
      }
    });
  };
}
module.exports = new UserService();
