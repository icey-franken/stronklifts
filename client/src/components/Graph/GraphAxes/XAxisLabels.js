import React from "react";
import { useSelector } from "react-redux";
import { plotDateFormat } from "../../utils/Formatter";

export default function XAxisLabels() {
  // generate x axis labels based on current day and userDayDiff input
  //TODO: add logic that changes dates to months if 3month view selected?
  const { dateRange } = useSelector((state) => state.graph.range);
  const { axisOffset, xMargin, width, height } = useSelector(
    (state) => state.graph.layout
  );

  const xRange = width - axisOffset - xMargin;

  const makeXLabels = (dateRange) => {
    // const startDateMs = nowMs - msPerDay * dateRange;
    // const numXLabels = Math.floor(width/100);
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    let numXLabels = 7;
    // console.log(dateRange);
    if (dateRange <= numXLabels) {
      numXLabels = dateRange;
    }
    // let xLabelSpacing = msPerDay;
    const xLabelSpacing = (dateRange / numXLabels) * msPerDay;
    // let i = 7;
    // while (dateRange > i) {
    //   xLabelSpacing += msPerDay;
    //   i += 7;
    // }
    let dateLabels = [];
    for (let i = 0; i < numXLabels; i++) {
      dateLabels.unshift(plotDateFormat(nowMs - i * xLabelSpacing));
    }
    return dateLabels;
  };

  //we call makeXLabels in the return so that the labels are regenerated on each render.
  //once I put stuff in the store I can do things differently. For now, this works just fine.

  const xLabels = Number.isNaN(dateRange) ? [] : makeXLabels(dateRange);
	const len = xLabels.length === 1 ? 1 : xLabels.length - 1;

  return xLabels.map((date, index) => {
    return (
      <text
        className="x-label"
        key={index}
        x={axisOffset + (xRange / len) * index}
        y={height - (3 * axisOffset) / 4}
        style={{
          transformOrigin: `${axisOffset + (xRange / len) * index}px ${
            height - (3 * axisOffset) / 4
          }px`,
        }}
      >
        {date}
      </text>
    );
  });
}
