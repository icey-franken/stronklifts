"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Workouts",
      [
        {
          userId: 1,
          workoutDate: "2020-06-11",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-06-14",
          workoutComplete: true,
          workoutSplit: "B",
        },
        {
          userId: 1,
          workoutDate: "2020-06-16",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-06-18",
          workoutComplete: true,
          workoutSplit: "B",
        },
        {
          userId: 1,
          workoutDate: "2020-06-20",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-06-23",
          workoutComplete: true,
          workoutSplit: "B",
        },
        {
          userId: 1,
          workoutDate: "2020-06-25",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-06-28",
          workoutComplete: true,
          workoutSplit: "B",
        },
        {
          userId: 1,
          workoutDate: "2020-06-30",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-07-02",
          workoutComplete: true,
          workoutSplit: "B",
        },
        {
          userId: 1,
          workoutDate: "2020-07-05",
          workoutComplete: true,
          workoutSplit: "A",
        },
        {
          userId: 1,
          workoutDate: "2020-07-08",
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
