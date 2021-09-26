const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const helper = require("../Utility/helper")
//creating a class
class userService {
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
  //login and compare password from user and database
  loginUser = (user, callback) => {
    userModel.loginUser(user, (err, data) => {
      if (data) {
        //compare both password
        bcrypt.compare(user.Password, data.Password, (err, databaseData) => {
          if (!databaseData) {
            return callback(err + "invalid password", null);
          } else {
            helper.jwtTokenGenerate(data, (err, token) =>{
              if (token) {
                return callback(null, token);
              } else {
                throw err;
              }
            })
            
          }
        });
      } else {
        return callback(
          err + "invalid login info , please enter valid login info"
        );
      }
    });
  };
}
module.exports = new userService();
