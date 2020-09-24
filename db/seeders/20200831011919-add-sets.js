'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sets', [{
			exerciseId: 1,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 1,
			setOrder: 2,
			numRepsActual: 5,
		},
		{
			exerciseId: 1,
			setOrder: 3,
			numRepsActual: 5,
		},
		{
			exerciseId: 1,
			setOrder: 4,
			numRepsActual: 5,
		},
		{
			exerciseId: 1,
			setOrder: 5,
			numRepsActual: 5,
		},
		{
			exerciseId: 2,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 2,
			setOrder: 2,
			numRepsActual: 5,
		},
		{
			exerciseId: 2,
			setOrder: 3,
			numRepsActual: 5,
		},
		{
			exerciseId: 2,
			setOrder: 4,
			numRepsActual: 5,
		},
		{
			exerciseId: 2,
			setOrder: 5,
			numRepsActual: 5,
		},
		{
			exerciseId: 3,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 4,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 4,
			setOrder: 2,
			numRepsActual: 5,
		},
		{
			exerciseId: 4,
			setOrder: 3,
			numRepsActual: 5,
		},
		{
			exerciseId: 4,
			setOrder: 4,
			numRepsActual: 5,
		},
		{
			exerciseId: 4,
			setOrder: 5,
			numRepsActual: 5,
		},
		{
			exerciseId: 5,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 5,
			setOrder: 2,
			numRepsActual: 5,
		},
		{
			exerciseId: 5,
			setOrder: 3,
			numRepsActual: 5,
		},
		{
			exerciseId: 5,
			setOrder: 4,
			numRepsActual: 5,
		},
		{
			exerciseId: 5,
			setOrder: 5,
			numRepsActual: 5,
		},
		{
			exerciseId: 6,
			setOrder: 1,
			numRepsActual: 5,
		},
		{
			exerciseId: 6,
			setOrder: 2,
			numRepsActual: 5,
		},
		{
			exerciseId: 6,
			setOrder: 3,
			numRepsActual: 5,
		},
		{
			exerciseId: 6,
			setOrder: 4,
			numRepsActual: 5,
		},
		{
			exerciseId: 6,
			setOrder: 5,
			numRepsActual: 5,
		},
	], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Sets', null, {});
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
  }
};
