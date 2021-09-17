const mongoose = require("mongoose");
const url = process.env.URL;
class DbConnection {
  database = () => {
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
  };
}
module.exports = new DbConnection();
