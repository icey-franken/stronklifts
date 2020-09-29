import React from "react";
import "./Graph.css";
import { plotDateFormat } from "./utils/Formatter";

export default function Graph({ dataPoints }) {
	const exerciseName = dataPoints.shift();

	//eventually userDayDiff will be a selectable button available to the user. Hard code for now.
	const userDayDiff = 15;
	const msPerDay = 8.64e+7;

	//goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
  const width = 750;
  const height = 700;
	//margin and axisOffset will probably remain constant
	const margin = 50;
	const axisOffset = 100;
	//plot ranges are based on previous inputs!
  const yRange = height - axisOffset-margin;
  const xRange = width - axisOffset-margin;

	//make dummy graph lines so I can see what's happening
	let dummyLines = [];
	let i = 0;
	while (i * 100<=xRange){
		dummyLines.push(axisOffset + i * 100);
		i++
	}

	//step sizes for axis labels
  const xSteps = 5;
  const xStep = (xRange - axisOffset) / xSteps;

  // const yMin = 400;
  // const yMax = height - axisOffset;
  // const ySteps = 5;
  // const yStep = (yMax - yMin) / ySteps;

  // const height = yMax - yMin + 150;
  // const width = xMax - axisOffset + 150;

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
    const dayDiff = (now - date) / msPerDay;
    if (dayDiff < userDayDiff) {
			xDataDate.push(date); //necessary?
			console.log(dayDiff, userDayDiff)
      xDataIdx.push(1 - dayDiff / userDayDiff);
      yDataWeight.push(weight); //necessary?
      return [...result, [date, weight]];
    } else {
      return [...result];
    }
  }, []);
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
  //The x position will be that value times (xMax-axisOffset), plus axisOffset.

  //dummy hard coded date labels
  const dateLabels = ["jan", "feb", "mar", "apr", "may", "jun", 'jul'];

  // const weightLabels = [0, 5, 10, 15, 20, 25, 30];

//this is for generating date labels
console.log(plotDateFormat(now));
xDataDate.forEach(date=>{
	console.log('start date?', plotDateFormat(now-msPerDay*userDayDiff))
	console.log('ms between now and workout date', now-date);
	console.log('ms now - since 1970?', now);
	console.log('ms in user day diff', msPerDay*userDayDiff);
	console.log('beginning of valid ms range based on user day diff', now - msPerDay*userDayDiff);
})

	//the below code is for generating suitable y data labels
	//make the incrementing smarter instead of caveman style - later
  const weightRange = maxWeight - minWeight;
	const numWeightIncrements = Math.floor(weightRange / 5);
	let numYLabels =10;
	if(numWeightIncrements<numYLabels) {
		numYLabels = numWeightIncrements;
	};
	let yLabelSpacing = 5;
	i = 5;
	while(numWeightIncrements<i) {
		yLabelSpacing = i
		i+=5;
	}
  let weightLabels = [];
  // for (let i = 0; i <= numYLabels; i++) {
  //   weightLabels.push(minWeight + i * yLabelSpacing);
  // }
  for (let i = 0; i <= numYLabels; i++) {
    weightLabels.push(minWeight + i * yLabelSpacing);
  }

  console.log(weightLabels);

  //map xDataIdx and yDataIdx to actual data points based on min/max/range values
  let xDataNum = xDataIdx.map((x) => axisOffset + (xRange) * x);
  let yDataNum = yDataIdx.map((y) => (1 - y) * (height - axisOffset));
  console.log(xDataIdx, xDataNum);
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
          <line x1={axisOffset} x2={axisOffset} y1="0" y2={margin+yRange} />
        </g>
        <g className="grid y-grid" id="yGrid">
          <line x1={axisOffset} x2={width} y1={margin+yRange} y2={margin+yRange} />
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
        <g className="labels x-labels">
          {dateLabels.map((date, index) => {
            return (
              <text
                key={index}
                x={axisOffset + xStep * index}
                y={height - (3 * axisOffset) / 4}
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
                y={margin+yRange * (1 - index / (weightLabels.length - 1))}
              >
                {weight}
              </text>
            );
          })}

          <text
            x={axisOffset / 2}
            y={(yRange) / 2}
            className="label-title y-label-title"
            style={{
              transformOrigin: `${(2 * axisOffset) / 5}px ${
                (yRange) / 2
              }px`,
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
