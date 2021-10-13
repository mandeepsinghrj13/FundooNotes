const labelService = require("../service/labelservice.js");
const logger = require("../Utility/logger");
const validation = require("../Utility/validation.js");
class Labels {
  /**
   * createLabel
   * @param {*} req
   * @param {*} res
   * @returns
   */
  createLabel = (req, res) => {
    try {
      const label = {
        labelName: req.body.labelName,
        userId: req.userData.id,
      };
      // check validation user body
      const validationCreateLabel = validation.createLabel.validate(label);

      if (validationCreateLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationCreateLabel,
        });
      }
      labelService.createLabel(label, resolve, reject);
      function resolve(data) {
        logger.info("Label Created Successfully");
        return res.status(201).send({
          message: "Label Created Successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("fail the create label");
        return res.status(400).json({
          message: "fail the create label",
          success: false,
        });
      }
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  /**
   * getLabel
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getLabel = (req, res) => {
    try {
      const id = { id: req.userData.id };

      labelService.getLabel(id, resolve, reject);
      function resolve(data) {
        logger.info("Get All Label successfully");
        return res.status(201).json({
          message: "Get All Label successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("Failed to get all Label");
        return res.status(400).json({
          message: "failed to get all Label",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };
}
module.exports = new Labels();
