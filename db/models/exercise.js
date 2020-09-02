"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    "Exercise",
    {
      workoutId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Workouts",
        },
        allowNull: false,
      },
      exerciseNameId: {
        type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'ExerciseNames'
				}
      },
      exerciseOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numSets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numRepsGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workingWeightId: {
        type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'WorkingWeights'
				}
			},
			numFails: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			wasSuccessful: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			didDeload: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
    },
    {}
  );
  Exercise.associate = function (models) {
    Exercise.belongsTo(models.Workout, {
      foreignKey: "workoutId",
    });
    Exercise.hasMany(models.Set, {
      foreignKey: "exerciseId",
		});
		Exercise.belongsTo(models.WorkingWeight, {
			foreignKey: 'workingWeightId'
		});
		Exercise.belongsTo(models.ExerciseName, {
			foreignKey: 'exerciseNameId'
		})
  };
  return Exercise;
};
