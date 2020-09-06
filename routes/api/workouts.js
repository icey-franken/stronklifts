const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  Workout,
  Exercise,
  Set,
  ExerciseName,
  WorkingWeight,
  WorkoutNote,
} = require("../../db/models");

const router = express.Router();

const grabWorkoutSpecs = {
  attributes: ["id", "workoutDate", "workoutComplete", "workoutSplit"],
  order: [
    [Exercise, "exerciseOrder", "asc"], //can probably remove these because of new defaults, but we'll leave it in for now
    [Exercise, Set, "setOrder", "asc"],
  ],
  include: [
    {
      model: Exercise,
      attributes: [
        "id",
        "workoutId",
        "exerciseOrder",
        "numSets",
        "numRepsGoal",
        "wasSuccessful",
        "numFails",
        "didDeload",
      ],
      include: [
        { model: ExerciseName, attributes: ["exerciseName"] },
        { model: WorkingWeight, attributes: ["weight"] },
        {
          model: Set,
          attributes: ["id", "setOrder", "numRepsActual"],
        },
      ],
    },
    { model: WorkoutNote, attributes: ["id", "description"] },
  ],
};

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    grabWorkoutSpecs.where = { userId };
    grabWorkoutSpecs.limit = 10;
    grabWorkoutSpecs.order.unshift(["workoutDate", "desc"]);
    let workouts = await Workout.findAll(grabWorkoutSpecs);
    // console.log(workouts[1].WorkoutNote.description);
    // for(let i = 0; i < workouts.length; i ++) {
    // 	console.log('hits');
    // 	// workouts[i].WorkoutNote = null;
    // 	console.log(workouts[i].WorkoutNote);
    // 	// delete workouts[i].WorkoutNote.description;
    // 	//workouts[i].WorkoutNote.description);
    // };
    // // workouts.map((workout)=>{
    // // // 	const {workoutNote} = workout.WorkoutNote;
    // // workout.WorkoutNote = workout.WorkoutNote.description;
    // // return workout;
    // // })
    return res.json({ workouts });
  })
);

router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    let workoutId;
    try {
      //first check that no incomplete workouts exist
      const incompleteId = await Workout.getIncompleteId(userId);
      if (incompleteId !== null) {
        workoutId = incompleteId;
      } else {
        //add another check here - if no prevWorkouts then set starting values
        const prevWorkout = await Workout.prevWorkout(userId);

        let prevId = null;
        let prevSplit = "B";
        if (prevWorkout !== null) {
          prevId = prevWorkout.id;
          prevSplit = prevWorkout.workoutSplit;
          prevWorkoutDate = prevWorkout.workoutDate;
        }

        let newWorkoutSplit = "A";
        if (prevSplit === "A") {
          newWorkoutSplit = "B";
        }

        const prevPrevWorkout = await Workout.prevPrevWorkout(
          userId,
          newWorkoutSplit
        );
        let prevPrevId = null;
        if (prevPrevWorkout !== null) {
          prevPrevId = prevPrevWorkout.id;
        }

        let newWorkout = await Workout.create({
          workoutSplit: newWorkoutSplit,
          userId,
          // workoutDate: date,
        });
        workoutId = newWorkout.id;

        const { id: squatId } = await Exercise.createNext(
          workoutId,
          prevId,
          1,
          null
        );
        await Set.createBasicSets(squatId, 5);
        if (newWorkoutSplit === "A") {
          const { id: overheadId } = await Exercise.createNext(
            workoutId,
            prevPrevId,
            2,
            null
          );
          await Set.createBasicSets(overheadId, 5);
          const { id: deadliftId } = await Exercise.createNext(
            workoutId,
            prevPrevId,
            3,
            null
          );
          await Set.createBasicSets(deadliftId, 1);
        } else if (newWorkoutSplit === "B") {
          const { id: benchId } = await Exercise.createNext(
            workoutId,
            prevPrevId,
            4,
            null
          );
          await Set.createBasicSets(benchId, 5);
          const { id: rowId } = await Exercise.createNext(
            workoutId,
            prevPrevId,
            5,
            null
          );
          await Set.createBasicSets(rowId, 5);
        }
      }
      grabWorkoutSpecs.where = { id: workoutId };
      newWorkout = await Workout.findOne(grabWorkoutSpecs);
      return res.json({ newWorkout });
    } catch (err) {
      console.log(err);
    }
  })
);

router.put(
  "/:workoutId",
  asyncHandler(async (req, res) => {
    try {
      const { workoutComplete } = req.body;
      const id = parseInt(req.params.workoutId, 10);
      const workout = await Workout.update(
        { workoutComplete },
        { where: { id } }
      );
      return res.json({ workout });
    } catch (err) {
      console.log(err);
    }
  })
);

module.exports = router;
