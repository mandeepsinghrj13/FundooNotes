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
    labels: {
      type: [String],
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
      Note.findOne({ _id: id.noteId, userId: id.userId })
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * updateNoteById
   * @param {*} updatedNote
   * @returns
   */
  updateNoteById = (updatedNote) => {
    return new Promise((resolve, reject) => {
      Note.findByIdAndUpdate(
        updatedNote.id,
        { title: updatedNote.title, description: updatedNote.description },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch(() => reject());
    });
  };

  /**
   * deleteNoteById
   * @param {*} id
   * @returns
   */
  deleteNoteById = (notedata, callback) => {
    Note.findOneAndDelete({ _id: notedata.noteId, userId: notedata.userId }, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * add Label To Note
   * @param {*} notesId
   * @param {*} labelData
   * @returns
   */
  async addLabelToNote(notesId, labelData) {
    try {
      return await Note.findByIdAndUpdate(notesId, { $push: { labels: { $each: labelData.labelId } } }, { new: true });
    } catch (error) {
      return error;
    }
  }

  async deleteLabelFromNote(notesId, labelData) {
    try {
      return await Note.findByIdAndUpdate(notesId, { $pull: { labels: labelData.labelId[0] } }, { new: true });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new Model();
