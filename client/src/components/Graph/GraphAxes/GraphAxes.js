import React from "react";
import {
  AxisLines,
  XAxisLabels,
  XAxisLabelTitle,
  YAxisLabels,
  YAxisLabelTitle,
} from ".";

export default function GraphAxes({ graphAxesProps }) {
  const { graphLayoutProps, userDayDiff, minWeight, maxWeight } = graphAxesProps;
  //again - I am doing too much threading. I should add this stuff to the store and grab from there in my next refactor.
  return (
    <>
      <AxisLines graphLayoutProps={graphLayoutProps} />
      <g className="labels">
        <XAxisLabels
          userDayDiff={userDayDiff}
          graphLayoutProps={graphLayoutProps}
        />
        <XAxisLabelTitle graphLayoutProps={graphLayoutProps} />
      </g>
      <g className="labels">
        <YAxisLabels
					minWeight={minWeight}
					maxWeight={maxWeight}
          graphLayoutProps={graphLayoutProps}
        />
        <YAxisLabelTitle graphLayoutProps={graphLayoutProps} />
      </g>
    </>
  );
}
