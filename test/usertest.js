const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const userInputs = require('./usertest.json')
chai.should();
chai.use(chaiHttp);
/**
 * {describe} Registration for positive and negative
 * {request} heat server.js file and connect to port and database
 * {post} connect the user.router.js file and heat /register  
 * {send} registrationDetails geting into the json file
 * 
 */
describe("Registration for positive and negative ", () => {
  /**
   * it function for registration when key and value is proper with regex validation .
   * 
   * */
  it.skip("givenRegistrationDetails_whenProper_UserRegistered_successfully", (done) => {
    const registrationDetails = userInputs.user.registration
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
  it("givenRegistrationDetails_whenProper_UserRegistered_Already exist", (done) => {
    const registrationDetails = userInputs.user.registration
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
        res.body.should.have
          .property("message")
          .eql("Already exist User");
        done();
      });
  });
  /**
   * it function for registration when lastname not writen .
   * 
   * */
  it("givenRegistrationDetails_whenNo_LastNameInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNolastName
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
  it("givenRegistrationDetails_whenNo_emailInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoemailId
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
  it("givenRegistrationDetails_whenNo_PasswordInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoPassword
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

describe("Login for positive and negative ", () => {
  /**
   * it function for login when key and value is proper with regex validation .
   */
  it("givenLoginDetails_whenProper_UserLogin_successfully", (done) => {
    const loginDetails = userInputs.user.login
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
         res.body.should.have
           .property("message")
           .eql("loging successfully");
        done();
      });
  });
  /**
   * it function for login when user login with Wrong Password.
   * */
  it("givenLoginDetails_when_WrongPassword", (done) => {
    const loginDetails = userInputs.user.loginWrongPassword
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if(err){
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
  it("givenLoginDetails_whenNo_Password", (done) => {
    const loginDetails = userInputs.user.loginWithoutPassword
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
  it("givenLoginDetails_whenWrongEmail", (done) => {
    const loginDetails = userInputs.user.loginWithWrongEmail
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if(err){
          return done(err);
      }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
});