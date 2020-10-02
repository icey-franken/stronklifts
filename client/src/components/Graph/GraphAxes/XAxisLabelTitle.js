import React from "react";
import { useSelector } from "react-redux";

export default function XAxisLabelTitle() {
  const { axisOffset, width, height } = useSelector(
    (state) => state.graph.layout
  );
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
