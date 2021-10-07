const controller = require("../controllers/user.controller.js");
const helper = require("../Utility/helper");
module.exports = (app) => {
  // Create a new Node
  app.post("/register", controller.register);
  // Post login
  app.post("/login", controller.login);
  // Post forgetpassword
  app.post("/forgetPassword", controller.forgetPassword);
  // Post resetpassword
  app.post("/resetpassword", helper.verifyToken, controller.resetPassword);
};
