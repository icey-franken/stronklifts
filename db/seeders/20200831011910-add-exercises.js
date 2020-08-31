'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Exercises', [{
			 workoutId: 1,
			 exerciseName: 'Skwat',
			 exerciseOrder: 1,
			 numSets: 5,
			 numRepsGoal: 5,
			 workingWeight: 2000,
			},
			{
				workoutId: 1,
				exerciseName: 'Overhead Press',
				exerciseOrder: 2,
				numSets: 5,
				numRepsGoal: 5,
				workingWeight: 25,
			 },
			 {
				workoutId: 1,
				exerciseName: 'Deadlift',
				exerciseOrder: 3,
				numSets: 1,
				numRepsGoal: 5,
				workingWeight: 315,
			 },
			 {
				workoutId: 2,
				exerciseName: 'Skwat',
				exerciseOrder: 1,
				numSets: 5,
				numRepsGoal: 5,
				workingWeight: 2005,
			 },
			 {
				 workoutId: 2,
				 exerciseName: 'Bench Press',
				 exerciseOrder: 2,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeight: 185,
				},
				{
				 workoutId: 2,
				 exerciseName: 'Pendlay Row',
				 exerciseOrder: 3,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeight: 155,
				}
		], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Exercises', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
