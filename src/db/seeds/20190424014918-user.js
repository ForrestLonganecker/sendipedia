'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const hashedPassword = bcrypt.hashSync('123456', salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Add Min',
      email: 'admin@email.com',
      password: hashedPassword,
      role: 'admin'
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Stan Dard',
      email: 'standard@email.com',
      password: hashedPassword,
      role: 'standard'
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Pree Mium',
      email: 'premium@email.com',
      password: hashedPassword,
      role: 'premium'
    }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
