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
    resetLink: {
      data: String,
      default: "",
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

  // login
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
}

module.exports = new userModel();
