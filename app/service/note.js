const logger = require("../Utility/logger");
const noteModel = require("../models/note");
class Service {
  /**
   * createNote
   * @param {*} note
   * @param {*} callback
   */
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };
}
module.exports = new Service();
