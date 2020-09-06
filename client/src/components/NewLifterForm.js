import React from "react";
import { Select, InputLabel, MenuItem, Button } from "@material-ui/core";

import SLLogo from "../components/auth/SLLogo";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import "./NewLifterForm.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";


//lifted from auth page - in the future you should integrate this as an option
const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: '18px',
	},
});

export default function NewLifterForm() {
  //add workingWeight and exerciseNames to store - hack for now
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };



	const classes = useStyles();
  return (
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
      <form onSubmit={handleSubmit}>
        <h2>Working Weights</h2>
        {exerciseNames.map((exerciseName, index) => {
          return (
            <div key={index}>
              <InputLabel id={exerciseName}>
                {exerciseName} (recommended: {recommendedStartingWeight[index]}{" "}
                lbs)
              </InputLabel>
              <Select
                labelId={exerciseName}
                id="select"
                value={index === 2 ? 20 : 10}
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
  );
}
