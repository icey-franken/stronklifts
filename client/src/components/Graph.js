import React from "react";
import "./Graph.css";

export default function Graph({ dataPoints }) {
  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" values will be based on screen size.
  const exerciseName = dataPoints.shift();
  console.log(dataPoints);

  const height = 500;
  const width = 500;

  const xAxisBase = 100;
  const xMin = 100;
	const xMax = 600;
	const xMid = (xMax-xMin)/2;
  const xSteps = 5;
  const xStep = (xMax - xMin) / xSteps;

  const yAxisBase = 500;
  const yMin = 400;
	const yMax = 900;
	const yMid = (yMax-yMin)/2;
  const ySteps = 5;
  const yStep = (yMax - yMin) / ySteps;

  //based on weight range we can pick y range. Maybe pick the max weight in the array and have y go from 0lbs to max weight - or have it auto adjust to minimum working weight in that range for max visibility

  //dummy hard coded date labels
  const dateLabels = ["jan", "feb", "mar", "apr", "may", "jun"];

	const weightLabels = [0, 5, 10, 15, 20, 25, 30];

  return (
    <>
      <div>I'm a graph for {exerciseName}</div>
      {/* <svg className="graph">
        <g className="grid x-grid">
					<line x1='90' x2='90' y1='5' y2='300'/>
				</g>

        <g className="grid y-grid">
					<line x1='90' x2='700' y1='300' y2='300'/>
				</g>
      </svg> */}
      <svg
        // version="1.2"
        // xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        className="graph"
        // aria-labelledby="title"
        width={width}
        height={height}
        role="img"
      >
        <title id="title">A line chart showing some information</title>
        <g className="grid x-grid" id="xGrid">
          <line x1="90" x2="90" y1="5" y2="371"></line>
        </g>
        <g className="grid y-grid" id="yGrid">
          <line x1="90" x2="705" y1="370" y2="370"></line>
        </g>
        <g className="labels x-labels">
          {dateLabels.map((date, index) => {
            return <text key={index} x={xMin + xStep * index} y={yAxisBase}>
              {date}
            </text>;
          })}
          <text x={xMid} y={yAxisBase+40} className="label-title">
            Date
          </text>
        </g>
        <g className="labels y-labels">
				{weightLabels.map((weight, index) => {
            return <text key={index} x={xAxisBase} y={xMax - xStep * index}>
              {weight}
            </text>;
          })}
{/*
          <text x="80" y="15">
            15
          </text>
          <text x="80" y="131">
            10
          </text>
          <text x="80" y="248">
            5
          </text>
          <text x="80" y="373">
            0
          </text> */}
          <text x={xAxisBase-120} y={yMid} className="label-title">
            Weight (lbs)
          </text>
        </g>
      </svg>
    </>
  );
}
