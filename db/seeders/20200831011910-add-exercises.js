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
			 wasSuccessful: true,
			},
			{
				workoutId: 1,
				exerciseNameId: 2,
				exerciseOrder: 2,
				numSets: 5,
				numRepsGoal: 5,
				workingWeightId: 22,
				wasSuccessful: true,
			 },
			 {
				workoutId: 1,
				exerciseNameId: 3,
				exerciseOrder: 3,
				numSets: 1,
				numRepsGoal: 5,
				workingWeightId: 56,
				wasSuccessful: true,
			 },
			 {
				workoutId: 2,
				exerciseNameId: 1,
				exerciseOrder: 1,
				numSets: 5,
				numRepsGoal: 5,
				workingWeightId: 47,
				wasSuccessful: true,
			 },
			 {
				 workoutId: 2,
				 exerciseNameId: 4,
				 exerciseOrder: 2,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeightId: 35,
				 wasSuccessful: true,
				},
				{
				 workoutId: 2,
				 exerciseNameId: 5,
				 exerciseOrder: 3,
				 numSets: 5,
				 numRepsGoal: 5,
				 workingWeightId: 37,
				 wasSuccessful: true,
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
