"use strict";
// const db = require('./index')
// const Exercise = require('./exercise');

module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define(
    "Workout",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      workoutDate: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				defaultValue: null,
			},
			workoutComplete: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			workoutSplit: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			}
    },
    {}
  );
  Workout.associate = function (models) {
    Workout.belongsTo(models.User, {
			foreignKey: 'userId'
		});
		Workout.hasMany(models.Exercise, {
			foreignKey: 'workoutId'
		});
		Workout.hasOne(models.WorkoutNote, {
			foreignKey: 'workoutId'
		})
  };


	Workout.getSquatProgress = async function(userId) {
		// console.log('db',db);
		// console.log('exercise',Exercise)
		return await Workout.findAll({
      where: {
        userId,
        workoutComplete: true,
      },
      limit: 1,
      order: [["workoutDate", "DESC"]],
			include: [{model: Exercise}]

			//I think I need to load things separately. Find the most recent workout for A and B. Then use that and the associated workout id to get the exercises with a separate call in the backend route. Until tomorrow.

				// {all:true, //},
				// // {
				// // 	model: Exercise,
				// // 	as: 'exercises',
				// // 	required: true,
        //   // attributes: ["exerciseOrder", "numSets", "numRepsGoal"],
        //   where: { exerciseNameId: 1 },
        //   attributes: [
        //     "workingWeightId",
        //     "numFails",
        //     "wasSuccessful",
        //     "didDeload",
        //   ], //might not care about didDeload
      //   },
      // ],
    })
	}


	return Workout;
};
