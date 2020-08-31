"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    "Exercise",
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
  Exercise.associate = function (models) {
    Exercise.belongsTo(models.Workout, {
      foreignKey: "workoutId",
    });
    Exercise.hasMany(models.Set, {
      foreignKey: "exerciseId",
    });
  };
  return Exercise;
};
