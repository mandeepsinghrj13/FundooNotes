const controller = require("../controllers/user.controller.js");

module.exports = (app) => {
  // Create a new Node
  app.post("/register", controller.register);
  app.post("/login", controller.login);
  app.post("/forgetPassword", controller.forgetPassword);
};
