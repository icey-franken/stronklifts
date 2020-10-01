import React from "react";
import { plotDateFormat } from "../../utils/Formatter";

export default function XAxisLabels({ userDayDiff, graphLayoutProps }) {
  // generate x axis labels based on current day and userDayDiff input
  //TODO: add logic that changes dates to months if 3month view selected?

  const { axisOffset, xRange, height } = graphLayoutProps;

  const makeXLabels = (dateRange) => {
    // const startDateMs = nowMs - msPerDay * dateRange;
    // const numXLabels = Math.floor(width/100);
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days

    const numXLabels = 8;
    let xLabelSpacing = msPerDay;
    let i = 7;
    while (dateRange > i) {
      xLabelSpacing += msPerDay;
      i += 7;
    }
    let dateLabels = [];
    for (let i = 0; i < numXLabels; i++) {
      dateLabels.unshift(plotDateFormat(nowMs - i * xLabelSpacing));
    }
    return dateLabels;
  };

  //we call makeXLabels in the return so that the labels are regenerated on each render.
  //once I put stuff in the store I can do things differently. For now, this works just fine.
  return makeXLabels(userDayDiff).map((date, index, dateLabels) => {
    return (
      <text
        className="x-label"
        key={index}
        x={axisOffset + (xRange / (dateLabels.length - 1)) * index}
        y={height - (3 * axisOffset) / 4}
        style={{
          transformOrigin: `${
            axisOffset + (xRange / (dateLabels.length - 1)) * index
          }px ${height - (3 * axisOffset) / 4}px`,
        }}
      >
        {date}
      </text>
    );
  });
}
