const labelModel = require("../models/labelmodel");
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
      .then((data) => resolve(data))
      .catch(() => reject());
  };
}
module.exports = new LabelService();
