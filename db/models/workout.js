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

  Workout.prevWorkouts = async function (userId) {
    const prevWorkout = await Workout.findAll({
      where: {
        userId,
        workoutComplete: true,
      },
      limit: 1,
      order: [["workoutDate", "DESC"]],
      attributes: ["workoutDate", "workoutSplit", "id"],
    });
    const prevSplit = prevWorkout[0].workoutSplit;

    let prevPrevSplit = "A";
    if (prevSplit === "A") prevPrevSplit = "B";
    //same logic as above prevWorkout but with split
    const prevPrevWorkout = await Workout.findAll({
      where: {
        userId,
        workoutComplete: true,
        workoutSplit: prevPrevSplit,
      },
      limit: 1,
      order: [["workoutDate", "DESC"]],
      attributes: ["workoutDate", "workoutSplit", "id"],
    });
    return { prevWorkout, prevPrevWorkout };
  };

  return Workout;
};
