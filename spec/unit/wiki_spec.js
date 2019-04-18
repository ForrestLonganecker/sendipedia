const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require('../../src/db/models').Wiki;

describe('Wiki', () => {
  beforeEach((done) => {
    this.wiki;
    sequelize.sync({force: true}).then((res) => {
      Wiki.create({
        title: 'Carver',
        body: 'The moss factory',
        private: false
      })
      .then((wiki) => {
        this.wiki = wiki;
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  });

  describe('#create()', () => {
    it('should create a new wiki with a title, body that is not private', (done) => {
      Wiki.create({
        title: 'Ozone',
        body: 'awesome crag close to town',
        private: false
      })
      .then((wiki) => {
          expect(wiki.title).toBe('Ozone');
          expect(wiki.body).toBe('awesome crag close to town');
          expect(wiki.private).toBeFalsy();
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




  

  // end of test suite
})