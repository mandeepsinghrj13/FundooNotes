/* eslint-disable prefer-promise-reject-errors */
const mongoose = require("mongoose");
const labelSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    labelName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", labelSchema);
class LabelModel {
  /**
   * createLabel
   * @param {*} info
   * @returns
   */
  createLabel = (info) => {
    return new Promise((resolve, reject) => {
      const label = new Label({
        userId: info.userId,
        labelName: info.labelName,
      });
      label
        .save()
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * getLabel
   * @param {*} id
   * @returns
   */
  getLabel = (id) => {
    return new Promise((resolve, reject) => {
      Label.find({ userId: id.id })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * getLabelById
   * @param {*} id
   * @returns
   */
  getLabelById = (id) => {
    return new Promise((resolve, reject) => {
      Label.find({ _id: id.noteId, userId: id.userId })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };
}
module.exports = new LabelModel();
