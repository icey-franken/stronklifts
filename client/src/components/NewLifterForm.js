import React, { useState } from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import SLLogo from "../components/auth/SLLogo";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import "./NewLifterForm.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { createWorkoutThunk, getWorkoutsThunk } from "../store/workouts";
import { Redirect } from "react-router-dom";
import ActiveWorkout from "../pages/ActiveWorkout";

//lifted from auth page - in the future you should integrate this as an option
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "18px",
  },
});

export default function NewLifterForm({ userId }) {
  // const userId = useSelector((state) => state.auth.id);
  //add workingWeight and exerciseNames to store - hack for now
  const [WW, setWW] = useState(false);
  const squatState = useState(10);
  const ohpState = useState(10);
  const dlState = useState(20);
  const bpState = useState(10);
  const prState = useState(10);
  const wwStates = [squatState, ohpState, dlState, bpState, prState];
  const workingWeightIds = [
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
  ];
  const workingWeights = [
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185,
    190,
    195,
    200,
    205,
    210,
    215,
    220,
    225,
    230,
    235,
    240,
    245,
  ];
  //for redux store / backend comm. - ignore for now
  // const exerciseNameIds = [1, 2, 3, 4, 5];
  const exerciseNames = [
    "Squat",
    "Overhead Press",
    "Deadlift",
    "Bench Press",
    "Pendlay Row",
  ];
  const recommendedStartingWeight = [45, 45, 95, 45, 45];
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch an event that sends a setStartingWeight which includes userId, exerciseNameId, workingWeightId
    const wwValues = [];
    wwStates.forEach((wwState) => wwValues.push(wwState[0]));
    //dispatch(createWorkoutThunk(userId, wwState)
    dispatch(createWorkoutThunk(userId, wwValues)).then(() =>
      dispatch(getWorkoutsThunk(userId))
    );
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
        <Redirect to="/workout" render={() => ActiveWorkout} />
      ) : (
        /* <ActiveWorkout />
        </Redirect> */
        <Container fixed maxWidth="sm" classes={{ root: classes.container }}>
          <SLLogo />

          <h1>Welcome to Stronklifts</h1>
          <div className="form__intro">
            Please select your starting weights in the form below.
            <p /> You are strongly advised to use the recommended values if you
            do not have experience with these exercises.
            <p />
            <span style={{ fontWeight: "bold" }}>Remember:</span> proper form is
            the name of the game. Impressive working weights don't matter if
            you're injured.
            <p />
            Click "Workout" in the navbar above if you'd like to get started
            with the recommended values.
            <p />
          </div>
          <Container fixed maxWidth="xs" classes={{ root: classes.container }}>
            <form onSubmit={handleSubmit}>
              <div className="form__title">Working Weights</div>
              {exerciseNames.map((exerciseName, index) => {
                return (
                  <div className="inputItem" key={index}>
                    <InputLabel className="inputItem__label" id={exerciseName}>
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
        </Container>
      )}
    </>
  );
}
