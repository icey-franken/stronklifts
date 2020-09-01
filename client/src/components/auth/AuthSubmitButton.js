import React from "react";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colors = {
  text: "white",
	backgroundColor: "rgb(210,46,46)",
	backgroundHover: 'rgb(240,46,46)',
	backgroundDisabled: 'rgba(210,46,46,0.5)',
};

//styling used for buttons on stronglifts page
//I think it looks like shit but this is what they use
// const colors2 = {
// 	text: '#000000',
// 	backgroundColor: "rgb(255, 196, 85)",
// 	borderBottom: "2px solid #000",
//   borderRadius: "5px",
// 	backgroundHover: "rgb(255, 165, 0)"
// };



//use styles is a "poke" make from invoking makeStyles with an object
const useStyles = makeStyles({
  //define different ways we can style the button
  root: {
    color: colors.text,
		backgroundColor: colors.backgroundColor, //I think colors has our defaults e.g. color and then here we define customs e.g. background color for root. Root is on button - some material UI stuff
		"&:hover": {
			backgroundColor: colors.backgroundHover,
		},
		"&:disabled":{
			color: colors.text,
			backgroundColor:colors.backgroundDisabled,
		}
  },
});

export default function AuthSubmitButton(props) {
  //use useStyles hook - returns root object from above
  const classes = useStyles();
  return (
    <Button
      classes={classes} //this is how we pass in our custom styling from make styles/use styles
      variant="contained"
      color="primary"
			size="large"
			type="submit"
      {...props}
      //confused - we're passing in props but we have variant color and size assigned to the button in LoginPage.js AND here as well. Why both if we're passing props? Are variant color and size not considered props? --- yes - I was too fast - SM later deleted variant color and size from LoginPage AuthSubmitButton
    />
  );
}
