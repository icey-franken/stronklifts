"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkoutNote = sequelize.define(
    "WorkoutNote",
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
  WorkoutNote.associate = function (models) {
    WorkoutNote.belongsTo(models.Workout, {
      foreignKey: "workoutId",
    });
  };
  return WorkoutNote;
};
