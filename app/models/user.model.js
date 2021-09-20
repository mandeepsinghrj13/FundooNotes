const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // console.log(`the current password is ${this.Password}`);
    const hashpassword = await bcrypt.hash(this.Password, 10);
    this.Password = hashpassword;
    next();
  } catch (error) {
    console.log("errer");
  }
});

const user = mongoose.model("user", userSchema);

class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new user({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      Password: userDetails.Password,
    });
    newUser.save((error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  };
  //login
  loginUser = (userDetails, callback) => {
    try {
      user.findOne({ email: userDetails.email }, (err, data) => {
        if (!data) {
          return callback(err + "invalid email", null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback("Internal Error", null);
    }
  };
}
module.exports = new userModel();
