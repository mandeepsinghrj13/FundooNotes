/* eslint-disable prefer-promise-reject-errors */
// const logger = require("../Utility/logger");
const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
class Model {
  /**
   * createNote
   * @param {*} info
   * @returns
   */
  createNote = (info) => {
    return new Promise((resolve, reject) => {
      const note = new Note({
        userId: info.userId,
        title: info.title,
        description: info.description,
      });
      note
        .save()
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };
  //   createNote = (info, callback) => {
  //     const note = new Note({
  //       userId: info.userId,
  //       title: info.title,
  //       description: info.description,
  //     });
  //     note.save((error, data) => {
  //       if (error) {
  //         logger.error(error);
  //         return callback(error, null);
  //       } else {
  //         return callback(null, data);
  //       }
  //     });
  //   };
  /**
   * getNote
   * @param {*} id
   * @returns
   */

  getNote = (id) => {
    return new Promise((resolve, reject) => {
      Note.find({ userId: id.id })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };
  /**
   * getNoteById
   * @param {*} id
   * @returns
   */

  getNoteById = (id) => {
    return new Promise((resolve, reject) => {
      Note.find({ _id: id.noteId, userId: id.userId })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };
}
module.exports = new Model();
