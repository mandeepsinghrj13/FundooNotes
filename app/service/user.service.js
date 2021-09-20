const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
class userService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };
  //login
  loginUser = (user, callback) => {
    userModel.loginUser(user, (err, data) => {
      if (data) {
        //compare both password
        bcrypt.compare(user.Password, data.Password, (err, databaseData) => {
          if (databaseData) {
            return callback(err + "invalid password", null);
          } else {
            return callback(null, data);
          }
        });
      } else {
        return callback("invalid login info , please enter valid login info");
      }
    });
  };
}
module.exports = new userService();
