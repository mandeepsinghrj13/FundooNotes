const userService = require("../service/user.service.js");
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
        console.log(validationRegister.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationRegister,
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(409).json({
            success: false,
            message: "Already exist User",
          });
        } else {
          res.status(201).json({
            success: true,
            data: data,
            message: "User Data Inserted successfully",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "server-error",
      });
    }
  };
}
module.exports = new Controller();
