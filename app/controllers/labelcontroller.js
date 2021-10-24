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
      //   // check validation user body
      const validationGetLabel = validation.getLabels.validate(id);

      if (validationGetLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationGetLabel,
        });
      }
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

  /**
   * getLabelById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getLabelById = (req, res) => {
    try {
      const id = {
        userId: req.userData.id,
        noteId: req.params.id,
      };
      // check validation user body
      const validationGetLabelById = validation.GetLabelById.validate(id);

      if (validationGetLabelById.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationGetLabelById,
        });
      }
      // labelService
      //   .getLabelById(id)
      //   .then((data) => {
      //     logger.info("Found label");
      //     res.status(200).send({
      //       message: "label retrieved",
      //       success: true,
      //       data: data,
      //     });
      //   })
      //   .catch((message) => {
      //     logger.error("Labels Not found");
      //     res.status(404).send({
      //       message: message,
      //       success: false,
      //     });
      //   });
      labelService.getLabelById(id, resolve, reject);
      function resolve(data) {
        logger.info("label Note Found Successfully");
        return res.send({
          success: true,
          message: "label Note Found Successfully",
          data: data,
        });
      }
      function reject() {
        logger.error("label id note found");
        return res.send({
          message: "label Id Not Found In Database",
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
   * updateLabelById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateLabelById = (req, res) => {
    try {
      const updateLabel = {
        id: req.params.id,
        userId: req.userData.id,
        labelName: req.body.labelName,
      };
      // check validation user body
      const validationUpdateLabel = validation.UpdateLabel.validate(updateLabel);

      if (validationUpdateLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationUpdateLabel,
        });
      }
      labelService.updateLabelById(updateLabel, resolve, reject);
      function resolve(data) {
        logger.info("Label Updated Successfully");
        return res.status(201).send({
          message: "Label Updated Successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("Label Not Updated or LabelId Is Not Match");
        return res.status(400).json({
          message: "Label Not Updated or LabelId Is Not Match",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Server Error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  /**
   * deleteLabelById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deleteLabelById = async (req, res) => {
    try {
      const id = { userId: req.userData.id, labelId: req.params.id };
      // check validation user body
      const validationDeleteLabel = validation.DeleteLabelById.validate(id);

      if (validationDeleteLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationDeleteLabel,
        });
      }
      // const data = await labelService.deleteLabelById(id);
      // if (data.message) {
      //   return res.status(400).json({
      //     message: "label not found",
      //     success: false,
      //   });
      // }
      // return res.status(200).json({
      //   message: "label Deleted succesfully",
      //   success: true,
      //   data: data,
      // });
      await labelService.deleteLabelById(id, (error, data) => {
        if (error) {
          return res.send({ success: false, message: "Label Not Deleted!", data: error });
        } else {
          logger.info("Label Deleted Successfully");
          return res.send({ success: true, message: "Label Deleted!" });
        }
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
        data: err,
      });
    }
  };
}
module.exports = new Labels();
