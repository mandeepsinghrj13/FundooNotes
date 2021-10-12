// const logger = require("../Utility/logger");
const noteModel = require("../models/note");
class Service {
  /**
   * createNote
   * @param {*} note
   * @param {*} resolve
   * @param {*} reject
   */
  createNote = (note, resolve, reject) => {
    noteModel
      .createNote(note)
      .then((data) => resolve(data))
      .catch(() => reject());
  };
  //   createNote = (note, callback) => {
  //     noteModel.createNote(note, (error, data) => {
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
   * @param {*} resolve
   * @param {*} reject
   */

  getNote = (id, resolve, reject) => {
    noteModel
      .getNote(id)
      .then((data) => resolve(data))
      .catch(() => reject());
  };
  //   getNote = (id, callback) => {
  //     noteModel.getNote(id, (err, data) => {
  //       if (err) {
  //         return callback(err, null);
  //       } else {
  //         return callback(null, data);
  //       }
  //     });
  //   };
}
module.exports = new Service();
