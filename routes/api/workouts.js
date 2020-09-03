const express = require("express");
const asyncHandler = require("express-async-handler");
// const { check } = require("express-validator");

const {
  Workout,
  Exercise,
  Set,
  ExerciseName,
  WorkingWeight,
  WorkoutNote,
} = require("../../db/models");
// const { handleValidationErrors } = require("../util/validation");
// const { generateToken } = require("../util/auth");
// const {
//   jwtConfig: { expiresIn },
// } = require("../../config");

const router = express.Router();

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10); //how to get user id from request?
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

//NEEDS WORK - NEED TO FINISH PROGRESS ROUTE FIRST SO THAT THAT SLICE OF STATE CAN BE SENT TO THIS ROUTE.
//Would it be better to have this route get progress on it's own? So that we don't have to make a request from front end, wait for response, and then send that response back with our create request? I think so. for the future.

router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    // const { workoutSplit, progress } = JSON.parse(req.body);
		//based on workout split we create a new workout - A or B. In progress object we will find a number of failures and a working weight for each exercise. Based on A or B, grab value of wasSuccessful from relevant exercise from progress object. If true, then increase workingWeight by 5 lbs (increase id by 1). If false, check if numFails is <= 2 - if it is, then working weight stays the same and numFails on that exercise increases by 1. If numFails >2, then it deload (decrease WW by 20%, rounding down to nearest whole number if going by workingWeightId).
		// try{

		// 	const lastSquatWorkout = await Workout.getSquatProgress(userId);
		// 	console.log(lastSquatWorkout);
		// 	return lastSquatWorkout;
		// } catch(err) {console.log(err)}
		return res.json({userId});
    // const lastAWorkout = Workout.findAll({
    //   where: {
    //     workoutSplit: "A",
    //     userId,
    //   },
    //   limit: 1,
    //   order: [["workoutDate", "DESC"]],
    // });
	})
);

//second thought - why does front end need to know about progress object? We can create it on the back end, use it to make a new workout, and send the new workout over to the user! Keep going.
router.get(
  "/progress/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    //bunch of database queries coming up. I would like to format the progress object as follows:

    //should I be creating methods on my models to do some of this work? That way these back end calls can just be calling a few methods on the models and getting what they need.
    // progress = {
    // 	1: {
    // 		exerciseNameId: 1,//squat is 1, then overhead, dead, bench, row
    // 		workingWeightId: 0,//0lbs is id 1; multiply id by 5 and subtract 5 for ww
    // 		wasSuccessful: true,//bool - if true, ww for next goes up, if false, we have other checks relating to numFails
    // 		numFails: 2,// if wasSuccessful is false and numFails is 2, then the new exercise will have numFails 0 and didDeload prop set to true - we will also decrease working weight by 20% - multiply wwid by 0.8 and find the floor for the new wwid.
    // 	}
    // }
  })
);

module.exports = router;
