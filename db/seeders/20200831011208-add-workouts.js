'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Workouts', [{
			userId: 1,
			workoutDate: "2020-08-31T17:37:01.548Z",
		},
		{
			userId: 1,
			workoutDate: "2020-08-29T17:37:01.548Z",
		},
		{
			userId: 1,
			workoutDate: "2020-08-27T17:37:01.548Z",
		}
	], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Workouts', null, {});
  }
};
