const User = require('./models').User;
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
  promoteUser(req, callback){
    console.log('{QUERY} 1 BEFORE ALL: ', req.user.dataValues);
      User.findByPk(req.user.id)
      .then((user) =>{
        console.log('{QUERY} 2 FINDBYPK', user.dataValues);
      })
    return User.update(
      {role: 'premium'},
      {where: {id: req.user.id}}
    )
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
};