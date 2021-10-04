/* eslint-disable no-undef */
/* eslint-disable node/handle-callback-err */
const userService = require("../service/user.service.js");
const logger = require("../Utility/logger");
const validation = require("../Utility/validation.js");
// creating a class Controller
class Controller {
  /**
   *
   * @param {request} req
   * @param {Response} res
   * @returns
   */
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Password: req.body.Password,
      };
      // check validation user body
      const validationRegister = validation.authUserRegister.validate(user);

      if (validationRegister.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationRegister,
        });
      }
      // userService.registerUser heat on service.js file
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
      // userService.loginUser heat on user.service.js file
      userService.loginUser(userLogin, (error, data) => {
        if (error) {
          logger.error("User Login Failed");
          return res.status(400).send({
            success: false,
            message: "User login failed",
          });
        }
        logger.info("Loging successfully");
        return res.status(200).send({
          success: true,
          message: "Loging successfully",
          token: data,
        });
      });
    } catch (err) {
      logger.error("server-error");
      return res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }; // login end

  // forget password
  forgetPassword = (req, res) => {
    try {
      const user = {
        email: req.body.email,
      };

      // forgetPassword validation
      const validationforgetPassword =
        validation.authUserforgetPassword.validate(user);

      if (validationforgetPassword.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationforgetPassword,
        });
      }
      // userService.forgetPassword heat on user.service.js file
      userService.forgetPassword(user, (error, data) => {
        if (error) {
          logger.error("Email Not Exist");
          return res.status(409).json({
            success: false,
            message: "Email Not Exist",
          });
        } else {
          logger.info("Email Send Successfully");
          res.status(201).json({
            success: true,
            message: "email send successfully",
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
}
module.exports = new Controller();
