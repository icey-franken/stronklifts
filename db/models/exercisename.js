'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExerciseName = sequelize.define('ExerciseName', {
    exerciseName: {
			type: DataTypes.STRING,
			allowNull: false,
			}
  }, {});
  ExerciseName.associate = function(models) {
    ExerciseName.hasMany(models.Exercise,{
			foreignKey: 'exerciseNameId'
		})
  };
  return ExerciseName;
};
