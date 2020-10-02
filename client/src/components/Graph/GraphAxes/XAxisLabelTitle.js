import React from "react";

export default function XAxisLabelTitle({ graphLayoutProps }) {
  const { axisOffset, width, height } = graphLayoutProps;

  return (
    <text
      x={width / 2}
      y={height - (2 * axisOffset) / 5}
      className="label-title x-label-title"
    >
      Date
    </text>
  );
}
