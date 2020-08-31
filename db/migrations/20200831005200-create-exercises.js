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
        type: Sequelize.INTEGER
      },
      exerciseName: {
        type: Sequelize.STRING
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
      workingWeight: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};