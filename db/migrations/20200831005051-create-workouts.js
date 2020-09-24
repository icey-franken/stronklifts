'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
				type: Sequelize.INTEGER,
				references: { model: 'Users'}
      },
      workoutDate: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			workoutComplete: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			workoutSplit:{
				type: Sequelize.STRING,
				allowNull: false,
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
    return queryInterface.dropTable('Workouts');
  }
};
