/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const noteInputs = require("./crudtest.json");

chai.use(chaiHttp);
chai.should();

describe("create note api for positive and negative test case", () => {
  it("GivenNotesDetails_When_Note_Created_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenNotesDetails_When_Your_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenNotesDetails_When_Your_Title_And_Description_Is_Empty_BadRequest", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const createNotes = noteInputs.notes.EmptyTitleAndDis;
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("get all note api for positive and negative test case", () => {
  it("GivenGetAllNotesDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    chai
      .request(server)
      .get("/getnotes")
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

describe("get note by id api for positive and negative test case", () => {
  it("GivenGetNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_And_Id_Both_Are_Ok", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Is_Invalid", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.InvalidId;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.EmptyId;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("update note by id api for positive and negative test case", () => {
  it("GivenUpdateNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_And_Id_Both_Are_Ok", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Id_Is_Invalid", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById_InvalidId;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById_EmptyId;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});
describe("delete note by id api for positive and negative test case", () => {
  it.skip("GivenDeleteNoteByIdDetails_When_Note_Deleted_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenote/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById_EmptyId;
    chai
      .request(server)
      .delete(`/deletenote/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("add label into note api for positive and negative test case", () => {
  it("GivenAddLabelToNoteDetails_When_AddedNote_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const addLabelIntoNote = noteInputs.notes.NotesIdAndLabelId;
    chai
      .request(server)
      .put("/addLabel")
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenAddLabelToNoteDetails_When_AddNote_TokenExpiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const addLabelIntoNote = noteInputs.notes.NotesIdAndLabelId;
    chai
      .request(server)
      .put("/addLabel")
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenAddLabelToNoteDetails_When_NotesId_And_LabelId_Is_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const addLabelIntoNote = noteInputs.notes.NotesIdAndLabelIdIsEmpty;
    chai
      .request(server)
      .put("/addLabel")
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenAddLabelToNoteDetails_When_TokenExpiered_NotesId_And_LabelId_Is_Empty", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const addLabelIntoNote = noteInputs.notes.NotesIdAndLabelIdIsEmpty;
    chai
      .request(server)
      .put("/addLabel")
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

describe("get redis note by id api for positive and negative test case", () => {
  it("GivenGetRedisNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetRedisById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetRedisNoteByIdDetails_When_Note_RedisGet_SortTime_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetRedisById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
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

describe("update redis note by id api for positive and negative test case", () => {
  it("GivenUpdateRedisNoteByIdDetails_When_Note_Update_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.RadisUpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenGetRedisNoteByIdDetails_When_After_Update_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.AfterUpdateGetRedisById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetRedisNoteByIdDetails_When_Note_After_Update_RedisGet_SortTime_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.AfterUpdateGetRedisById;
    chai
      .request(server)
      .get(`/getnote/${id}`)
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
