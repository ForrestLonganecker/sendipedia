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

  describe('GET /users/signin', () => {
    it('should render a view with a sign in form', (done) => {
      request.get(`${base}signin`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Sign in');
        done();
      });
    });
  });

  describe('standard user actions', () => {

    beforeEach((done) => {
      this.activeUser;

      User.create({
        name: 'Rocky Limber',
        email: 'rocky@climb.com',
        password: '123456',
        role: 'standard'
      })
      .then((user) => {
        this.activeUser = user;

        request.get({
          url: 'http://localhost:3000/auth/fake',
          form: {
            name: user.name,
            email: user.email,
            role: user.role,
            userId: user.id
          }
        }, 
          (err, res, body) => {
            done();
          }
        );
      });
    });
    

    describe('GET /users/upgrade', () => {
      it('should render a view with an upgrade form', (done) => {
        request.get(`${base}upgrade`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain('Upgrade to a Premium account')
          expect(body).toContain('Downgrade your account to Standard')
          done();
        });
      });
    });

    describe('POST /users/promote', () => {
      it('should promote the user to premium and redirect to homepage', (done) => {
        request.post(`${base}promote`, (err, res, body) => {
          User.findByPk(this.activeUser.id)
          .then((user) => {
            expect(err).toBeNull();
            expect(user.name).toBe('Rocky Limber');
            expect(user.role).toBe('premium');
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });

    describe('POST /users/demote', () => {
      it('should promote the user to premium and redirect to homepage', (done) => {
        request.post(`${base}demote`, (err, res, body) => {
          User.findByPk(this.activeUser.id)
          .then((user) => {
            expect(err).toBeNull();
            expect(user.name).toBe('Rocky Limber');
            expect(user.role).toBe('standard');
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });

    // END OF STANDARD SUITE
  })



  // end of test suite
});
