"use strict";
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
        type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
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

  Workout.getIncompleteId = async function (userId) {
    try {
      const incompleteWorkout = await Workout.findOne({
        where: {
          userId,
          workoutComplete: false,
        },
      });
      return incompleteWorkout.id;
    } catch (err) {
      // console.log(err);
      return null;
    }
  };

  Workout.prevWorkout = async function (userId) {
    const prevWorkout = await Workout.findOne({
      where: {
        userId,
        workoutComplete: true,
      },
      order: [["workoutDate", "desc"]],
      attributes: ["workoutDate", "workoutSplit", "id"],
		});
		return prevWorkout;
	}

	Workout.prevPrevWorkout = async function (userId, workoutSplit) {
    //same logic as above prevWorkout but with split
    const prevPrevWorkout = await Workout.findOne({
      where: {
        userId,
        workoutComplete: true,
        workoutSplit,
      },
      order: [["workoutDate", "desc"]],
      attributes: ["workoutDate", "workoutSplit", "id"],
    });
    return prevPrevWorkout;
  };

  return Workout;
};
