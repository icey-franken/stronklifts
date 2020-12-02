import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colors = {
  text: "white",
  backgroundColor: "rgb(210,46,46)",
  backgroundHover: "rgb(240,46,46)",
  backgroundDisabled: "rgba(210,46,46,0.5)",
};

//use styles is a "poke" make from invoking makeStyles with an object
const useStyles = makeStyles({
  //define different ways we can style the button
  root: {
    "font-size": "1.4rem",
    color: colors.text,
    backgroundColor: colors.backgroundColor, //I think colors has our defaults e.g. color and then here we define customs e.g. background color for root. Root is on button - some material UI stuff
    "&:hover": {
      backgroundColor: colors.backgroundHover,
    },
    "&:disabled": {
      color: colors.text,
      backgroundColor: colors.backgroundDisabled,
		},
		margin: '8px 0',
  },
});

export default function MyButton(props) {
  //use useStyles hook - returns root object from above
  const classes = useStyles();
  return (
    <Button
      classes={classes} //this is how we pass in our custom styling from make styles/use styles
      {...props}
    />
  );
}
