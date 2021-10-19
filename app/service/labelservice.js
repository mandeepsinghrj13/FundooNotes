const labelModel = require("../models/labelmodel");
const redisjs = require("../Utility/redis");
class LabelService {
  /**
   * createLabel
   * @param {*} label
   * @param {*} resolve
   * @param {*} reject
   */
  createLabel = (label, resolve, reject) => {
    labelModel
      .createLabel(label)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
   * getLabel
   * @param {*} id
   * @param {*} resolve
   * @param {*} reject
   */
  getLabel = (id, resolve, reject) => {
    labelModel
      .getLabel(id)
      .then((data) => {
        redisjs.setData("getAllLabels", 120, JSON.stringify(data));
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * getLabelById
   * @param {*} id
   * @param {*} resolve
   * @param {*} reject
   */
  getLabelById = (id, resolve, reject) => {
    labelModel
      .getLabelById(id)
      .then((data) => {
        redisjs.setData("getLabelById", 180, JSON.stringify(data));
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * updateLabelById
   * @param {*} updateLabel
   * @param {*} resolve
   * @param {*} reject
   */
  updateLabelById = (updateLabel, resolve, reject) => {
    labelModel
      .updateLabelById(updateLabel)
      .then((data) => {
        redisjs.clearCache("updateLabelById");
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * deleteLabelById
   * @param {*} id
   * @returns
   */
  deleteLabelById = async (id) => {
    try {
      return await labelModel.deleteLabelById(id);
    } catch (err) {
      return err;
    }
  };
}
module.exports = new LabelService();
