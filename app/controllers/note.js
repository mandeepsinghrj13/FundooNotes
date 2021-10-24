const noteService = require("../service/note");
const logger = require("../Utility/logger");
const validation = require("../Utility/validation.js");
// const redisjs = require("../Utility/redis");

class Note {
  /**
   * createNote
   * @param {*} req
   * @param {*} res
   * @returns
   */

  createNote = (req, res) => {
    try {
      const note = {
        userId: req.userData.id,
        title: req.body.title,
        description: req.body.description,
      };
      // check validation user body
      const validationCreateNote = validation.createNotes.validate(note);

      if (validationCreateNote.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationCreateNote,
        });
      }
      noteService.createNote(note, resolve, reject);
      function resolve(data) {
        logger.info("Successfully create note");
        return res.status(201).send({
          message: "Successfully create note",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("fail the createnote");
        return res.status(400).json({
          message: "fail the createnote",
          success: false,
        });
      }
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  /**
   * getnote
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNote = (req, res) => {
    try {
      const id = { id: req.userData.id };
      // check validation user body
      const validationGetNote = validation.getNotes.validate(id);

      if (validationGetNote.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationGetNote,
        });
      }

      noteService.getNote(id, resolve, reject);
      function resolve(data) {
        logger.info("Get All Notes successfully");
        return res.status(200).json({
          message: "Get All Notes successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("Failed to get all notes");
        return res.status(400).json({
          message: "failed to get all notes",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };

  /**
   * getnotebyid
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNoteById = (req, res) => {
    try {
      const id = {
        userId: req.userData.id,
        noteId: req.params.id,
      };
      // check validation user body
      const validationGetNoteById = validation.GetNoteById.validate(id);

      if (validationGetNoteById.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationGetNoteById,
        });
      }
      noteService.getNoteById(id, resolve, reject);
      function resolve(data) {
        logger.info("Note Found Successfully");
        return res.send({
          success: true,
          message: "Note Found Successfully",
          data: data,
        });
      }
      function reject() {
        logger.error("id note found");
        return res.send({
          message: "Id Note Found In Database",
        });
      }
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  /**
   * updateNoteById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateNoteById = (req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.userData.id,
        title: req.body.title,
        description: req.body.description,
      };
      // check validation user body
      const validationUpdateNote = validation.UpdateNote.validate(updateNote);

      if (validationUpdateNote.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationUpdateNote,
        });
      }
      noteService.updateNoteById(updateNote, resolve, reject);
      function resolve(data) {
        logger.info("Note Updated Successfully");
        return res.status(201).json({
          message: "Note Updated Successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("Note Not Updated or NoteId Is Not Match");
        return res.status(400).json({
          message: "Note Not Updated or NoteId Is Not Match",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Server Error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  /**
   * deleteNoteById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.userData.id, noteId: req.params.id };
      // check validation user body
      const validationDeleteNote = validation.DeleteNoteById.validate(id);

      if (validationDeleteNote.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationDeleteNote,
        });
      }
      await noteService.deleteNoteById(id, (error, data) => {
        if (error) {
          return res.send({ success: false, message: "Note Not Deleted!", data: error });
        } else {
          logger.info("Notes Deleted Successfully");
          return res.send({ success: true, message: "Notes Deleted!" });
        }
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
        data: err,
      });
    }
  };

  /**
   * add Label To Note
   * @param {*} req
   * @param {*} res
   */
  async addLabelToNote(req, res) {
    try {
      const notesId = req.body.notesId;
      const labelData = {
        labelId: [req.body.labelId],
      };

      // check validation user body
      const validationAddLabel = validation.addLabelToNote.validate(req.body);

      if (validationAddLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationAddLabel,
        });
      }
      const addLabelName = await noteService.addLabelToNote(notesId, labelData);
      res.send({
        success: true,
        message: "Label Added Into Note",
        data: addLabelName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Some error while adding label to notes",
      });
    }
  }

  async deleteLabelFromNote(req, res) {
    try {
      const notesId = req.body.notesId;
      const labelData = {
        labelId: [req.body.labelId],
      };
      // check validation user body
      const validationDeleteLabel = validation.DeleteLabel.validate(req.body);

      if (validationDeleteLabel.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationDeleteLabel,
        });
      }
      const addLabelName = await noteService.deleteLabelFromNote(notesId, labelData);
      res.send({
        success: true,
        message: "Label Deleted Into Note",
        data: addLabelName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Some error occurred while deleting label from notes",
      });
    }
  }
}
module.exports = new Note();
