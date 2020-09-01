"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "WorkoutNotes",
      [
        {
          workoutId: 1,
          description: "Blew out my knee doing one legged reverse box squats",
        },
        {
          workoutId: 2,
          description:
            "Only spent 3 hours looking in the mirror today, great progress.",
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("WorkoutNotes", null, {});
  },
};
