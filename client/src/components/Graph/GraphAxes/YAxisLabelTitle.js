import React from "react";

export default function YAxisLabelTitle({ graphLayoutProps }) {
  const { axisOffset, yRange } = graphLayoutProps;
  return (
    <text
      x={(2 * axisOffset) / 5}
      y={yRange / 2}
      className="label-title y-label-title"
      style={{
        transformOrigin: `${axisOffset / 2}px ${yRange / 2}px`,
      }}
    >
      Weight (lbs)
    </text>
  );
}
