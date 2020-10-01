import React from "react";

export default function YAxisLabels({ weightLabels, graphLayoutProps }) {
	const {axisOffset, yRange} = graphLayoutProps;

  return weightLabels.map((weight, index) => {
    return (
      <text
        className="y-label"
        key={index}
        x={(3 * axisOffset) / 4}
        y={yRange * (1 - index / (weightLabels.length - 1))}
      >
        {weight}
      </text>
    );
  });
}
