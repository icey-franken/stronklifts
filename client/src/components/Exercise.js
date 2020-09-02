import React from "react";

export default function Exercise({ exercise }) {
  console.log(exercise);
  const [name, weight, repGoal, numSets, setArr] = exercise;
  const repsArr = [];
  setArr.forEach((set) => {
    repsArr.push(set.numRepsActual);
  });
  debugger;
  return (
    <>
      <h2>I am a single exercise</h2>
      <div>Exercise name: {name}</div>
      <div>Working weight: {weight}</div>
      <div>Rep goal: {repGoal}</div>
      <div>Number of sets: {numSets}</div>
      <div>Completed reps: {repsArr}</div>
    </>
  );
}
