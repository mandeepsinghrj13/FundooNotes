const controller = require("../controllers/user.controller.js");
const helper = require("../Utility/helper");
const noteController = require("../controllers/note.js");

module.exports = (app) => {
  // Create a new Node
  app.post("/register", controller.register);
  // Post login
  app.post("/login", controller.login);
  // Post forgetpassword
  app.post("/forgetPassword", controller.forgetPassword);
  // Post resetpassword
  app.post("/resetpassword", helper.verifyTokenforreset, controller.resetPassword);
  // Post createnotes
  app.post("/createnotes", helper.verifyToken, noteController.createNote);
  // get all notes
  app.get("/getnotes", helper.verifyToken, noteController.getNote);
  // get note by id
  app.get("/getnote/:id", helper.verifyToken, noteController.getNoteById);
  app.put("/updatenotes/:id", helper.verifyToken, noteController.updateNoteById);
};
