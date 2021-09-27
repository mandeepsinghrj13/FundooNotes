const express = require("express");
// const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// connecting to database
const dbConnection = require("./config/database.config.js");
dbConnection.database();

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to FundooNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});
// Require user routes
require("./app/routes/user.routes.js")(app);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port : " + process.env.PORT);
});
module.exports = app;
