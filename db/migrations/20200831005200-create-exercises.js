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
				references: {model:'Workouts'},
				allowNull: false,
      },
      exerciseNameId: {
				type: Sequelize.INTEGER,
				references: {model: 'ExerciseNames'},
				allowNull: false,
      },
      exerciseOrder: {
				type: Sequelize.INTEGER,
				allowNull: false,
      },
      numSets: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 5,
      },
      numRepsGoal: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 5,
      },
      workingWeightId: {
				type: Sequelize.INTEGER,
				references: {model: 'WorkingWeights'},
				allowNull: false,
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
