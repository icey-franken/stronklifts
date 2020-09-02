'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workoutId: {
				type: Sequelize.INTEGER,
				references: {model:'Workouts'}
      },
      exerciseNameId: {
				type: Sequelize.INTEGER,
				references: {model: 'ExerciseNames'}
      },
      exerciseOrder: {
        type: Sequelize.INTEGER
      },
      numSets: {
        type: Sequelize.INTEGER
      },
      numRepsGoal: {
        type: Sequelize.INTEGER
      },
      workingWeightId: {
				type: Sequelize.INTEGER,
				references: {model: 'WorkingWeights'}
			},
			numFails: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			wasSuccessful: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			didDeload: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};
