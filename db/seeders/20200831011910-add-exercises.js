'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Exercises', [{
			 workoutId: 1,
			 exerciseNameId: 1,
			 exerciseOrder: 1,
			 numSets: 5,
			 numRepsGoal: 5,
			 workingWeightId: 46,
			},
			{
				workoutId: 1,
				exerciseNameId: 2,
				exerciseOrder: 2,
				numSets: 5,
				numRepsGoal: 5,
				workingWeightId: 22,
			 },
			 {
				workoutId: 1,
				exerciseNameId: 3,
				exerciseOrder: 3,
				numSets: 1,
				numRepsGoal: 5,
				workingWeightId: 56,
			 },
			 {
				workoutId: 2,
				exerciseNameId: 1,
				exerciseOrder: 1,
				numSets: 5,
				numRepsGoal: 5,
				workingWeightId: 47,
			 },
			 {
				 workoutId: 2,
				 exerciseNameId: 4,
				 exerciseOrder: 2,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeightId: 35,
				},
				{
				 workoutId: 2,
				 exerciseNameId: 5,
				 exerciseOrder: 3,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeightId: 37,
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