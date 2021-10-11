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
          logger.error("failed to post note");
          return res.status(400).json({
            message: "failed to post note",
            success: false,
          });
        } else {
          logger.info("Successfully inserted note");
          return res.status(201).send({
            message: "Successfully inserted note",
            success: true,
            data: data,
          });
        }
      });
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
}
module.exports = new Note();
