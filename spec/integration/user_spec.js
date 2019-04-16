const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const base = 'http://localhost:3000/users/';

const User = require('../../src/db/models').User;

describe('routes : users', () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe('GET /users/signup', () => {
    it('should render a view with a sign up form', done => {
      request.get(`${base}signup`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Welcome to Sendipedia');
        done();
      });
    });
  });

  describe('POST /users', () => {
    it('should create a new user with valid values and redirect', done => {
      const options = {
        url: base,
        form: {
          name: 'Cliff Smith',
          email: 'rock@climb.com',
          password: '123456'
        }
      };
      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: 'rock@climb.com' } })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.name).toBe('Cliff Smith');
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it('should not create a new user with invalid attributes and redirect', done => {
      request.post(
        {
          url: base,
          form: {
            email: 'n/a',
            password: '123456'
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: 'n/a' } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });
});
