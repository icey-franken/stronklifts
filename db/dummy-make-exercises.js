function makeExercises(startWorkoutId, numWorkouts, sq, op, dl, bp, pr) {
  const end = startWorkoutId + numWorkouts / 2; //multiplier?
  let exArr = [];
  for (let i = startWorkoutId; i < end; i += 2) {
    sq += 2;
    op++;
    dl++;
    bp++;
    pr++;
    exArr.push(
      ...[
        {
          workoutId: i,
          exerciseNameId: 1,
          exerciseOrder: 1,
          numSets: 5,
          numRepsGoal: 5,
          workingWeightId: sq - 1,
          wasSuccessful: true,
        },
        {
          workoutId: i,
          exerciseNameId: 2,
          exerciseOrder: 2,
          numSets: 5,
          numRepsGoal: 5,
          workingWeightId: op,
          wasSuccessful: true,
        },
        {
          workoutId: i,
          exerciseNameId: 3,
          exerciseOrder: 3,
          numSets: 1,
          numRepsGoal: 5,
          workingWeightId: dl,
          wasSuccessful: true,
        },
        {
          workoutId: i + 1,
          exerciseNameId: 1,
          exerciseOrder: 1,
          numSets: 5,
          numRepsGoal: 5,
          workingWeightId: sq,
          wasSuccessful: true,
        },
        {
          workoutId: i + 1,
          exerciseNameId: 4,
          exerciseOrder: 2,
          numSets: 5,
          numRepsGoal: 5,
          workingWeightId: bp,
          wasSuccessful: true,
        },
        {
          workoutId: i + 1,
          exerciseNameId: 5,
          exerciseOrder: 3,
          numSets: 5,
          numRepsGoal: 5,
          workingWeightId: pr,
          wasSuccessful: true,
        },
      ]
    );
  }
  return exArr;
}

let sq = 31;
let op = 15;
let dl = 43;
let bp = 25;
let pr = 25;
let startWorkoutId = 13;
let numWorkouts = 6;

console.log(makeExercises(startWorkoutId, numWorkouts, sq, op, dl, bp, pr));

//the following was cut from add workouts seeders - adding exercises and sets takes too damn long
let workoutsId18to40 = [
  {
    userId: 1,
    workoutDate: "2020-07-28",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-08-03",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-05",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-08-07",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-10",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-08-12",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-15",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-08-18",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-22",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-08-24",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-27",
    workoutComplete: true,
    workoutSplit: "A",
  },

  {
    userId: 1,
    workoutDate: "2020-08-29",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-08-31",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-09-02",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-09-04",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-09-07",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-09-09",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-09-11",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-09-21",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-09-23",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-09-25",
    workoutComplete: true,
    workoutSplit: "B",
  },
  {
    userId: 1,
    workoutDate: "2020-09-28",
    workoutComplete: true,
    workoutSplit: "A",
  },
  {
    userId: 1,
    workoutDate: "2020-09-30",
    workoutComplete: true,
    workoutSplit: "B",
  },
];
