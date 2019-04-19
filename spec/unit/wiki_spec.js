const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require('../../src/db/models').Wiki;
const User = require('../../src/db/models').User;

describe('Wiki', () => {
  beforeEach((done) => {
    this.wiki;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        name: 'Cliff Smith',
        email: 'rock@climb.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;

        Wiki.create({
          title: 'Carver',
          body: 'The moss factory',
          private: false,
          userId: this.user.id
        })
        .then((wiki) => {
          this.wiki = wiki;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe('#create()', () => {
    it('should create a new wiki with a title, body that is not private and has associated user', (done) => {
      Wiki.create({
        title: 'Ozone',
        body: 'awesome crag close to town',
        private: false,
        userId: this.user.id
      })
      .then((wiki) => {
          expect(wiki.title).toBe('Ozone');
          expect(wiki.body).toBe('awesome crag close to town');
          expect(wiki.private).toBeFalsy();
          expect(wiki.userId).toBe(this.user.id);
          done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });


    it('should not create a wiki with a missing title, body, or private desgnation', (done) => {
      Wiki.create({
        // empty wiki
      })
      .then((wiki) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Wiki.title cannot be null");
        expect(err.message).toContain("Wiki.body cannot be null");
        expect(err.message).toContain("Wiki.private cannot be null");
        done();
      });
    });
  });

  describe('#setUser()', () => {
    it('should associate a wiki and a user together', (done) => {
      User.create({
        name: 'gumby',
        email: 'rawk@lime.com',
        password: '123456'
      })
      .then((newUser) => {
        expect(this.wiki.userId).toBe(this.user.id);

        this.wiki.setUser(newUser)
        .then((wiki) => {
          expect(this.wiki.userId).toBe(newUser.id)
          done();
        });
      });
    });
  });

  describe('#getUser()', () => {
    it('should return the associated user', () => {
      this.wiki.getUser()
      .then((associatedUser) => {
        expect(associatedUser.name).toBe('Cliff Smith');
        done();
      });
    });
  });
  

  // end of test suite
})