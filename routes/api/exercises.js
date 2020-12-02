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

router.put(
  "/:exerciseId",
  asyncHandler(async (req, res) => {
    try {
      const {wasSuccessful} = req.body;
      const id = parseInt(req.params.exerciseId, 10);
      // const set = await Set.findOne({where: id});
      const exercise = await Exercise.update({ wasSuccessful }, { where: { id } });
			return res.json({ exercise });

			// return (res.json(id));
      // await Set.update({where:{id: setId}})
    } catch (err) {
      // console.log(err);
    }
  })
);

module.exports = router;
