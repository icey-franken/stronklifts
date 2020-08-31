"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sets = sequelize.define(
    "Sets",
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
  Sets.associate = function (models) {
    Sets.belongsTo(models.Exercises, {
      foreignKey: "exerciseId",
    });
  };
  return Sets;
};
