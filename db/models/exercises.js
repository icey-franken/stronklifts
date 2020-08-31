"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercises = sequelize.define(
    "Exercises",
    {
      workoutId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Workouts",
        },
        allowNull: false,
      },
      exerciseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exerciseOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numSets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numRepsGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workingWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Exercises.associate = function (models) {
    Exercises.belongsTo(models.Workouts, {
      foreignKey: "workoutId",
    });
    Exercise.hasMany(models.Sets, {
      foreignKey: "exerciseId",
    });
  };
  return Exercises;
};
