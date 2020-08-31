'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workouts = sequelize.define('Workouts', {
    userId: DataTypes.INTEGER,
    workoutDate: DataTypes.DATE
  }, {});
  Workouts.associate = function(models) {
    // associations can be defined here
  };
  return Workouts;
};