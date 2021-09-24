const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const userInputs = require('./usertest.json')
chai.should();
chai.use(chaiHttp);

describe("Registration for positive and negative ", () => {
  it("givenRegistrationDetails_whenProper_UserRegistered_successfully", (done) => {
    const registrationDetails = userInputs.user.registration
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          console.log("error")
        }
        res.should.have.status(201);
        done();
      });
  });
  it("givenRegistrationDetails_whenNo_LastNameInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNolastName
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          console.log("error")
        }
        res.should.have.status(400);
        done();
      });
  });
  it("givenRegistrationDetails_whenNo_emailInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoemailId
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          console.log("error")
        }
        res.should.have.status(400);
        done();
      });
  });
  it("givenRegistrationDetails_whenNo_PasswordInDB", (done) => {
    const registrationDetails = userInputs.user.registrationWithNoPassword
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        if (err) {
          console.log("error")
        }
        res.should.have.status(400);
        done();
      });
  });
});