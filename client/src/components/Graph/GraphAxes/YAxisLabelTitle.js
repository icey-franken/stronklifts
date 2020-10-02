import React from "react";
import { useSelector } from "react-redux";

export default function YAxisLabelTitle() {
  const { axisOffset, height } = useSelector((state) => state.graph.layout);
  const yRange = height - axisOffset;
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
