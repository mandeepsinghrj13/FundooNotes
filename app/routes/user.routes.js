const controller = require("../controllers/user.controller.js");
const helper = require("../Utility/helper");
const noteController = require("../controllers/note.js");
const labelController = require("../controllers/labelcontroller.js");
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
  // put update note by id
  app.put("/updatenotes/:id", helper.verifyToken, noteController.updateNoteById);
  // delete delete note by id
  app.delete("/deletenote/:id", helper.verifyToken, noteController.deleteNoteById);
  // post create label
  app.post("/createlabel", helper.verifyToken, labelController.createLabel);
  // get Get All label
  app.get("/getlabels", helper.verifyToken, labelController.getLabel);
  // get Get label by id
  app.get("/getlabel/:id", helper.verifyToken, labelController.getLabelById);
  // put update label by id
  app.put("/updatelabel/:id", helper.verifyToken, labelController.updateLabelById);
};
