import React from "react";
import { Grid, Container } from "@material-ui/core";

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
      {/* <Container maxWidth={false}> */}
      <Grid item xs={5}>
        <div>Exercise name: {name}</div>
      </Grid>
      <Grid container item xs={5}>
        <div>Completed reps: {repsArr}</div>
        <div>Working weight: {weight} lbs</div>
      </Grid>
      {/* <div>Rep goal: {repGoal}</div>
      <div>Number of sets: {numSets}</div> */}
      {/* </Container> */}
    </>
  );
}
