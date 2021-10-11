const logger = require("../Utility/logger");
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
   * @param {*} callback
   */
  createNote = (info, callback) => {
    const note = new Note({
      userId: info.userId,
      title: info.title,
      description: info.description,
    });
    note.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };
}
module.exports = new Model();
