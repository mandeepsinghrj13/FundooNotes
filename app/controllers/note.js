const noteService = require("../service/note");
const logger = require("../Utility/logger");

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
  //   createNote = (req, res) => {
  //     try {
  //       const note = {
  //         userId: req.userData.id,
  //         title: req.body.title,
  //         description: req.body.description,
  //       };
  //       noteService.createNote(note, (error, data) => {
  //         if (error) {
  //           logger.error("fail the createnote");
  //           return res.status(400).json({
  //             message: "fail the createnote",
  //             success: false,
  //           });
  //         } else {
  //           logger.info("Successfully create note");
  //           return res.status(201).send({
  //             message: "Successfully create note",
  //             success: true,
  //             data: data,
  //           });
  //         }
  //       });
  //     } catch {
  //       logger.error("Internal server error");
  //       return res.status(500).json({
  //         message: "Internal server error",
  //         success: false,
  //       });
  //     }
  //   };

  /**
   * getnote
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNote = (req, res) => {
    try {
      const id = { id: req.userData.id };
      noteService.getNote(id, resolve, reject);
      function resolve(data) {
        logger.info("Get All Notes successfully");
        return res.status(201).json({
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
        return res.send();
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
      noteService.updateNoteById(updateNote, resolve, reject);
      function resolve(data) {
        logger.info("Note Updated Successfully");
        return res.status(201).send({
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

  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.userData.id, noteId: req.params.id };
      const data = await noteService.deleteNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: "Note not found",
          success: false,
        });
      }
      logger.info("Note Delete succesfully");
      return res.status(200).json({
        success: true,
        message: "Note Delete succesfully",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Note not updated",
        data: err,
      });
    }
  };
}
module.exports = new Note();
