/* eslint-disable new-cap */
/* eslint-disable node/no-callback-literal */
const mongoose = require("mongoose");
const helper = require("../Utility/helper");
const logger = require("../Utility/logger");
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
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
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

  // login
  /**
   * loginuser
   * @param {*} userDetails
   * @param {*} callback
   */
  loginUser = (userDetails, callback) => {
    user.findOne({ email: userDetails.email }, (error, data) => {
      if (error) {
        logger.error("Error loggin user");
        return callback(error, null);
      } else {
        if (!data) {
          logger.error("Invalid User");
          return callback(error, null);
        } else {
          logger.info("Email id found");
          return callback(null, data);
        }
      }
    });
  };

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
    // Password Hashed
    helper.hashing(resetInfo.newPassword, (err, hashedPassword) => {
      if (err) {
        throw err;
      } else {
        helper.decodeToken(resetInfo.token, (error, data) => {
          if (data) {
            user.findByIdAndUpdate(
              data.id,
              { Password: hashedPassword },
              (error, data) => {
                if (data) {
                  logger.info("Password Updated successfully");
                  return callback(null, data);
                } else {
                  logger.info(error);
                  return callback(error, null);
                }
              }
            );
          } else {
            return callback(error, null);
          }
        });
      }
    });
  };
  // updatePassword = (inputData, callback) => {
  //   try {
  //     user.findOne({ email: inputData.email }, (err, data) => {
  //       console.log(data.id, "inside model");

  //       if (data) {
  //         bcrypt.hash(inputData.Password, 10, (error, hashPassword) => {
  //           if (hashPassword) {
  //             console.log(hashPassword, "hash");
  //             user.findByIdAndUpdate(
  //               data.id,
  //               { Password: hashPassword },
  //               (error, data) => {
  //                 if (error) {
  //                   return callback(error, null);
  //                 } else {
  //                   return callback(null, data);
  //                 }
  //               }
  //             );
  //           } else {
  //             return callback(error, null);
  //           }
  //         });
  //       } else {
  //         return callback(err, null);
  //       }
  //     });
  //   } catch (error) {
  //     return callback(error, null);
  //   }
  // };
}

module.exports = new userModel();
