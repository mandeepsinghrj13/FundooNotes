const controller = require("../controllers/user.controller.js");
const helper = require("../Utility/helper");
module.exports = (app) => {
  // Create a new Node
  app.post("/register", controller.register);
  app.post("/login", controller.login);
  app.post("/forgetPassword", controller.forgetPassword);
  app.put(
    "/resetPassword/:token",
    helper.verifyingToken,
    controller.resetPassword
  );
};
