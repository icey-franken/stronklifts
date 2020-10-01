import React, { useState, useEffect } from "react";
import "./Graph.css";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";

export default function Graph({
  dataPointsArr,
  exerciseNamesArr
}) {
	const dataPoints = dataPointsArr[0];
	const exerciseName = exerciseNamesArr[0];

	//whenever userDayDiff is changed the entire component rerenders
  // this is how I got the buttons to work properly
  const [userDayDiff, setUserDayDiff] = useState("7");
  const [userExDisp, setUserExDisp] = useState(["sq"]);

  //add pressed class to 1W day diff and squat ex disp options on initial page load
  useEffect(() => {
    const defaultRange = document.getElementById(userDayDiff);
    defaultRange.classList.add("user-day-diff__option--pressed");
    const defaultExercise = document.getElementById(userExDisp[0]);
    defaultExercise.classList.add("user-day-diff__option--pressed");
  }, []);

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //SET GRAPH LAYOUT PROPS
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

  //bundle values together to be sent to nested components
  const graphLayoutProps = { axisOffset, xRange, yRange, height, width };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //DEFINE FUNCTIONS TO BE USED IN GRAPH CONSTRUCTION

  //GRAB RELEVANT DATA POINTS BASED ON USER INPUT AND SPLIT------
  //extract only data relevant to the selected userDayDiff
  function grabRelevantDataPoints(userDayDiff, dataPoints) {
    if (userDayDiff === "ALL") {
      return dataPoints;
    }
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    //dataPoints array is sorted from oldest to most recent workout.
    //so, start at end of datapoints array and find index at which dayDiff is greater than userDayDiff
    //slice dataPoints from there and return that - that is your relevant dataPoints array.
    const calcDayDiff = (index) => {
      //so that error not thrown when checking oldest data point
      if (index >= 0) {
        return (nowMs - new Date(dataPoints[index][0])) / msPerDay;
      }
    };
    //consider changing from checking based on ms to checking based on day (e.g. so that a lift that happened early in the morning 7 days ago isn't excluded if graph used at night - for now it's fine)
    let i = dataPoints.length - 1;
    let dayDiff = calcDayDiff(i);
    while (dayDiff < userDayDiff && i >= 0) {
      i--;
      dayDiff = calcDayDiff(i);
    }
    //if i goes down to -1 (all workouts valid) then we end up returning the entire dataPoints array.
    return dataPoints.slice(i + 1);
  }
  //separate date and weight to use in generating data idx arrays
  function separateDateAndWeight(relevantDataPoints) {
    let xDataDate = [];
    let yDataWeight = [];
    relevantDataPoints.forEach(([date, weight]) => {
      xDataDate.push(date);
      yDataWeight.push(weight);
    });
    return [xDataDate, yDataWeight];
  }

  function calculateDateRange(userDayDiff, oldestDate) {
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    let dateRange = userDayDiff;
    if (userDayDiff === "ALL") {
      const dateMs = new Date(oldestDate);
      dateRange = (nowMs - dateMs) / msPerDay + 1;
    }
    return dateRange;
  }

  //GENERATE IDX ARRAYS FROM RELEVANT DATA---------------------
  //Idx arrays are scalar values that will be used later on to generate Num arrays based on SVG size parameters.
  //use relevant date data points to construct xDataIdx
  function generateXDataIdx(xDataDate, dateRange) {
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    let xDataIdx = [];
    xDataDate.forEach((sqlDate) => {
      const dateMs = new Date(sqlDate);
      const dayDiff = (nowMs - dateMs) / msPerDay;
      xDataIdx.push(1 - dayDiff / dateRange);
    });
    return xDataIdx;
  }
  //use relevant weight data points to construct xDataIdx
  function generateYDataIdx(yDataWeight, minWeight, maxWeight) {
    let yDataIdx = [];
    yDataWeight.forEach((weight) => {
      //generate weight scalar array
      yDataIdx.push((weight - minWeight) / (maxWeight - minWeight));
    });
    return yDataIdx;
  }

  //MAP IDX ARRAYS TO DATA POINTS-------------------------------
  //map xDataIdx and yDataIdx scalar arrays to actual data points based on SVG size
  function mapXIdxToDataPoints(xDataIdx) {
    return xDataIdx.map((x) => axisOffset + xRange * x);
  }
  function mapYIdxToDataPoints(yDataIdx) {
    return yDataIdx.map((y) => (1 - y) * yRange);
  }

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //USE FUNCTIONS TO CALCULATE VALUES-------------------------
	//data points will eventually be an array - we will grab relevant data points for each array.
	//it might be smarter to separate relevant datapoints in upper component but this will work for now
	const relevantDataPoints = grabRelevantDataPoints(userDayDiff, dataPoints);
  const [xData, yData] = separateDateAndWeight(relevantDataPoints);
	const dateRange = calculateDateRange(userDayDiff, xData[0]);
	//TODO - update these so that it selects the very max weight based on all selected exercises

	const minWeight = Math.min(...yData) - 5;
	const maxWeight = Math.max(...yData) + 5;
  const xDataIdx = generateXDataIdx(xData, dateRange);
  const yDataIdx = generateYDataIdx(yData, minWeight, maxWeight);
  const mappedDateData = mapXIdxToDataPoints(xDataIdx);
  const mappedWeightData = mapYIdxToDataPoints(yDataIdx);

  // const relevantDataPoints2 = grabRelevantDataPoints(userDayDiff, dataPoints2);
	// const [xData2, yData2] = separateDateAndWeight(relevantDataPoints2);
	// const minWeight2 = Math.min(...yData2) - 5;
	// const maxWeight2 = Math.max(...yData2) + 5;
  // // const dateRange = calculateDateRange(userDayDiff, xData[0]);
  // const xDataIdx2 = generateXDataIdx(xData2, dateRange);
  // const yDataIdx2 = generateYDataIdx(yData2, minWeight2, maxWeight2);
  // const mappedDateData2 = mapXIdxToDataPoints(xDataIdx2);
  // const mappedWeightData2 = mapYIdxToDataPoints(yDataIdx2);

  //from that, generate multiple GraphPlotArea components
  //each graph plot area component should have a check that determines exercise name or something and based on that the color of the plot is altered
  //the kicker now is determining the axes to use based on dayDiff and min/max weight.
  //THE POINT: multiple GraphPlotArea components stack perfectly well.

  //create a GraphOverlay component that renders multiple GraphPlotArea components based on the input
  //the input to graph overlay will be:
  //an array with [[mappedDateData, mappedWeightData], [mappedDateData2, mappedWeightData2]] for each set of data passed in.

  // color change based on if first weight value is greater/less than last weight value.

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //PROPS TO PASS TO VARIOUS GRAPH COMPONENTS---------------------
  //later on you should add these things to the store to avoid unnecessary rerenders of components due to prop threading.

  const graphAxesProps = {
    graphLayoutProps,
    dateRange,
    minWeight,
    maxWeight,
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
        {/* <GraphPlotArea
          mappedDateData={mappedDateData2}
          mappedWeightData={mappedWeightData2}
        /> */}
      </svg>
      <UserOptions userOptionsProps={userOptionsProps} />
    </div>
  );
}

//-------------------------------------------------------------
//-------------------------------------------------------------
//GARBAGE TO BE DELETED
//-------------------------------------------------------------
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
