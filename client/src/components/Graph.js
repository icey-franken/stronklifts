import React from "react";
import "./Graph.css";
import { plotDateFormat } from "./utils/Formatter";

export default function Graph({ dataPoints }) {
  // take in userDayDiff as a prop - span of data they want to see.
  //hard code for now
  const userDayDiff = 1; //showing 30 days.
  // const maxWeight =
  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" values will be based on screen size.
  const exerciseName = dataPoints.shift();
  // console.log(dataPoints);

  const dummyXLines = [100, 200, 300, 400, 500, 600];
  const dummyYLines = [100,200,300,400, 500, 600];
  const xAxisBase = 100;
  const xMin = 100;
  const xMax = 600;
  const xRange = xMax - xMin;
  const xMid = (xMax - xMin) / 2;
  const xSteps = 5;
  const xStep = (xMax - xMin) / xSteps;

  const yAxisBase = 550;
  const yMin = 400;
  const yMax = 900;
  const yRange = yMax - yMin;
  const yMid = (yMax - yMin) / 2;
  const ySteps = 5;
  const yStep = (yMax - yMin) / ySteps;

  const height = yMax - yMin + 150;
  const width = xMax - xMin + 150;

  //based on weight range we can pick y range. Maybe pick the max weight in the array and have y go from 0lbs to max weight - or have it auto adjust to minimum working weight in that range for max visibility
  const now = Date.now();
  let xDataIdx = [];
  let xDataDate = [];
  let yDataWeight = [];
  let yDataIdx = [];
  //can't decide if I want all data in an array of an array, or multiple single level arrays for each data type. Both for now.
  //if multiple single level - only need for each loop. Otherwise use reduce function.
  const relevantDataPoints = dataPoints.reduce((result, [rawDate, weight]) => {
    const date = new Date(rawDate);
    const dayDiff = (now - date) / 8.64e7;
    if (dayDiff < userDayDiff) {
      xDataDate.push(date); //necessary?
      xDataIdx.push(dayDiff / userDayDiff);
      yDataWeight.push(weight); //necessary?
      return [...result, [date, weight]];
    } else {
      return [...result];
    }
  }, []);
  console.log(relevantDataPoints);
  console.log(xDataDate);
  console.log(xDataIdx);
  console.log(yDataWeight);
  const maxWeight = Math.max(...yDataWeight) + 5;
  const minWeight = Math.min(...yDataWeight) - 5;
  yDataWeight.forEach((weight) => {
    yDataIdx.push((weight - minWeight) / (maxWeight - minWeight));
  });
  console.log(yDataIdx);
  //minimum date in plot based off of now - userDayDiff
  // console.log(relevantDataPoints);

  //convert dates to the format desired as plot labels.
  //	I might want to make my own plot labels so they can be regularly spaced - then labels will be based on max time span. I think that's the move....
  //	starting plot label is now - userDayDiff; ending plot label is now; labels in between are based off of size i.e. how many I can fit reasonably.
  //	use plotDateFormat function to generate suitable labels

  //(workoutDate - now)/userDayDiff will give a value between 0 and 1.
  //The x position will be that value times (xMax-xMin), plus xMin.

  //dummy hard coded date labels
  const dateLabels = ["jan", "feb", "mar", "apr", "may", "jun"];

  // const weightLabels = [0, 5, 10, 15, 20, 25, 30];

  //the below code is for generating suitable y data labels
  let numYLabels = 5;
  const weightRange = maxWeight - minWeight;
  const maxNumYLabels = Math.floor(weightRange / 5);
  let yLabelSpacing = maxNumYLabels;
  if (maxNumYLabels < 5) {
    numYLabels = maxNumYLabels;
    yLabelSpacing = 5;
  }
  let weightLabels = [];
  for (let i = 0; i <= numYLabels; i++) {
    weightLabels.push(minWeight + i * yLabelSpacing);
  }
  console.log(weightLabels);

  //map xDataIdx and yDataIdx to actual data points based on min/max/range values
  let xDataNum = xDataIdx.map((x) => xMax - x * xRange);
  let yDataNum = yDataIdx.map((y) => yMin - y * yRange);
  console.log(xDataIdx, yDataIdx);
  const yLabelXPos = `${xAxisBase - 80}px`;
  const yLabelYPos = `${(yMax - yAxisBase) / 2}px`;
  console.log(yLabelXPos, yLabelYPos);
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
        aria-labelledby="title"
        width={width}
        height={height}
        role="img"
      >
        <title id="title">A line chart showing some information</title>
        <g className="grid x-grid" id="xGrid">
          <line x1={xAxisBase} x2={xAxisBase} y1="0" y2={yAxisBase} />
        </g>
        <g className="grid y-grid" id="yGrid">
          <line x1={xAxisBase} x2={xMax} y1={yAxisBase} y2={yAxisBase} />
        </g>
        {/* dummy lines to make life easier */}
        {dummyXLines.map((xCoord, idx) => {
          return (
            <g key={idx} className='dummy-grid'>
                <line
                  x1={0}
                  x2={1000}
                  y1={dummyYLines[idx]}
                  y2={dummyYLines[idx]}
                />
                <line x1={xCoord} x2={xCoord} y1={0} y2={1000} />
            </g>
          );
        })}
        <g className="labels x-labels">
          {dateLabels.map((date, index) => {
            return (
              <text key={index} x={xMin + xStep * index} y={yAxisBase + 20}>
                {date}
              </text>
            );
          })}
          <text
            x={xMid + xAxisBase / 2}
            y={yAxisBase + 40}
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
                x={xAxisBase - 20}
                y={yMin - yStep * (index - 1)}
              >
                {weight}
              </text>
            );
          })}

          <text
            x={yLabelXPos}
            y={yLabelYPos}
            className="label-title y-label-title"
            style={{ transformOrigin: `${yLabelXPos} ${yLabelYPos}` }}
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
