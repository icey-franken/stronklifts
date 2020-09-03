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
  attributes: ["workoutDate", "workoutComplete", "workoutSplit", "id"],
  order: [
    [Exercise, "exerciseOrder", "asc"], //can probably remove these because of new defaults, but we'll leave it in for now
    [Exercise, Set, "setOrder", "asc"],
  ],
  include: [
    {
      model: Exercise,
      attributes: [
        "exerciseOrder",
        "numSets",
        "numRepsGoal",
        ["id", "exerciseId"],
      ],
      include: [
        { model: ExerciseName, attributes: ["exerciseName"] },
        { model: WorkingWeight, attributes: ["weight"] },
        {
          model: Set,
          attributes: ["setOrder", "numRepsActual"],
        },
      ],
    },
    { model: WorkoutNote, attributes: ["description"] },
  ],
};


router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    grabWorkoutSpecs.where = { userId };
    grabWorkoutSpecs.limit = 10;
    grabWorkoutSpecs.order.unshift(["workoutDate", "desc"]);
    const workouts = await Workout.findAll(grabWorkoutSpecs);
    return res.json({ workouts });
  })
);

router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    //first check that no incomplete workouts exist
    let workoutId;
    try {
      const incompleteId = await Workout.getIncompleteId(userId);
      if (incompleteId !== null) {
        workoutId = incompleteId;
      } else {
        //add another check here - if no prevWorkouts then set starting values
        const prevWorkouts = await Workout.prevWorkouts(userId);
        const { prevWorkout, prevPrevWorkout } = prevWorkouts;

        //prevWorkout[0] = {workoutDate, workoutSplit, id}
        //need id's from both; date from prev; split from prevPrev
        const { id: prevId, workoutDate: prevWorkoutDate } = prevWorkout;
        const {
          id: prevPrevId,
          workoutSplit: newWorkoutSplit,
        } = prevPrevWorkout;

        //add workoutDate in the future - need to figure out formatting. For now default is null.
        let newWorkout = await Workout.create({
          workoutSplit: newWorkoutSplit,
          userId,
        });
        workoutId = newWorkout.id;

        //create squat
        const { id: squatId } = await Exercise.createNext(
          workoutId,
          prevId,
          1,
          null
        );
        await Set.createBasicSets(squatId, 5);
        console.log("squat id", squatId);

        //I don't know why but this for each was fucking things up
        // //for overhead and deadlift (newWorkoutSplit === 'A')
        // let exerciseNameIdArr = [2, 3];
        // //for bench and row
        // if (newWorkoutSplit === "B") exerciseNameIdArr = [4, 5];
        // //create A or B split exercises
        // exerciseNameIdArr.forEach(async (exerciseId) => {
        //   await Exercise.createNext(workoutId, prevPrevId, exerciseId, null);
        // });
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
          console.log("ohp and dl id", overheadId, deadliftId);
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
          console.log("bench and row id", benchId, rowId);
        }
        //now we grab the new workout the same way we do for a get request to api/workouts/:userId. There is probably a better way to do this but as of now I can't get methods on the models to work if I use an include property, so we'll do it caveman style here for now.
        //It is critical that this grabs the SAME stuff as the above, so that our store state stays the same
      }
      grabWorkoutSpecs.where = { id: workoutId };
      newWorkout = await Workout.findOne(grabWorkoutSpecs);
      return res.json({ newWorkout });
    } catch (err) {
      console.log(err);
    }
  })
);

module.exports = router;
