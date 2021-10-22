/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const labelInputs = require("./labeltest.json");

chai.use(chaiHttp);
chai.should();

describe("create label api for positive and negative test case", () => {
  it("GivenLabelDetails_When_Label_Created_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenLabelDetails_When_Label_Token_Expiered", (done) => {
    const token = labelInputs.label.TokenExpiered;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenLabelDetails_When_Label_Name_Empty", (done) => {
    const token = labelInputs.label.loginValidToken;
    const createLabel = {
      labelName: "",
    };
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("get all label api for positive and negative test case", () => {
  it("GivenGetAllLabelDetails_When_Label_GetAll_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    chai
      .request(server)
      .get("/getlabels")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenGetAllLabelDetails_When_GetAll_Label_Token_Expiered", (done) => {
    const token = labelInputs.label.TokenExpiered;
    chai
      .request(server)
      .get("/getlabels")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetAllLabelDetails_When_Label_Name_Empty", (done) => {
    const token = labelInputs.label.EmptyToken;
    chai
      .request(server)
      .get("/getlabels")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

describe("get label by id api for positive and negative test case", () => {
  it("GivenGetLabelByIdDetails_When_Label_GetById_Geting_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.GetById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetLabelByIdDetails_When_GetLabel_ById_Token_Expiered", (done) => {
    const token = labelInputs.label.TokenExpiered;
    const id = labelInputs.label.GetById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetLabelByIdDetails_When_Label_Name_Empty", (done) => {
    const token = labelInputs.label.EmptyToken;
    const id = labelInputs.label.GetById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
describe("update label by id api for positive and negative test case", () => {
  it("GivenUpdateLabelByIdDetails_When_Label_Update_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.UpdateById;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateLabelByIdDetails_When_Label_Token_Expiered", (done) => {
    const token = labelInputs.label.TokenExpiered;
    const id = labelInputs.label.UpdateById;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenUpdateLabelByIdDetails_When_Label_Name_Empty", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.UpdateById;
    const createLabel = {
      labelName: "",
    };
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("delete label by id api for positive and negative test case", () => {
  it.skip("GivendeleteLabelByIdDetails_When_Label_delete_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.DeleteById;
    chai
      .request(server)
      .delete(`/deletelabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenDeleteLabelByIdDetails_When_Label_Token_Expiered", (done) => {
    const token = labelInputs.label.TokenExpiered;
    const id = labelInputs.label.DeleteById;
    chai
      .request(server)
      .delete(`/deletelabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenDeleteLabelByIdDetails_When_Label_Id_Empty", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.EmptyId;
    chai
      .request(server)
      .delete(`/deletelabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("get redis label by id api for positive and negative test case", () => {
  it.only("GivenGetRedisLabelByIdDetails_When_Label_GetById_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.RedisGetById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it.only("GivenGetRedisLabelByIdDetails_When_RedisLabel_SortTime_GetById_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.RedisGetById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});

describe("update redis label by id api for positive and negative test case", () => {
  it.only("GivenUpdateRedisLabelByIdDetails_When_Label_Update_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.RedisUpdateById;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it.only("GivenGetRedisLabelByIdDetails_When_Label_GetById_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.RedisUpdateById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it.only("GivenGetRedisLabelByIdDetails_When_RedisLabel_SortTime_GetById_Successfully", (done) => {
    const token = labelInputs.label.loginValidToken;
    const id = labelInputs.label.RedisUpdateById;
    chai
      .request(server)
      .get(`/getlabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
