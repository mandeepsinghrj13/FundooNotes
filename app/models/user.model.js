/* eslint-disable eqeqeq */
/* eslint-disable new-cap */
/* eslint-disable node/no-callback-literal */
const mongoose = require("mongoose");
const helper = require("../Utility/helper");
const logger = require("../Utility/logger");
// const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 8,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema);
class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new user({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      Password: userDetails.Password,
    });
    helper.hashing(newUser.Password, (err, hashpassword) => {
      if (err) {
        throw err;
      } else {
        newUser.Password = hashpassword;
        newUser.save((error, data) => {
          if (error) {
            logger.error("Not Save Data Because Allready There");
            callback(error, null);
          } else {
            logger.info("Save Data With Hashing");
            callback(null, data);
          }
        });
      }
    });
  };

  confirmRegister = (data, callback) => {
    user.findOneAndUpdate(
      { email: data.email },
      {
        verified: true,
      },
      (error, data) => {
        if (error) {
          logger.error("data not found in database");
          return callback(error, null);
        } else {
          logger.info("data found in database");
          return callback(null, data);
        }
      }
    );
  };

  // login
  /**
   * loginuser
   * @param {*} userDetails
   * @param {*} callback
   */

  loginUser = (loginData, callback) => {
    // Checking Email into database present or not
    user.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error("data not found in database");
        return callback(error, null);
      } else {
        if (data.verified == true) {
          logger.info("data found in database");
          return callback(null, data);
        } else {
          logger.info("data found in database but not verified");
          return callback("not verified mail", null);
        }
      }
    });
  };

  // loginUser = (userDetails, callback) => {
  //   user.findOne({ email: userDetails.email }, (error, data) => {
  //     if (error) {
  //       logger.error("Error loggin user");
  //       return callback(error, null);
  //     } else {
  //       if (!data) {
  //         logger.error("Invalid User");
  //         return callback(error, null);
  //       } else {
  //         logger.info("Email id found");
  //         return callback(null, data);
  //       }
  //     }
  //   });
  // };

  // forgetPassword checking into database usingh findeOne() email there or not
  /**
   * forgetpassword
   * @param {*} userDetails
   * @param {*} callback
   * @returns
   */
  forgetPassword = (userDetails, callback) => {
    try {
      user.findOne({ email: userDetails.email }, (err, data) => {
        if (!data) {
          logger.error("email not Exist");
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      logger.error("Internal Error");
      return callback(error, null);
    }
  };

  /**
   * resetpassword
   * @param {*} resetInfo
   * @param {*} callback
   */
  resetPassword = (resetInfo, callback) => {
    helper.hashing(resetInfo.newPassword, (err, hashedPassword) => {
      if (err) {
        throw err;
      } else {
        user.findByIdAndUpdate(resetInfo.id, { Password: hashedPassword }, (error, data) => {
          if (data) {
            return callback(null, data);
          } else {
            logger.info(error);
            return callback(error, null);
          }
        });
      }
    });
  };
}

module.exports = new userModel();
