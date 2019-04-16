const userQueries = require('../db/queries.users.js');

module.exports = {
    signup(req, res, next){
        res.render('users/signup');
    },
}