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

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const workouts = await Workout.findAll({
      //ordering works! It should return sets in an array of objects in order. Sets are a key in an exercise object, which themselves are in order. I may be able to remove some of the info queried here in the future - will leave for now for debugging.
      where: { userId },
      attributes: ["workoutDate", "workoutComplete", "workoutSplit", "id"],
      limit: 10,
      order: [
        ["workoutDate", "desc"], //out of order in postman but correct order in chrome dev tools?
        [Exercise, "exerciseOrder", "asc"],
        [Exercise, Set, "setOrder", "asc"],
      ],
      include: [
        {
          model: Exercise,
          attributes: ["exerciseOrder", "numSets", "numRepsGoal"],
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
        // {
        //   model: Set,
        // },
      ],
    });
    return res.json({ workouts });
  })
);


router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.userId, 10);

    try {
      const prevWorkouts = await Workout.prevWorkouts(userId);
			const {prevWorkout, prevPrevWorkout} = prevWorkouts;

			//prevWorkout[0] = {workoutDate, workoutSplit, id}
			//need id's from both; date from prev; split from prevPrev
			const {id: prevId, workoutDate: prevWorkoutDate} = prevWorkout;
			const {id: prevPrevId, workoutSplit: newWorkoutSplit,} = prevPrevWorkout;

			//add workoutDate in the future - need to figure out formatting. For now default is null.
			const newWorkout = await Workout.create({
				workoutSplit: newWorkoutSplit,
				userId,
			});
			const workoutId = newWorkout.id;

			//create squat
			await Exercise.createNext(workoutId, prevId, 1, null);
			//for overhead and deadlift (newWorkoutSplit === 'A')
			let exerciseNameIdArr = [2,3];
			//for bench and row
			if(newWorkoutSplit === 'B') exerciseNameIdArr = [4,5];
			//create A or B split exercises
			exerciseNameIdArr.forEach(async (exerciseId)=>{
				await Exercise.createNext(workoutId, prevPrevId, exerciseId, null);
			})

			return res.json(newWorkout)
    } catch (err) {
      console.log(err);
    }
  })
);


module.exports = router;
