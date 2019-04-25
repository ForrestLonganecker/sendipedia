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
  promoteUser(userId, callback){
    return User.update(
      {role: 'premium'},
      {where: {id: userId}}
    )
    .then((res) => {
      console.log(res);
    })
    .catch(next)
  }
};