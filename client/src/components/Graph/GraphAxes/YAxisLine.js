import React from "react";

export default function YAxisLine({graphLayoutProps}) {
	const {axisOffset, yRange, width} = graphLayoutProps;
	return (
    <g className="grid y-grid" id="yGrid">
      <line x1={axisOffset} x2={width} y1={yRange} y2={yRange} />
    </g>
  );
}
