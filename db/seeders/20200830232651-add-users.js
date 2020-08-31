'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			r({ username: 'Demo User', email: 'demo@user.com', hashedPassword: createPassword() }),
      r({ username: 'Samwise Gainzgee', email: 'quadzilla@yoked.com', hashedPassword: createPassword() }),
      r({ username: 'Gaindolf the Whey', email: 'wheymen@yoked.com', hashedPassword: createPassword() }),
      r({ username: 'Brodo Bagains', email: 'biclops@yoked.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
  }
};
