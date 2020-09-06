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
    const grabWorkoutSpecs = {
      where: { userId },
      attributes: ["id", "workoutDate", "workoutComplete", "workoutSplit"],
      limit: 10,
      order: [
        ["workoutDate", "desc"],
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
    let wwValues = [null, null, null, null, null];
    console.log("line108", req.body === true);
    console.log(req.body.wwValues === true);
    if (req.body.wwValues) {
      wwValues = req.body.wwValues;

      let newWorkout = await Workout.create({
        workoutSplit: "A",
        userId,
      });

      let newNewWorkout = await Workout.create({
        workoutSplit: "B",
        userId,
      });
      let workoutId = newNewWorkout.id;
      const { id: squatId2 } = await Exercise.createNext(
        workoutId,
        null,
        1,
        null,
        wwValues[0] + 1
      );
      await Set.createBasicSets(squatId2, 5);
      const { id: benchId } = await Exercise.createNext(
        workoutId,
        null,
        4,
        null,
        wwValues[3]
      );
      await Set.createBasicSets(benchId, 5);
      const { id: rowId } = await Exercise.createNext(
        workoutId,
        null,
        5,
        null,
        wwValues[4]
      );
      await Set.createBasicSets(rowId, 5);
      console.log("hits", rowId);

      workoutId = newWorkout.id;
      const { id: squatId } = await Exercise.createNext(
        workoutId,
        null,
        1,
        null,
        wwValues[0]
      );
      await Set.createBasicSets(squatId, 5);

      const { id: overheadId } = await Exercise.createNext(
        workoutId,
        null,
        2,
        null,
        wwValues[1]
      );
      await Set.createBasicSets(overheadId, 5);
      const { id: deadliftId } = await Exercise.createNext(
        workoutId,
        null,
        3,
        null,
        wwValues[2]
      );
      await Set.createBasicSets(deadliftId, 1);

      // grabWorkoutSpecs.where = { id: workoutId };
      // newWorkout = await Workout.findOne(grabWorkoutSpecs);
      return res.json({ newWorkout });
    } else {
      let workoutId;
      console.log("hits line 179");
      console.log(wwValues);
      try {
        //first check that no incomplete workouts exist
        const incompleteId = await Workout.getIncompleteId(userId);
        if (incompleteId !== null) {
          workoutId = incompleteId;
        } else {
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
          });
          workoutId = newWorkout.id;
          const workoutDate = newWorkout.workoutDate;

          const { id: squatId } = await Exercise.createNext(
            workoutId,
            prevId,
            1,
            workoutDate,
            wwValues[0]
          );
          await Set.createBasicSets(squatId, 5);
          if (newWorkoutSplit === "A") {
            const { id: overheadId } = await Exercise.createNext(
              workoutId,
              prevPrevId,
              2,
              workoutDate,
              wwValues[1]
            );
            await Set.createBasicSets(overheadId, 5);
            const { id: deadliftId } = await Exercise.createNext(
              workoutId,
              prevPrevId,
              3,
              workoutDate,
              wwValues[2]
            );
            await Set.createBasicSets(deadliftId, 1);
          } else if (newWorkoutSplit === "B") {
            const { id: benchId } = await Exercise.createNext(
              workoutId,
              prevPrevId,
              4,
              workoutDate,
              wwValues[3]
            );
            await Set.createBasicSets(benchId, 5);
            const { id: rowId } = await Exercise.createNext(
              workoutId,
              prevPrevId,
              5,
              workoutDate,
              wwValues[4]
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

//this gives error: "update or delete on table \"Workouts\" violates foreign key constraint \"Exercises_workoutId_fkey\" on table \"Exercises\"",
//BUT only on the first time - the second time I call there is no problem.
//Seems like the Workout.destroy method is called too quickly and it thinks the associated exercises still exist, even though I delete them BEFORE.
//Not sure why - did a lot of trouble shooting and writing this code different ways. For now.... we will make two requests to this route in order to delete a workout.
// router.delete(
//   "/:workoutId",
//   asyncHandler(async (req, res) => {
//     const id = parseInt(req.params.workoutId, 10);
//     try {
//       await WorkoutNote.destroy({ where: { workoutId: id } });
//       const assocExercises = await Exercise.findAll({
//         where: { workoutId: id },
//       });
//       if (assocExercises.length > 0) {
//         assocExercises.forEach(async (exercise) => {
//           const assocSets = await Set.findAll({
//             where: { exerciseId: exercise.id },
//           });
//           if (assocSets.length > 0) {
//             assocSets.forEach(async (set) => {
//               await set.destroy();
//             });
//           }
//           await exercise.destroy();
//         });
//       }
//       await Workout.destroy({ where: { id } });
//       return res.json({ deleted: true });
//     } catch (err) {
//       console.log(err);
//       return res.json({ deleted: false });
//     }
//   })
// );

//second attempt at delete method. This time I will make methods on the model that do the work. This route will simply call those methods. This route needs to get the work
router.delete(
  "/:workoutId",
  asyncHandler(async (req, res) => {
    try {
      //get workout id off params
      const id = parseInt(req.params.workoutId, 10);
      //get exercise and set ids associated with that workout
      const exercises = await Exercise.findAll({
        where: { workoutId: id },
        attributes: ["id"],
        include: [
          {
            model: Set,
            attributes: ["id"],
          },
        ],
      });
      let setIdArr = [];
      let exerciseIdArr = [];
      //extract ids off of exercises
      exercises.forEach(async (exercise) => {
        exerciseIdArr.push(exercise.id);
        exercise.Sets.forEach(async (set) => {
          setIdArr.push(set.id);
        });
      });
      //DESTROY
			await WorkoutNote.destroy({ where: { workoutId: id } });
      await Set.destroy({ where: { id: setIdArr } });
      await Exercise.destroy({ where: { id: exerciseIdArr } });
      await Workout.destroy({ where: { id } });
      return res.json({ deleted: true });
    } catch (err) {
      console.log(err);
      return res.json({ deleted: false });
    }
  })
);
module.exports = router;
