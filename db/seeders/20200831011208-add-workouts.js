"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Workouts",
      [
        {
          userId: 1,
          workoutDate: '2020-08-27',
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
					userId: 1,
					workoutDate: '2020-08-29',
          workoutComplete: true,
          workoutSplit: "B",

        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Workouts", null, {});
  },
};
