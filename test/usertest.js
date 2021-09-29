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
  it.skip("GivenRegistrationDetails_WhenProper_UserRegistered_Successfully", (done) => {
    const registrationDetails = userInputs.user.registration;
    // console.log(registrationDetails);
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
  it("GivenRegistrationDetails_When_FirstnameatlisttwoLetter", (done) => {
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
  it("GivenRegistrationDetails_When_FirstnameSecondLetterShouldLower", (done) => {
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
  it("GivenRegistrationDetails_When_EmailDotComShouldLowerLatter", (done) => {
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
  it("GivenRegistrationDetails_When_EmailStartWithTwoLetter", (done) => {
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
  it("GivenRegistrationDetails_When_PasswordAtlistOneUpperLetter", (done) => {
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
  it("GivenRegistrationDetails_When_PasswordAtlistOneLowerLetter", (done) => {
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
        res.body.should.have.property("message").eql("loging successfully");
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
        res.body.should.have.property("message").eql("User login failed");
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
});
