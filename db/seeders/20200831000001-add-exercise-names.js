'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('ExerciseNames', [
			{exerciseName: 'Squat'},
			{exerciseName: 'Overhead Press'},
			{exerciseName: 'Deadlift'},
			{exerciseName: 'Bench Press'},
			{exerciseName: 'Pendlay Row'},
		], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExerciseNames', null, {});
  }
};
