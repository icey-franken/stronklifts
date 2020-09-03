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
        defaultValue: false,
      },
      workoutSplit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Workout.associate = function (models) {
    Workout.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Workout.hasMany(models.Exercise, {
      foreignKey: "workoutId",
    });
    Workout.hasOne(models.WorkoutNote, {
      foreignKey: "workoutId",
    });
  };

  Workout.getSquatProgress = async function (userId) {
    // console.log('db',db);
    // console.log('exercise',Exercise)
    return await Workout.findAll({
      where: {
        userId,
        workoutComplete: true,
      },
      limit: 1,
      order: [["workoutDate", "DESC"]],
      include: [{ model: Exercise }],

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
    });
  };

  Workout.prevWorkouts = async function (userId) {
    const prevWorkout = await Workout.findAll({
      where: {//do I need to use [Op.and] or can I do this?
        userId,
        workoutComplete: true,
      },
      limit: 1,
			order: [["workoutDate", "DESC"]],
			attributes: ['workoutDate','workoutSplit', 'id']
		});
		//from prevWorkout we need to grab workoutDate and workoutSplit, then use that to find the other split
		// prevSplit = grab from prevWorkout
		// console.log(prevWorkout);
		//dummy variable here
		const prevSplit = prevWorkout[0].workoutSplit;

		let prevPrevSplit = 'A';
		if(prevSplit === 'A') prevPrevSplit = 'B';
		//same logic as above prevWorkout - maybe put this logic in it's own method - later
		const prevPrevWorkout = await Workout.findAll({
      where: {//do I need to use [Op.and] or can I do this?
        userId,
				workoutComplete: true,
				workoutSplit: prevPrevSplit
      },
      limit: 1,
			order: [["workoutDate", "DESC"]],
			attributes: ['workoutDate','workoutSplit', 'id']
		});
		// console.log(prevPrevWorkout);
		//now we have the most recent completed A and B workouts - we want to send back the workoutDate, workoutSplit, and workoutId for both of these.
		return {prevWorkout, prevPrevWorkout};

	};

  return Workout;
};
