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
      noteService.createNote(note, (error, data) => {
        if (error) {
          logger.error("fail the createnote");
          return res.status(400).json({
            message: "fail the createnote",
            success: false,
          });
        } else {
          logger.info("Successfully create note");
          return res.status(201).send({
            message: "Successfully create note",
            success: true,
            data: data,
          });
        }
      });
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
      noteService.getNote(id, (err, data) => {
        if (err) {
          logger.error("Failed to get all notes");
          return res.status(400).json({
            message: "failed to get all notes",
            success: false,
          });
        } else {
          logger.info("Get All Notes successfully");
          return res.status(201).json({
            message: "Get All Notes successfully",
            success: true,
            data: data,
          });
        }
      });
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };
}
module.exports = new Note();
