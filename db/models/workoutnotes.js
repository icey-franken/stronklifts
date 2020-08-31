"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkoutNotes = sequelize.define(
    "WorkoutNotes",
    {
      workoutId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Workouts",
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {}
  );
  WorkoutNotes.associate = function (models) {
    WorkoutNotes.belongsTo(models.Workouts, {
      foreignKey: "workoutId",
    });
  };
  return WorkoutNotes;
};
