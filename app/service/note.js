const noteModel = require("../models/note");
const redisjs = require("../Utility/redis");
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

  /**
   * getNoteById
   * @param {*} id
   * @param {*} callback
   */

  getNoteById = (id, resolve, reject) => {
    noteModel
      .getNoteById(id)
      .then((data) => {
        redisjs.setData(data.id, 60, JSON.stringify(data));
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * updateNoteById
   * @param {*} updateNote
   * @param {*} resolve
   * @param {*} reject
   */
  updateNoteById = (updateNote, resolve, reject) => {
    noteModel
      .updateNoteById(updateNote)
      .then((data) => {
        redisjs.clearCache(data.id);
        resolve(data);
      })
      .catch(() => reject());
  };

  /**
   * deleteNoteById
   * @param {*} id
   * @returns
   */
  deleteNoteById = async (data, callback) => {
    await noteModel.deleteNoteById(data, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        redisjs.clearCache(data.id);
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
      return await noteModel.addLabelToNote(notesId, labelData);
    } catch (error) {
      return error;
    }
  }

  /**
   * deleteLabelFromNote
   * @param {*} notesId
   * @param {*} labelData
   * @returns
   */
  async deleteLabelFromNote(notesId, labelData) {
    try {
      return await noteModel.deleteLabelFromNote(notesId, labelData);
    } catch (error) {
      return error;
    }
  }
}
module.exports = new Service();
