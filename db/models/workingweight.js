'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkingWeight = sequelize.define('WorkingWeight', {
    weight: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
  }, {});
  WorkingWeight.associate = function(models) {
    WorkingWeight.hasMany(models.Exercise, {
			foreignKey: 'workingWeightId'
		})
  };
  return WorkingWeight;
};
