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
          model: "ExerciseNames",
        },
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
          model: "WorkingWeights",
        },
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
      foreignKey: "workingWeightId",
    });
    Exercise.belongsTo(models.ExerciseName, {
      foreignKey: "exerciseNameId",
    });
  };

  Exercise.createNext = async function (
    newWorkoutId,
    prevWorkoutId,
    exerciseNameId,
    workoutDate
  ) {
    //implement a check that workoutDate is less than 14 days behind. If it is, then we deload. If not, do regular logic
    const prevExercise = await Exercise.findOne({
      where: {
        workoutId: prevWorkoutId,
        exerciseNameId,
      },
      attributes: ["id", "numFails", "wasSuccessful", "workingWeightId"],
    });
    let numSets = 5;
    if (exerciseNameId === 3) numSets = 1;
    const { numFails, wasSuccessful, workingWeightId } = prevExercise;
    let newWorkingWeightId = workingWeightId;
    let newNumFails = 0;
    let newDidDeload = false;
    if (wasSuccessful === true) newWorkingWeightId++;
    else if (numFails < 2) newNumFails = numFails + 1;
    else if (numFails >= 2) {
      newWorkingWeightId = Math.floor(workingWeightId * 0.8);
      newDidDeload = true;
    }
    return await Exercise.create({
      workoutId: newWorkoutId,
      exerciseNameId,
      exerciseOrder: exerciseNameId,
      numSets,
      workingWeightId: newWorkingWeightId,
      numFails: newNumFails,
      didDeload: newDidDeload,
    });
  };

  return Exercise;
};
