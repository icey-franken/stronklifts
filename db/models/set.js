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
				defaultValue: null,

      },
    },
    {}
  );
  Set.associate = function (models) {
    Set.belongsTo(models.Exercise, {
      foreignKey: "exerciseId",
    });
  };

	Set.createBasicSets = async function (exerciseId, numSets) {
		for(let i = 1; i <= numSets; i ++) {
			await Set.create({exerciseId, setOrder: i,});
		}
	}

	return Set;
};
