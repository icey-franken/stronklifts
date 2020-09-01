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
  "/",
  asyncHandler(async (_req, res) => {
    const userId = 1; //how to get user id from request?
    const workouts = await Workout.findAll({
			//ordering works! It should return sets in an array of objects in order. Sets are a key in an exercise object, which themselves are in order. I may be able to remove some of the info queried here in the future - will leave for now for debugging.
      where: { userId },
      attributes: ["workoutDate"],
      limit: 10,
      order: [
        ["workoutDate", "asc"],
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

module.exports = router;
