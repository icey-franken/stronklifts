'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkoutNotes = sequelize.define('WorkoutNotes', {
    workoutId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  WorkoutNotes.associate = function(models) {
    // associations can be defined here
  };
  return WorkoutNotes;
};