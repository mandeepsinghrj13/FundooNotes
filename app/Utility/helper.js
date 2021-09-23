//helper.js
const bcrypt = require("bcrypt");
class helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
        return callback("error is hashing", null);
      } else {
        return callback(null, hashpassword);
      }
    });
  };
}
module.exports = new helper();
