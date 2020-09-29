import React from "react";
import "./Graph.css";
import {plotDateFormat} from './utils/Formatter';

export default function Graph({ dataPoints }) {
// take in userDayDiff as a prop - span of data they want to see.
//hard code for now
const userDayDiff = 30; //showing 30 days.

  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" values will be based on screen size.
  const exerciseName = dataPoints.shift();
  // console.log(dataPoints);

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
	function longDateFormat(date) {
		const dateFormat = new Intl.DateTimeFormat("en", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
		let dateArr;
		if (date === null) {
			dateArr = dateFormat.formatToParts(Date.now());
		} else {
			dateArr = dateFormat.formatToParts(new Date(date));
		}
		let dateStr = "";
		dateArr.forEach((el) => (dateStr += el.value));
		return dateStr
	}
	console.log(dataPoints);
	const now = Date.now();
	console.log(now);
	console.log(longDateFormat(now))

	const relevantDataPoints = [];
	dataPoints.forEach(([rawDate, weight])=>{
		const date = new Date(rawDate)
		const dayDiff = (now-date)/8.64e+7
		// console.log(dayDiff, ' days ago');
		if(dayDiff < userDayDiff) {
			//maybe format date here?
			//all I want is mm/dd
			relevantDataPoints.push([date, weight]);
		}
	})
	//sort relevant data points here - then to plotting
	//minimum date in plot based off of now - userDayDiff
	// console.log(relevantDataPoints);

	//convert dates to the format desired as plot labels.
	//	I might want to make my own plot labels so they can be regularly spaced - then labels will be based on max time span. I think that's the move....
	relevantDataPoints.map((dataTuple)=>{
		dataTuple[0] = plotDateFormat(dataTuple[0])
	})
	console.log(relevantDataPoints);


	//right before we get to the actual plot I think I want to split things to x and y to simplify mapping
	let xData = [];
	let yData = [];
	relevantDataPoints.forEach(([date, weight])=>{
		xData.push(date);
		yData.push(weight);
	})
	console.log(xData);
	console.log(yData);

  //dummy hard coded date labels
  const dateLabels = ["jan", "feb", "mar", "apr", "may", "jun"];

	const weightLabels = [0, 5, 10, 15, 20, 25, 30];


	//CIRCLE ELEMENTS
	// <circle cx='25' cy='75' r='20'/>
	// where cx and cy are position from center of circle and r is radius. All data points should be same size.
	//Consider hover effect of size increase; consider linking to that workout.
	//It WOULD be possible to use a complex path element to draw the graphs, but I think that since I have data points that that is extra work - INSTEAD I will use line elements.

	//LINE ELEMENTS
	//e.g. <line x1='10' y1='110' x2='50' y2='150' />
	//I can use these line elements to draw straight lines between each data point. That way, for each data point I can have a line (minus 1)

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
