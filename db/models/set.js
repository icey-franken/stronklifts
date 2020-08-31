"use strict";
module.exports = (sequelize, DataTypes) => {
  const Set = sequelize.define(
    "Set",
    {
      exerciseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Exercises",
        },
        allowNull: false,
      },
      setOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numRepsActual: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {}
  );
  Set.associate = function (models) {
    Set.belongsTo(models.Exercise, {
      foreignKey: "exerciseId",
    });
  };
  return Set;
};
