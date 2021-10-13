const labelService = require("../service/labelservice.js");
const logger = require("../Utility/logger");
// const validation = require("../Utility/validation.js");
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
}
module.exports = new Labels();
