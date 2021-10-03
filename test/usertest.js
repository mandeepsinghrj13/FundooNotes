const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const userInputs = require("./usertest.json");
chai.should();
chai.use(chaiHttp);
/**
 * {describe} Registration for positive and negative
 * {request} heat server.js file and connect to port and database
 * {post} connect the user.router.js file and heat /register
 * {send} registrationDetails geting into the json file
 *
 */
describe("registration for positive and negative ", () => {
  /**
   * it function for registration when key and value is proper with regex validation .
   *
   * */
  it("GivenRegistrationDetails_WhenProper_UserRegistered_Successfully", (done) => {
    const registrationDetails = userInputs.user.registration;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("User Data Inserted successfully");
        done();
      });
  });
  it.only("GivenRegistrationDetails_WhenProper_UserRegistered_Already Exist", (done) => {
    const registrationDetails = userInputs.user.registration;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(409);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Already exist User");
        done();
      });
  });
  /**
   * it function for registration when lastname not writen .
   *
   * */
  it.only("GivenRegistrationDetails_WhenNo_LastNameInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNolastName;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen email.
   * */
  it.only("GivenRegistrationDetails_WhenNo_EmailInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoemailId;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  /**
   * it function for registration when user not writen Password.
   * */
  it.only("GivenRegistrationDetails_WhenNo_PasswordInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoPassword;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Firstname atlist twoLetter.
   * */
  it.only("GivenRegistrationDetails_When_FirstnameatlisttwoLetter", (done) => {
    const registrationDetails =
      userInputs.user.registrationfirstnameatlisttwoLetter;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Firstname SecondLetterShouldLower.
   * */
  it.only("GivenRegistrationDetails_When_FirstnameSecondLetterShouldLower", (done) => {
    const registrationDetails =
      userInputs.user.RegistrationFirstnameSecondLetterShouldLower;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Email DotCom ShouldLowerLatter.
   * */
  it.only("GivenRegistrationDetails_When_EmailDotComShouldLowerLatter", (done) => {
    const registrationDetails =
      userInputs.user.RegistrationEmailComShouldLowerLatter;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Email StartWith TwoLetter.
   * */
  it.only("GivenRegistrationDetails_When_EmailStartWithTwoLetter", (done) => {
    const registrationDetails =
      userInputs.user.RegistrationEmailStartWithTwoLetter;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Password Atlist OneUpperLetter.
   * */
  it.only("GivenRegistrationDetails_When_PasswordAtlistOneUpperLetter", (done) => {
    const registrationDetails =
      userInputs.user.RegistrationPasswordAtlistOneUpperLetter;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for registration when user not writen Password Atlist OneLowerLetter.
   * */
  it.only("GivenRegistrationDetails_When_PasswordAtlistOneLowerLetter", (done) => {
    const registrationDetails =
      userInputs.user.RegistrationPasswordAtlistOneLowerLetter;
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
});

describe("login for positive and negative ", () => {
  /**
   * it function for login when key and value is proper with regex validation .
   */
  it.only("GivenLoginDetails_WhenProper_UserLogin_Successfully", (done) => {
    const loginDetails = userInputs.user.login;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("loging successfully");
        done();
      });
  });
  /**
   * it function for login when user login with Wrong Password.
   * */
  it.only("GivenLoginDetails_When_WrongPassword", (done) => {
    const loginDetails = userInputs.user.loginWrongPassword;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("User login failed");
        done();
      });
  });
  /**
   * it function for login when user login with Without Password.
   * */
  it.only("GivenLoginDetails_WhenNo_Password", (done) => {
    const loginDetails = userInputs.user.loginWithoutPassword;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user login With Wrong Email.
   * */
  it.only("GivenLoginDetails_WhenWrongEmail", (done) => {
    const loginDetails = userInputs.user.loginWithWrongEmail;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login With Out Email.
   * */
  it.only("GivenLoginDetails_WhenLoginWithOutEmail", (done) => {
    const loginDetails = userInputs.user.LoginWithOutEmail;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login With InvalidEmail.
   * */
  it.only("GivenLoginDetails_WhenLoginWithInvalidEmail", (done) => {
    const loginDetails = userInputs.user.LoginWithInvalidEmail;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login Should Atlist TwoLetter.
   * */
  it.only("GivenLoginDetails_WhenLoginShouldAtlistTwoLetter", (done) => {
    const loginDetails = userInputs.user.LoginShouldAtlistTwoLetter;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login Password Atlist One SpecialCharacters.
   * */
  it.only("GivenLoginDetails_When_LoginPasswordAtlistOneSpecialCharacters", (done) => {
    const loginDetails =
      userInputs.user.LoginPasswordAtlistOneSpecialCharacters;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login Password Atlist OneLowerCharacter.
   * */
  it.only("GivenLoginDetails_WhenLoginPasswordAtlistOneLowerCharacter", (done) => {
    const loginDetails = userInputs.user.LoginPasswordAtlistOneLowerCharacter;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user Login Password Atlist OneNumaricNumber .
   * */
  it.only("GivenLoginDetails_WhenLoginPasswordAtlistOneNumaricNumber", (done) => {
    const loginDetails = userInputs.user.LoginPasswordAtlistOneNumaricNumber;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
});

describe("forgetpassword for positive and negative ", () => {
  /**
   * it function for forgetpassword when email was proper with regex validation .
   */
  it("GivenForgetPasswordDetails_WhenProper_UserEmail_Successfully", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.ProperEmail;
    chai
      .request(server)
      .put("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  /**
   * it function for forgetpassword when email not proper user email with regex validation .
   */
  it.only("GivenForgetPasswordDetails_WhenNotProper_UserEmail", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.NotProperEmail;
    chai
      .request(server)
      .put("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(409);
        done();
      });
  });
  /**
   * it function for forgetpassword when email was not proper without @ regex validation .
   */
  it.only("GivenForgetPasswordDetails_WhenNotProper_UserEmail_ItShould_Have__@__", (done) => {
    const forgetPasswordDetails =
      userInputs.forgetpassworduser.NotProperEmailJoiValidation;
    chai
      .request(server)
      .put("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  /**
   * it function for forgetpassword when user email atlist two characters .
   */
  it.only("GivenForgetPasswordDetails_WhenNotProper_UserEmail_Atlist_TwoCharacters", (done) => {
    const forgetPasswordDetails =
      userInputs.forgetpassworduser.NotProperEmailJoiValidationAtListTwo;
    chai
      .request(server)
      .put("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  /**
   * it function for forgetpassword When Not Proper user email and email was different in db .
   */
  it.only("GivenForgetPasswordDetails_WhenNotProper_UserEmail_WasDifferent", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.EmailNotExits;
    chai
      .request(server)
      .put("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(409);
        done();
      });
  });
});
