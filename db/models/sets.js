'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sets = sequelize.define('Sets', {
    exerciseId: DataTypes.INTEGER,
    setOrder: DataTypes.INTEGER,
    numRepsActual: DataTypes.INTEGER
  }, {});
  Sets.associate = function(models) {
    // associations can be defined here
  };
  return Sets;
};