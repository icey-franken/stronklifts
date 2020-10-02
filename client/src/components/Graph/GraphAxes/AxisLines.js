import React from "react";
import { useSelector } from "react-redux";

export default function AxisLines() {
  const { axisOffset, width, height } = useSelector(
    (state) => state.graph.layout
  );
  const yRange = height - axisOffset;

  return (
    <>
      <g className="grid x-grid" id="xGrid">
        <line x1={axisOffset} x2={axisOffset} y1="0" y2={yRange} />
      </g>
      <g className="grid y-grid" id="yGrid">
        <line x1={axisOffset} x2={width} y1={yRange} y2={yRange} />
      </g>
    </>
  );
}
