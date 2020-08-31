'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercises = sequelize.define('Exercises', {
    workoutId: DataTypes.INTEGER,
    exerciseName: DataTypes.STRING,
    exerciseOrder: DataTypes.INTEGER,
    numSets: DataTypes.INTEGER,
    numRepsGoal: DataTypes.INTEGER,
    workingWeight: DataTypes.INTEGER
  }, {});
  Exercises.associate = function(models) {
    // associations can be defined here
  };
  return Exercises;
};