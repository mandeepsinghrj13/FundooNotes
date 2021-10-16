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
      .then((data) => resolve(data))
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
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
   * deleteNoteById
   * @param {*} id
   * @returns
   */
  deleteNoteById = async (id) => {
    try {
      return await noteModel.deleteNoteById(id);
    } catch (err) {
      return err;
    }
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

  async deleteLabelFromNote(notesId, labelData) {
    try {
      return await noteModel.deleteLabelFromNote(notesId, labelData);
    } catch (error) {
      return error;
    }
  }
}
module.exports = new Service();
