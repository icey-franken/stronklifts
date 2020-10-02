import React from "react";
import { useSelector } from "react-redux";

export default function YAxisLabels() {
	const { axisOffset, height } = useSelector((state) => state.graph.layout);
	const {weightRange} = useSelector(state=>state.graph.range)
  const yRange = height - axisOffset;
  // generate y axis labels based on min and max weight values
  //TODO: implement a user option to view a zoomed in plot or a plot from 0 to max weight.
  const makeYLabels = ([minWeight, maxWeight]) => {
    const numYLabels = Math.floor(yRange / 50);
    let numHiddenLabels = 0;
    let i = 5;
    while ((maxWeight - minWeight) / i > numYLabels) {
      //6 is max num labels
      i += 5;
      numHiddenLabels++;
    }
    let counter = 0;
    let weightLabels = [];
    for (let val = minWeight; val <= maxWeight; val += 5) {
      //eliminates topmost label being cut off
      //allows weightLabels array length to be as expected without displaying too many labels
      counter === 0 && val < maxWeight
        ? weightLabels.push(val)
        : weightLabels.push("");
      counter >= numHiddenLabels ? (counter = 0) : counter++;
    }
    return weightLabels;
  };

  return makeYLabels(weightRange).map((weight, index, weightLabels) => {
    return (
      <text
        className="y-label"
        key={index}
        x={(3 * axisOffset) / 4}
        y={yRange * (1 - index / (weightLabels.length - 1))}
      >
        {weight}
      </text>
    );
  });
}
