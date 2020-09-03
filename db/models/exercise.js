"use strict";
const {Op} = require('sequelize');

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
				defaultValue: 5,
      },
      numRepsGoal: {
        type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 5,
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

	//takes in the relevant workoutId and exerciseNameId. WorkoutId should come from method call on workout model that finds most recent completed workout having that exercise.
	//this method will grab numFails, wasSuccessful, and workingWeightId.
	//based on logic in the method it will determine what the workingWeightId should be for the upcoming exercise, and will update properties as necessary.
	Exercise.getNext = async function(workoutId, exerciseNameId, workoutDate) {
		//implement a check that workoutDate is less than 14 days behind. If it is, then we deload. If not, do regular logic
		console.log('workoutId',workoutId);
		const prevExercise = await Exercise.findOne({
      where: {
        [Op.and]: [{ workoutId: 1 }, { exerciseNameId }],
			},
			attributes: ['numFails', 'wasSuccessful', 'workingWeightId']
		});
		return prevExercise;
	}



  return Exercise;
};
