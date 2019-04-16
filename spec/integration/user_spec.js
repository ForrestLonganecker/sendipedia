const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const base = 'http://localhost:3000/users/';

const User = require('../../src/db/models').User;

describe('routes : users', () => {
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

    describe('GET /users/signup', () => {
        it('should render a view with a sign up form', (done) => {
            request.get(`${base}signup`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('Welcome to Sendipedia');
                done();
            })
        })
    })


});