//num workouts needs to be even
function makeSets(startExId, numWorkouts) {
  // end = startExId + numWorkouts*3
  const end = startExId + (6 / 2) * numWorkouts;
  let setsArr = [];
  for (let i = startExId; i < end; i += 6) {
    setsArr.push(
      ...[
        {
          exerciseId: i,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i,
          setOrder: 2,
          numRepsActual: 5,
        },
        {
          exerciseId: i,
          setOrder: 3,
          numRepsActual: 5,
        },
        {
          exerciseId: i,
          setOrder: 4,
          numRepsActual: 5,
        },
        {
          exerciseId: i,
          setOrder: 5,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 1,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 1,
          setOrder: 2,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 1,
          setOrder: 3,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 1,
          setOrder: 4,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 1,
          setOrder: 5,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 2,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 3,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 3,
          setOrder: 2,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 3,
          setOrder: 3,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 3,
          setOrder: 4,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 3,
          setOrder: 5,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 4,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 4,
          setOrder: 2,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 4,
          setOrder: 3,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 4,
          setOrder: 4,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 4,
          setOrder: 5,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 5,
          setOrder: 1,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 5,
          setOrder: 2,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 5,
          setOrder: 3,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 5,
          setOrder: 4,
          numRepsActual: 5,
        },
        {
          exerciseId: i + 5,
          setOrder: 5,
          numRepsActual: 5,
        },
      ]
    );
  }
  return setsArr;
}
console.log(makeSets(37,5))
