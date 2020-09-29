import React from "react";
import "./Graph.css";
import { plotDateFormat } from "./utils/Formatter";

export default function Graph({ dataPoints }) {
  const exerciseName = dataPoints.shift();//grab exercise name
	const nowMs = Date.now();//constant used for date range calcs
	const msPerDay = 8.64e7;//constant used to convert ms to days

  //eventually userDayDiff will be a selectable button available to the user. Hard code for now.
  //value MUST be >= 7
  const userDayDiff = 7;

	//goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
	//TODO: make these values dynamic
  const width = 750;
	const height = 700;

  //margin and axisOffset will probably remain constant
  const margin = 50;
	const axisOffset = 100;

  //plot ranges are based on previous inputs!
  const yRange = height - axisOffset - margin;
  const xRange = width - axisOffset - margin;

	//make dummy graph lines so I can see what's happening
	//DELETE once happy
  let dummyLines = [];
  let i = 0;
  while (i * 100 <= xRange) {
    dummyLines.push(axisOffset + i * 100);
    i++;
  }


  let xDataDate = [];//don't need
  let xDataIdx = [];
  let yDataWeight = [];
	let yDataIdx = [];
	//grab only data within the user selected userDayDiff range
	//put data in separate arrays for x and y data
	//Idx arrays are scalar values that will be used later on to generate Num arrays based on SVG size parameters.
  dataPoints.forEach(([sqlDate, weight]) => {
    const dateMs = new Date(sqlDate);
    const dayDiff = (nowMs - dateMs) / msPerDay;
    if (dayDiff < userDayDiff) {
      xDataDate.push(dateMs); //don't need xDataDate
      xDataIdx.push(1 - dayDiff / userDayDiff); //do this while we're here
      yDataWeight.push(weight);
    }
	});

  // generate x axis labels based on current day and userDayDiff input
  //TODO: add logic that changes dates to months if 3month view selected?
  const startDateMs = nowMs - msPerDay * userDayDiff;
  let numXLabels = 7;
  let xLabelSpacing = msPerDay;
  i = 7;
  while (userDayDiff > i) {
    xLabelSpacing += msPerDay;
    i += 7;
  }
  let dateLabels = [];
  for (let i = 0; i <= numXLabels; i++) {
    dateLabels.push(plotDateFormat(startDateMs + i * xLabelSpacing));
  }

  // generate y axis labels based on min and max weight values
	//TODO: implement a user option to view a zoomed in plot or a plot from 0 to max weight.
	const maxWeight = Math.max(...yDataWeight) + 5;
  const minWeight = Math.min(...yDataWeight) - 5;
  yDataWeight.forEach((weight) => {//generate weight scalar array
    yDataIdx.push((weight - minWeight) / (maxWeight - minWeight));
  });
  const weightRange = maxWeight - minWeight;
  const numWeightIncrements = Math.floor(weightRange / 5);
  let numYLabels = 10;
  if (numWeightIncrements < numYLabels) {
    numYLabels = numWeightIncrements;
  }
  let yLabelSpacing = 5;
  i = 5;
  while (numWeightIncrements < i) {
    yLabelSpacing = i;
    i += 5;
  }
  let weightLabels = [];
  for (let i = 0; i <= numYLabels; i++) {
    weightLabels.push(minWeight + i * yLabelSpacing);
  }

  //map xDataIdx and yDataIdx scalar arrays to actual data points based on SVG size
  let xDataNum = xDataIdx.map((x) => axisOffset + xRange * x);
  let yDataNum = yDataIdx.map((y) => (1 - y) * (height - axisOffset));

	return (
    <>
      <h1>I'm a graph for {exerciseName}</h1>
      <svg
        // version="1.2"
        // xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        className="graph"
        aria-labelledby='title'
        width={width}
        height={height}
        role="img"
      >
        <title id="title">A plot of {exerciseName.toUpperCase()} weight over time.</title>
        <g className="grid x-grid" id="xGrid">
          <line x1={axisOffset} x2={axisOffset} y1="0" y2={margin + yRange} />
        </g>
        <g className="grid y-grid" id="yGrid">
          <line
            x1={axisOffset}
            x2={width}
            y1={margin + yRange}
            y2={margin + yRange}
          />
        </g>
        {/* dummy lines to make life easier */}
        {dummyLines.map((xCoord, idx) => {
          return (
            <g key={idx} className="dummy-grid">
              <line
                x1={0}
                x2={1000}
                y1={dummyLines[idx]}
                y2={dummyLines[idx]}
              />
              <line x1={xCoord} x2={xCoord} y1={0} y2={1000} />
            </g>
          );
        })}
        <g className="labels">
          {dateLabels.map((date, index) => {
            return (
              <text
								className='x-label'
                key={index}
                x={axisOffset + (xRange / numXLabels) * index}
								y={height - (3 * axisOffset) / 4}
								style={{
									transformOrigin: `${axisOffset + (xRange / numXLabels) * index}px ${height - (3 * axisOffset) / 4}px`,
								}}
              >
                {date}
              </text>
            );
          })}
          <text
            x={width / 2}
            y={height - (2 * axisOffset) / 5}
            className="label-title x-label-title"
          >
            Date
          </text>
        </g>
        <g className="labels y-labels">
          {weightLabels.map((weight, index) => {
            return (
              <text
                key={index}
                x={(3 * axisOffset) / 4}
                y={margin + yRange * (1 - index / (weightLabels.length - 1))}
              >
                {weight}
              </text>
            );
          })}
          <text
            x={2*axisOffset / 5}
            y={yRange / 2}
            className="label-title y-label-title"
            style={{
              transformOrigin: `${(axisOffset) / 2}px ${yRange / 2}px`,
            }}
          >
            Weight (lbs)
          </text>
        </g>
        <g className="data-points">{buildGraph(xDataNum, yDataNum)}</g>
      </svg>
    </>
  );
}

function buildGraph(xDataNum, yDataNum) {
  console.log(xDataNum, yDataNum);

  let graphArr = [];
  for (let i = 0; i < xDataNum.length - 1; i++) {
    graphArr.push(
      <g key={i}>
        <circle
          key={i}
          className="data-point"
          cx={xDataNum[i]}
          cy={yDataNum[i]}
          r="5"
        />
        <line
          className="data-line"
          x1={xDataNum[i]}
          y1={yDataNum[i]}
          x2={xDataNum[i + 1]}
          y2={yDataNum[i + 1]}
        />
      </g>
    );
  }
  graphArr.push(
    <circle
      key={xDataNum.length - 1}
      className="data-point"
      cx={xDataNum[xDataNum.length - 1]}
      cy={yDataNum[xDataNum.length - 1]}
      r="5"
    />
  );
  return graphArr;
}

// function buildGraph(xDataNum, yDataNum) {
//   let graphStr = "";
//   for (let i = 0; i < xDataNum.length - 1; i++) {
//     graphStr += `<circle cx={${xDataNum[i]}} cy={${yDataNum[i]}} r="5" />
// 				<line
// 					x1={${xDataNum[i]}}
// 					y1={${yDataNum[i]}}
// 					x2={${xDataNum[i + 1]}}
// 					y2={${yDataNum[i + 1]}}
// 				/>`;
//   }
//   graphStr += (
//     `<circle
//       cx={${xDataNum[xDataNum.length - 1]}}
//       cy={${yDataNum[xDataNum.length - 1]}}
//       r="5"
//     />`
//   );
//   return graphStr;
// }

//CIRCLE ELEMENTS
// <circle cx='25' cy='75' r='20'/>
// where cx and cy are position from center of circle and r is radius. All data points should be same size.
//Consider hover effect of size increase; consider linking to that workout.
//It WOULD be possible to use a complex path element to draw the graphs, but I think that since I have data points that that is extra work - INSTEAD I will use line elements.

//LINE ELEMENTS
//e.g. <line x1='10' y1='110' x2='50' y2='150' />
//I can use these line elements to draw straight lines between each data point. That way, for each data point I can have a line (minus 1)
