'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exerciseId: {
				type: Sequelize.INTEGER,
				references: {model: 'Exercises'},
				allowNull: false,
      },
      setOrder: {
				type: Sequelize.INTEGER,
				allowNull: false,
      },
      numRepsActual: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: null,
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
    return queryInterface.dropTable('Sets');
  }
};
