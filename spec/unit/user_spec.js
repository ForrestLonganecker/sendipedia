const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('User', () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('#create()', () => {
    it('should create a User object with a valid email and password', (done) => {
      User.create({
        name: 'Cliff Smith',
        email: 'rock@climb.com',
        password: '123456'
      })
      .then((user) => {
        expect(user.email).toBe('rock@climb.com');
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it('should not create a User with invalid email/password', (done) => {
      User.create({
        name: 'namey name',
        email: 'some joker',
        password: ''
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('Validation error: must be a valid email');
        done();
      });
    });

    it('should not create a User with email already taken', (done) => {
      User.create({
        name: 'cliff smith',
        email: 'rock@climb.com',
        password: '123456'
      })
      .then((user) => {
        User.create({
          name: 'elda rado',
          email: 'rock@climb.com',
          password: '123456'
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain('Validation error');
          done();
        });
      });
    });
  });

  
// END OF TEST SUITE
});