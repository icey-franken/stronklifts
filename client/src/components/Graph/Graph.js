import React, { useState, useEffect } from "react";
import "./Graph.css";
import { plotDateFormat } from "../utils/Formatter";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";

export default function Graph({ dataPoints, exerciseName }) {
  //whenever userDayDiff is changed the entire component rerenders
  // this is how I got the buttons to work properly
  const [userDayDiff, setUserDayDiff] = useState("7");
  const [userExDisp, setUserExDisp] = useState(["sq"]);
  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
  //TODO: make these values dynamic
  const width = 600;
  const height = 500;

  //margin and axisOffset will probably remain constant
  const xMargin = 50;
  const axisOffset = 70;

  //plot ranges are based on previous inputs!
  const yRange = height - axisOffset;
  const xRange = width - axisOffset - xMargin;

  //these are recreated on every rerender - makes sense.
  //slight optimization would be to check if max/min weights change - then we don't need to change any y data, but this is a slight improvement and not worth the effort right now.
  let [
    dateLabels,
    mappedDateData,
    weightLabels,
    mappedWeightData,
  ] = grabDataForUserDayDiff(userDayDiff, dataPoints);

  //add pressed class to 1W day diff and squat ex disp options on initial page load
  useEffect(() => {
    const defaultRange = document.getElementById(userDayDiff);
    defaultRange.classList.add("user-day-diff__option--pressed");
    const defaultExercise = document.getElementById(userExDisp[0]);
    defaultExercise.classList.add("user-day-diff__option--pressed");
  }, []);

  //grab only data within the user selected userDayDiff range
  //put data in separate arrays for x and y data
  //Idx arrays are scalar values that will be used later on to generate Num arrays based on SVG size parameters.
  function grabDataForUserDayDiff(userDayDiff, dataPoints) {
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    // let xDataDate = []; //don't need
    let xDataIdx = [];
    let yDataWeight = [];
    let yDataIdx = [];
    dataPoints.forEach(([sqlDate, weight]) => {
      const dateMs = new Date(sqlDate);
      const dayDiff = (nowMs - dateMs) / msPerDay;
      if (dayDiff < userDayDiff) {
        // xDataDate.push(dateMs); //don't need xDataDate
        xDataIdx.push(1 - dayDiff / userDayDiff); //do this while we're here
        yDataWeight.push(weight);
      }
    });
    //at this point we have xDataIdx array and yDataWeight array
    //we need full yDataWeight array in order to construct yDataIdx
    //we can do that here:
    const maxWeight = Math.max(...yDataWeight) + 5;
    const minWeight = Math.min(...yDataWeight) - 5;
    yDataWeight.forEach((weight) => {
      //generate weight scalar array
      yDataIdx.push((weight - minWeight) / (maxWeight - minWeight));
    });
    //NEED WEIGHT LABELS AND DATELABELS ARRAY
    return [
      makeXLabels(userDayDiff),
      mapXIdxToDataPoints(xDataIdx),
      makeYLabels(minWeight, maxWeight),
      mapYIdxToDataPoints(yDataIdx),
    ];
  }

  // generate x axis labels based on current day and userDayDiff input
  //TODO: add logic that changes dates to months if 3month view selected?
  function makeXLabels(dateRange) {
    // const startDateMs = nowMs - msPerDay * dateRange;
    // const numXLabels = Math.floor(width/100);
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days

    const numXLabels = 8;
    let xLabelSpacing = msPerDay;
    let i = 7;
    while (dateRange > i) {
      xLabelSpacing += msPerDay;
      i += 7;
    }
    let dateLabels = [];
    for (let i = 0; i < numXLabels; i++) {
      dateLabels.unshift(plotDateFormat(nowMs - i * xLabelSpacing));
    }
    return dateLabels;
  }

  // generate y axis labels based on min and max weight values
  //TODO: implement a user option to view a zoomed in plot or a plot from 0 to max weight.
  function makeYLabels(minWeight, maxWeight) {
    const numYLabels = Math.floor(yRange / 50);
    let numHiddenLabels = 0;
    let i = 5;
    while ((maxWeight - minWeight) / i > numYLabels) {
      //6 is max num labels
      i += 5;
      numHiddenLabels++;
    }
    let counter = 0;
    let weightLabels = [];
    for (let val = minWeight; val <= maxWeight; val += 5) {
      //eliminates topmost label being cut off
      //allows weightLabels array length to be as expected without displaying too many labels
      counter === 0 && val < maxWeight
        ? weightLabels.push(val)
        : weightLabels.push("");
      counter >= numHiddenLabels ? (counter = 0) : counter++;
    }
    return weightLabels;
  }

  //map xDataIdx and yDataIdx scalar arrays to actual data points based on SVG size
  function mapXIdxToDataPoints(xDataIdx) {
    return xDataIdx.map((x) => axisOffset + xRange * x);
  }

  function mapYIdxToDataPoints(yDataIdx) {
    return yDataIdx.map((y) => (1 - y) * yRange);
  }

  //I think this check is no longer necessary.
  // if (!mappedDateData) {
  //   return null;
  // }

  //build functions that create the axis in html later

  // color change based on if first weight value is greater/less than last weight value.

  const graphAxesProps = {
    graphLayoutProps: { axisOffset, xRange, yRange, height, width },
    dateLabels,
    weightLabels,
  };
  const userOptionsProps = {
    userDayDiff,
    setUserDayDiff,
    userExDisp,
    setUserExDisp,
  };
  return (
    <div className="graph-container">
      <div className="graph-info">
        <div className="graph-info__title">{exerciseName}</div>
        <div className="graph-info__weight">
          {dataPoints[dataPoints.length - 1][1]} lbs
        </div>
      </div>
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
        <title id="title">A plot of {exerciseName} weight over time.</title>
        <GraphAxes graphAxesProps={graphAxesProps} />
        <GraphPlotArea
          mappedDateData={mappedDateData}
          mappedWeightData={mappedWeightData}
        />
      </svg>
      <UserOptions userOptionsProps={userOptionsProps} />
    </div>
  );
}

//CIRCLE ELEMENTS
// <circle cx='25' cy='75' r='20'/>
// where cx and cy are position from center of circle and r is radius. All data points should be same size.
//Consider hover effect of size increase; consider linking to that workout.
//It WOULD be possible to use a complex path element to draw the graphs, but I think that since I have data points that that is extra work - INSTEAD I will use line elements.

//LINE ELEMENTS
//e.g. <line x1='10' y1='110' x2='50' y2='150' />
//I can use these line elements to draw straight lines between each data point. That way, for each data point I can have a line (minus 1)

//DUMMY GRID LINES FROM GRAPH CONSTRUCTION
//make dummy graph lines so I can see what's happening
//DELETE once happy
// let dummyXLines = [];
// let dummyYLines = [];
// let i = 0;
// while (i<= Math.floor(width/100)) {
//   dummyXLines.push(axisOffset + i * xRange/Math.floor(width/100));
//   i++;
// }
// i = 0;
// while (i <= Math.floor(height/50)) {
//   i++;
//   dummyYLines.push(i * yRange/Math.floor(yRange/50));
// }
//JSX DUMMY LINE STUFF
// {/* dummy lines to make life easier */}
// {dummyXLines.map((xCoord, idx) => {
// 	return (
// 		<g key={idx} className="dummy-grid">
// 			<line x1={xCoord} x2={xCoord} y1={0} y2={1000} />
// 		</g>
// 	);
// })}
// {dummyYLines.map((yCoord, idx) => {
// 	return (
// 		<g key={idx} className="dummy-grid">
// 			<line x1={0} x2={1000} y1={yCoord} y2={yCoord} />
// 		</g>
// 	);
// })}
