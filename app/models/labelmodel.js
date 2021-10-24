/* eslint-disable prefer-promise-reject-errors */
const mongoose = require("mongoose");
const labelSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    labelName: {
      type: String,
    },
    notesId: {
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
      Label.findOne({ _id: id.noteId, userId: id.userId })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * updateLabelById
   * @param {*} updatedNote
   * @returns
   */
  updateLabelById = (updatedNote) => {
    return new Promise((resolve, reject) => {
      Label.findByIdAndUpdate(updatedNote.id, { labelName: updatedNote.labelName }, { new: true })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * deleteLabelById
   * @param {*} id
   * @returns
   */
  // deleteLabelById = async (id) => {
  //   try {
  //     return await Label.findOneAndDelete({
  //       $and: [{ _id: id.labelId }, { userId: id.userId }],
  //     });
  //   } catch (err) {
  //     return err;
  //   }
  // };
  deleteLabelById = (notedata, callback) => {
    Label.findOneAndDelete({ _id: notedata.labelId, userId: notedata.userId }, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };
}
module.exports = new LabelModel();
