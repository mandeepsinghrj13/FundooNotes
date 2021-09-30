const userService = require("../service/user.service.js");
const logger = require("../Utility/logger");
const validation = require("../Utility/validation.js");

class Controller {
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Password: req.body.Password,
      };
      const validationRegister = validation.authUserRegister.validate(user);

      if (validationRegister.error) {
        // console.log(validationRegister.error);
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationRegister,
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.error("Already Exist User");
          return res.status(409).json({
            success: false,
            message: "Already exist User",
          });
        } else {
          logger.info("User Data Inserted Successfully");
          res.status(201).json({
            success: true,
            // data: data,
            message: "User Data Inserted successfully",
          });
        }
      });
    } catch (error) {
      logger.error("server-error");
      return res.status(500).json({
        success: false,
        data: null,
        message: "server-error",
      });
    }
  };

  // login start
  login = (req, res) => {
    try {
      const userLogin = {
        email: req.body.email,
        Password: req.body.Password,
      };
      // loging validation
      const validationLogin = validation.authUserLogin.validate(userLogin);

      if (validationLogin.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationLogin,
        });
      }

      userService.loginUser(userLogin, (error, data) => {
        if (error) {
          logger.error("user login failed");
          return res.status(400).json({
            success: false,
            message: "User login failed",
            // data: data,
          });
        } else {
          logger.info("loging successfully");
          res.status(200).json({
            success: true,
            // data: data,
            message: "loging successfully",
            token: data,
          });
        }
      });
    } catch (error) {
      logger.error("server-error");
      return res.status(500).json({
        success: false,
        // data: null,
        message: "server-error",
      });
    }
  }; // login end
}
module.exports = new Controller();
