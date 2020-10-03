import React from "react";
import {
  AxisLines,
  XAxisLabels,
  XAxisLabelTitle,
  YAxisLabels,
  YAxisLabelTitle,
} from ".";

export default function GraphAxes() {

  //again - I am doing too much threading. I should add this stuff to the store and grab from there in my next refactor.
  return (
    <>
      <AxisLines />
      <g className="labels">
        <XAxisLabels />
        <XAxisLabelTitle />
      </g>
      <g className="labels">
        <YAxisLabels  />
        <YAxisLabelTitle />
      </g>
    </>
  );
}
