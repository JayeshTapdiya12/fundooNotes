import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes'
import app from '../../src/index';




let token;
let noteId;

before(async (done) => {
  const clearCollections = async () => {
    for (const collection in mongoose.connection.collections) {
      await mongoose.connection.collections[collection].deleteOne(() => { });
    }
  };

  const mongooseConnect = async () => {
    await mongoose.connect(process.env.DATABASE_TEST);
    await clearCollections();
  };

  if (mongoose.connection.readyState === 0) {
    mongooseConnect();
  } else {
    clearCollections();
  }

  done();
});

describe('User APIs Test', () => {


  describe('POST /users/sign', () => {
    it('it should status for 201 for a new user', async () => {

      const userDetails = {
        name: 'test',
        lname: 'hello',
        email: 'hello@gmail.com',
        password: 'hello@123'
      }
      const res = await request(app)
        .post('/api/v1/users/sign')
        .send(userDetails);
      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      token = res.body.token;
    });

    // it('For invalid user it should return 400 error', async () => {
    //   const userDetails = {
    //     name: 996,
    //     lname: 'hello',
    //     email: 'heo@gmail.com',
    //     password: 'hello@123'
    //   }
    //   const res = await request(app)
    //     .post('/api/v1/users/sign')
    //     .send(userDetails);

    //   expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

    // })
  });

  describe('POST /users/login', () => {
    it('should return status 200 for valid login', async () => {
      const userDetails = {
        email: "hello@gmail.com",
        password: 'hello@123'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
      token = res.body.data;
    });

    it('should return status 400 for invalid login details', async () => {
      const userDetails = {
        email: 1000,
        password: '123456'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });

  });

});


describe('Notes Api test', () => {
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/note')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Note', description: 'This is a test note' });

    noteId = res.body.data._id;
  });

  describe('GET /notes', async () => {
    const res = await request(app)
      .get('/api/v1/note')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).to.be.equal(HttpStatus.OK);
  });

  describe('Post /api/v1/note', () => {
    it('it should create new note', async () => {
      const createnote = {
        title: "hello",
        description: "test for integration testing",
        color: "red"
      }
      const res = await request(app)
        .post('/api/v1/note/')
        .set('Authorization', `Bearer ${token}`)
        .send(createnote)

      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      noteId = res.body.data._id
    })
    it('should return status 400 for in valid status', async () => {
      const createnote = {
        title: 456,
        description: "test for integration testing",
        color: "red"
      }
      const res = await request(app)
        .post('/api/v1/note/')
        .set('Authorization', `Bearer ${token}`)
        .send(createnote)
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    })
  });

  describe('GET /note/:_id', () => {
    it('it should return the note by id', async () => {
      const res = await request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).to.be.equal(HttpStatus.OK);
      expect(res.body.data).to.have.property('_id').that.equals(noteId);
    })
    it('should return 404 for non-existent note', async () => {
      const invalidId = mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/v1/notes/${invalidId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
    });
  })




  describe('PUT /note/:_id', () => {
    it('it show to update the note', async () => {
      const note = {
        title: "new title"
      }
      const res = await request(app)
        .put(`/api/v1/note/${noteId}`)
        .send(note)
        .set('Authorization', `bearer ${token}`)

      expect(res.statusCode).to.equal(HttpStatus.OK);
      expect(res.body.data).to.have.property("title").that.equals('new title');
    })
    it('should return status 400 for invalid note data', async () => {
      const invalidNote = {
        title: 123,
      };

      const res = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .send(invalidNote)
        .set('Authorization', `Bearer ${token}`)


      expect(res.statusCode).to.equal(HttpStatus.BAD_REQUEST)
    });
  });



  describe('PATCH /note/colour/:_id', () => {
    it('should update the color of a note', async () => {
      const res = await request(app)
        .patch(`/api/v1/note/${noteId}/color`)
        .set('Authorization', `Bearer ${token}`)
        .send({ color: "yellow" });

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
      expect(res.body.data.color).to.be.equal('yellow');
    });

    it('should return status 400 for invalid colour', async () => {
      const res = await request(app)
        .patch(`/api/v1/note/${noteId}/color`)
        .set('Authorization', `Bearer ${token}`)
        .send({ color: 9999999 });

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
  });

  // describe('DELETE /notes/:_id', () => {
  //   it('should delete a note', async () => {
  //     const res = await request(app)
  //       .delete(`/api/v1/note/${noteId}`)
  //       .set('Authorization', 'Bearer ${token}')

  //     expect(res.statusCode).to.be.equal(HttpStatus.OK);
  //   });

  // it('should return status 404 for  note not present', async () => {
  //   const notId = mongoose.Types.ObjectId();
  //   const res = await request(app)
  //     .delete(`/api/v1/note/${notId}`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
  // });
  // });

})

