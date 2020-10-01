import React from "react";

export default function XAxisLabels({ dateLabels, graphLayoutProps }) {
	const {axisOffset, xRange, height} = graphLayoutProps;
  return dateLabels.map((date, index) => {
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
