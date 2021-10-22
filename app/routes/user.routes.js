const controller = require("../controllers/user.controller.js");
const helper = require("../Utility/helper");
const noteController = require("../controllers/note.js");
const labelController = require("../controllers/labelcontroller.js");
const redisCache = require("../Utility/redis");
module.exports = (app) => {
  // Create a new Node
  app.post("/register", controller.register);
  // Confirm Register
  app.post("/confirmregister/:token", controller.confirmRegister);
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
  // get note by id   with redis
  app.get("/getnote/:id", helper.verifyToken, redisCache.redisGetById, noteController.getNoteById);
  // put update note by id
  app.put("/updatenotes/:id", helper.verifyToken, noteController.updateNoteById);
  // delete delete note by id
  app.delete("/deletenote/:id", helper.verifyToken, noteController.deleteNoteById);
  // post create label
  app.post("/createlabel", helper.verifyToken, labelController.createLabel);
  // get Get All label
  app.get("/getlabels", helper.verifyToken, labelController.getLabel);
  // get Get label by id with redis
  app.get("/getlabel/:id", helper.verifyToken, redisCache.redisGetLabelById, labelController.getLabelById);
  // put update label by id
  app.put("/updatelabel/:id", helper.verifyToken, labelController.updateLabelById);
  // delete delete note by id
  app.delete("/deletelabel/:id", helper.verifyToken, labelController.deleteLabelById);
  // put add label to note api
  app.put("/addLabel", helper.verifyToken, noteController.addLabelToNote);
  // delete delete label api
  app.delete("/deleteLabel", helper.verifyToken, noteController.deleteLabelFromNote);
};
