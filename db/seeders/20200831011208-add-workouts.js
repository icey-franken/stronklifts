'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Workouts', [{
			userId: 1,
			workoutDate: Sequelize.fn("NOW"),
		},
		{
			userId: 1,
			workoutDate: Sequelize.fn("NOW"),
		},
		{
			userId: 1,
			workoutDate: Sequelize.fn("NOW"),
		}
	], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Workouts', null, {});
  }
};
