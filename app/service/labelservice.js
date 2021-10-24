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
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
   * getLabelById
   * @param {*} id
   * @param {*} resolve
   * @param {*} reject
   */
  // getLabelById = (id, resolve, reject) => {
  //   labelModel
  //     .getLabelById(id)
  //     .then((data) => {
  //       redisjs.setData(data.id, 180, JSON.stringify(data));
  //       resolve(data);
  //     })
  //     .catch(() => reject());
  // };
  // getLabelById = (id) => {
  //   return new Promise((resolve, reject) => {
  //     labelModel
  //       .getLabelById(id)
  //       .then((data) => {
  //         redisjs.setData(data.id, 3600, JSON.stringify(data));
  //         resolve(data);
  //       })
  //       .catch((message) => {
  //         reject(message);
  //       });
  //   });
  // };
  getLabelById = (id, resolve, reject) => {
    labelModel
      .getLabelById(id)
      .then((data) => {
        redisjs.setData(data.id, 60, JSON.stringify(data));
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
        redisjs.clearCache(data.id);
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * deleteLabelById
   * @param {*} id
   * @returns
   */

  // async deleteLabelById(data) {
  //   const result = await labelModel.deleteLabelById(data);
  //   if (result) {
  //     redisjs.clearCache(result.id);
  //   }
  //   return result;
  // }
  deleteLabelById = async (data, callback) => {
    await labelModel.deleteLabelById(data, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        redisjs.clearCache(data.id);
        return callback(null, data);
      }
    });
  };
}
module.exports = new LabelService();
