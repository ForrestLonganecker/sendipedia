const User = require('./models').User;
const Wiki = require('./models').Wiki;
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
        .then((wikis) => {
          result["wikis"] = wikis;

          Collaborator.scope({method: ["allCollabWikis", id]}).findAll()
          .then((collaborators) => {
            
            // do something with array of collaborator objects
          })
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
        });
        // can insert scope for associated items here
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