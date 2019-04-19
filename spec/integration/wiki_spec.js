const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/wikis';

const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require('../../src/db/models').Wiki

describe('routes : wikis', () => {
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
        done();
      })
    });
  });

  describe('GET /wikis', () => {
    it('should return a status code of 200, and all wikis', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('Wikis');
        expect(body).toContain('Carver');
        done();
      });
    });
  });

  describe('GET /topics/new', () => {
    fit('should render a new wiki form', (done) =>  {
      request.get(`${base}/new`, (err, res, next) => {
        expect(err).toBeNull();
        expect(body).toContain('New Wiki');
        done();
      });
    });

  });



  // end of test suite
});