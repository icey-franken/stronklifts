import React, { useState } from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SLLogo from "../components/auth/SLLogo";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import "./NewLifterForm.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { createWorkoutThunk } from "../store/workouts";
import { Redirect } from "react-router-dom";
import ActiveWorkout from '../pages/ActiveWorkout';

//lifted from auth page - in the future you should integrate this as an option
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "18px",
  },
});

export default function NewLifterForm() {
  const userId = useSelector((state) => state.auth.id);
  //add workingWeight and exerciseNames to store - hack for now
  // const [squatWW, setSquatWW] = useState(45);
  // const [ohpWW, setOHPWW] = useState(45);
  // const [dlWW, setDlWW] = useState(95);
  // const [bpWW, setBpWW] = useState(45);
  // const [prWW, setPrWW] = useState(45);
  const [WW, setWW] = useState(false);
  const squatState = useState(10);
  const ohpState = useState(10);
  const dlState = useState(20);
  const bpState = useState(10);
  const prState = useState(10);

  const wwStates = [squatState, ohpState, dlState, bpState, prState];
  console.log(wwStates[0][0]);

  const workingWeightIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const workingWeights = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  const exerciseNameIds = [1, 2, 3, 4, 5];
  const exerciseNames = [
    "Squat",
    "Overhead Press",
    "Deadlift",
    "Bench Press",
    "Pendlay Row",
  ];
  const recommendedStartingWeight = [45, 45, 95, 45, 45];
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch an event that sends a setStartingWeight which includes userId, exerciseNameId, workingWeightId
    const wwValues = [];
    wwStates.forEach((wwState) => wwValues.push(wwState[0]));
    console.log(wwValues);
    //dispatch(createWorkoutThunk(userId, wwState)
    await dispatch(createWorkoutThunk(userId, wwValues));
    setWW(true);
    // exerciseNameIds.forEach(async(exerciseNameId, index)=>{
    // await dispatch(setStartingWeightThunk(userId, exerciseNameId, wwStates[index][0]));
    // })
    //send them to the workout page for their first workout, using whatever values they selected.
    // const res = await dispatch(setStartingWeight())
  };

  const classes = useStyles();
  return (
    <>
      {WW ? (
        <ActiveWorkout />
      ) : (
        <Container fixed maxWidth="sm" classes={{ root: classes.container }}>
          <SLLogo />

          <h1>You're new here</h1>
          <h3>Please select your starting weights in the form below.</h3>
          <h3>
            You are strongly advised to use the recommended values if you do not
            have experience with these exercises.
          </h3>
          <h3>
            Remember: proper form is the name of the game. Working weights don't
            matter if you're injured.
          </h3>
          <h3>
            Click "Workout" in the navbar above if you'd like to get started
            with the recommended values.
          </h3>
          <form onSubmit={handleSubmit}>
            <h2>Working Weights</h2>
            {exerciseNames.map((exerciseName, index) => {
              return (
                <div className="inputItem" key={index}>
                  <InputLabel id={exerciseName}>
                    {exerciseName} (recommended:{" "}
                    {recommendedStartingWeight[index]} lbs)
                  </InputLabel>
                  <Select
                    labelId={exerciseName}
                    id="select"
                    value={wwStates[index][0]}
                    onChange={(e) => wwStates[index][1](e.target.value)}
                  >
                    {workingWeights.map((workingWeight, index) => {
                      return (
                        <MenuItem key={index} value={workingWeightIds[index]}>
                          {workingWeight} lbs
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              );
            })}
            <AuthSubmitButton>Get Started</AuthSubmitButton>
          </form>
        </Container>
      )}
    </>
  );
}
