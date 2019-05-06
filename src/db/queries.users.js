const User = require('./models').User;
const Wiki = require('./models').Wiki;
const Collaborator = require('./models').Collaborator;
const bcrypt = require('bcryptjs');

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
    let result = {};
    User.findByPk(id)
    .then((user) => {
      if(!user) {
        callback(404);
      } else {
        result["user"] = user;
        Wiki.scope({method: ["allOwnedPrivate", id]}).findAll()
        .then((ownedPrivateWikis) => {
          result["privateWikis"] = ownedPrivateWikis;

          Collaborator.scope({method: ["allCollabWikis", id]}).findAll()
          .then((collaboratorWikis) => {
            result["collabWikis"] = collaboratorWikis;
            callback(null, result);
            // can insert scope for associated items here
          })
          .catch((err) => {
            callback(err);
          });
        })
      }
    });
  },
  promoteUser(req, callback){
    return User.update(
      {role: 'premium'},
      {where: {id: req.user.id}}
    )
    .then((updatedRows) => {
      callback(null, updatedRows);
    })
    .catch((err) => {
      callback(err);
    })
  },
  demoteUser(req, callback){
    return User.update(
      {role: 'standard'},
      {where: {id: req.user.id}}
    )
    .then((updatedRows) => {
      callback(null, updatedRows);
    })
    .catch((err) => {
      callback(err);
    })
  },
};