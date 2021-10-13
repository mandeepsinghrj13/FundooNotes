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
}
module.exports = new LabelService();
