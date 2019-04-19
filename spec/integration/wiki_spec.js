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

  describe('GET /wikis/:id', () => {
    it('should render a view with the selected wiki', (done) => {
      request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Carver');
        expect(body).toContain('The moss factory');
        done();
      });
    });
  });

  describe('GET /wikis/:id/edit', () => {
    it('should render a view with an edit topic form', (done) => {
      request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Wiki');
        expect(body).toContain('Carver');
        expect(body).toContain('The moss factory');
        done();
      });
    });
  });

  describe('POST /wikis/create', () => {
    const options = {
      url:`${base}/create`,
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

  describe('POST /wikis/:id/destroy', () => {
    it('should delete the wiki with the associated ID', (done) => {
      Wiki.findAll()
      .then((wikis) => {
        const wikiCountBeforeDelete = wikis.length;
        expect(wikiCountBeforeDelete).toBe(1);

        request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
          Wiki.findAll()
          .then((wikis) => {
            expect(err).toBeNull();
            expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });

  // end of test suite
});