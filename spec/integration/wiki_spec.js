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

  describe('GET /wikis/new', () => {
    it('should render a new wiki form', (done) =>  {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Wiki');
        done();
      });
    });

  });

  describe('POST /wikis/create', () => {
    const options = {
      url:`${base}create`,
      form: {
        title: 'Ozone',
        body: 'Lothlorien feel',
        private: false
      }
    };

    it('should create a new wiki and redirect', (done) => {
      request.post(options, (err, res, body) => {
        Wiki.findOne({where: {title: 'Ozone'}})
        .then((wiki) => {
          expect(res.statusCode).toBe(303);
          expect(wiki.title).toBe('Ozone');
          expect(wiki.body).toBe('Lothlorien feel');
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
    });
  });


  // end of test suite
});