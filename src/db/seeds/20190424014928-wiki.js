'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Carver',
      body: 'The moss factory',
      private: false,
      userId: 1
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Ozone',
      body: 'Hidden gem of a crag!',
      private: false,
      userId: 2
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Widgi Creek',
      body: 'sleep on the boulders!',
      private: true,
      userId: 3
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
    return queryInterface.bulkDelete('Wikis', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
