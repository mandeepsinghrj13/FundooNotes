const server = require("../server");
const chai = require("chai");
const faker = require("faker");
const chaiHttp = require("chai-http");
const userInputs = require("./usertest.json");
// const error  = require("../app/Utility/logger");
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
    const registrationDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName(),
      email: faker.internet.email(),
      Password: "Password@1234",
    };
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
        res.body.should.have.property("message").eql("User Data Inserted successfully");
        done();
      });
  });
  it("GivenRegistrationDetails_WhenProper_UserRegistered_Already Exist", (done) => {
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
  it("GivenRegistrationDetails_WhenNo_LastNameInDB", (done) => {
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
  it("GivenRegistrationDetails_WhenNo_EmailInDB", (done) => {
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
  it("GivenRegistrationDetails_WhenNo_PasswordInDB", (done) => {
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
  it("GivenRegistrationDetails_When_FirstnameatlisttwoLetter", (done) => {
    const registrationDetails = userInputs.user.registrationfirstnameatlisttwoLetter;
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
  it("GivenRegistrationDetails_When_FirstnameSecondLetterShouldLower", (done) => {
    const registrationDetails = userInputs.user.RegistrationFirstnameSecondLetterShouldLower;
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
  it("GivenRegistrationDetails_When_EmailDotComShouldLowerLatter", (done) => {
    const registrationDetails = userInputs.user.RegistrationEmailComShouldLowerLatter;
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
  it("GivenRegistrationDetails_When_EmailStartWithTwoLetter", (done) => {
    const registrationDetails = userInputs.user.RegistrationEmailStartWithTwoLetter;
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
  it("GivenRegistrationDetails_When_PasswordAtlistOneUpperLetter", (done) => {
    const registrationDetails = userInputs.user.RegistrationPasswordAtlistOneUpperLetter;
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
  it("GivenRegistrationDetails_When_PasswordAtlistOneLowerLetter", (done) => {
    const registrationDetails = userInputs.user.RegistrationPasswordAtlistOneLowerLetter;
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
  //   /**
  //    * it function for login when key and value is proper with regex validation .
  //    */
  it("GivenLoginDetails_WhenProper_UserLogin_Successfully", (done) => {
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
        res.body.should.have.property("message").eql("Loging successfully");
        done();
      });
  });
  /**
   * it function for login when user login with Wrong Password.
   * */
  it("GivenLoginDetails_When_WrongPassword", (done) => {
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
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
  /**
   * it function for login when user login with Without Password.
   * */
  it("GivenLoginDetails_WhenNo_Password", (done) => {
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
  it("GivenLoginDetails_WhenWrongEmail", (done) => {
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
  it("GivenLoginDetails_WhenLoginWithOutEmail", (done) => {
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
  it("GivenLoginDetails_WhenLoginWithInvalidEmail", (done) => {
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
  it("GivenLoginDetails_WhenLoginShouldAtlistTwoLetter", (done) => {
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
  it("GivenLoginDetails_When_LoginPasswordAtlistOneSpecialCharacters", (done) => {
    const loginDetails = userInputs.user.LoginPasswordAtlistOneSpecialCharacters;
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
  it("GivenLoginDetails_WhenLoginPasswordAtlistOneLowerCharacter", (done) => {
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
  it("GivenLoginDetails_WhenLoginPasswordAtlistOneNumaricNumber", (done) => {
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
      .post("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  /**
   * it function for forgetpassword when email not proper user email with regex validation .
   */
  it("GivenForgetPasswordDetails_WhenNotProper_UserEmail", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.NotProperEmail;
    chai
      .request(server)
      .post("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        res.should.have.status(409);
        done();
      });
  });
  /**
   * it function for forgetpassword when email was not proper without @ regex validation .
   */
  it("GivenForgetPasswordDetails_WhenNotProper_UserEmail_ItShould_Have__@__", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.NotProperEmailJoiValidation;
    chai
      .request(server)
      .post("/forgetPassword")
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
  it("GivenForgetPasswordDetails_WhenNotProper_UserEmail_Atlist_TwoCharacters", (done) => {
    const forgetPasswordDetails =
      userInputs.forgetpassworduser.NotProperEmailJoiValidationAtListTwo;
    chai
      .request(server)
      .post("/forgetPassword")
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
   * it function for forgetpassword When Not Proper user email and email was empty in db .
   */
  it("GivenForgetPasswordDetails_WhenNotProper_UserEmail_WasDifferent", (done) => {
    const forgetPasswordDetails = userInputs.forgetpassworduser.EmailNotExits;
    console.log(forgetPasswordDetails);
    chai
      .request(server)
      .post("/forgetPassword")
      .send(forgetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("resetpassword for positive and negative ", () => {
  /**
   * it function for resetpassword when proper password successfully reset .
   */
  it.skip("GivenResetPasswordDetails_WhenProper_Password_Successfully_Reset", (done) => {
    const resetPasswordDetails = userInputs.reset.resetPassword;
    const token = userInputs.reset.tokenOne;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Password reset succesfully");
        done();
      });
  });
  /**
   * it function for resetpassword when token has expiered or wrong .
   */
  it("GivenResetPasswordDetails_When_Token_Has_Expiered_Or_Wrong", (done) => {
    const resetPasswordDetails = userInputs.reset.resetPassword;
    const token = userInputs.reset.tokenTwoInvaild;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  /**
   * it function for resetpassword when token arrayofindex wrong .
   */
  it("GivenResetPasswordDetails_When_Token_ArrayOfIndex_Wrong", (done) => {
    const resetPasswordDetails = userInputs.reset.resetPassword;
    const token = userInputs.reset.tokenInvaild;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
