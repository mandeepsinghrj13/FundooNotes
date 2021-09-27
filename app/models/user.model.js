const mongoose = require("mongoose");
const helper = require("../Utility/helper");
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
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema);
class userModel {
  registerUser = (userDetails, callback) => {
    // eslint-disable-next-line new-cap
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
            callback(error, null);
          } else {
            callback(null, data);
          }
        });
      }
    });
  };

  // login
  loginUser = (userDetails, callback) => {
    try {
      user.findOne({ email: userDetails.email }, (err, data) => {
        if (!data) {
          // eslint-disable-next-line node/no-callback-literal
          return callback(err + "invalid email", null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      // eslint-disable-next-line node/no-callback-literal
      return callback("Internal Error", null);
    }
  };
}
// eslint-disable-next-line new-cap
module.exports = new userModel();
