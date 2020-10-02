import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Graph.css";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";
import {graphActions }from '../../store/graph';

export default function Graph() {
	const dispatch = useDispatch();
  const workoutData = useSelector((state) => state.graph.rawData);
  // const [userDayDiff, setUserDayDiff] = useState("7");
  // const [userExDisp, setUserExDisp] = useState(["sq"]);
  const [isLoaded, setIsLoaded] = useState(false);
	const {userDayDiff} = useSelector(state=>state.graph.userOptions);
	const {userExDisp} = useSelector(state=>state.graph.userOptions);
	console.log(userDayDiff);

	//use this for now - in the future we will be importing the action creator function for whoever needs it
	const setUserDayDiff = (userDayDiff) => {
		dispatch(graphActions.setUserDayDiff(userDayDiff));
	}
  //apparently this is necessary if I'm going to use redux store
  useEffect(() => {
    setIsLoaded(true);
  }, [workoutData]);

  //add pressed class to 1W day diff and squat ex disp options on initial page load
  useEffect(() => {
    const dayDiffEl = document.getElementById(userDayDiff);
    const exDispEl = document.getElementById(userExDisp[0]);
    //check so that no error - dependency array not working like I expect - doesn't seem to matter what I put in it
    if (dayDiffEl && exDispEl) {
      dayDiffEl.classList.add("user-day-diff__option--pressed");
      exDispEl.classList.add("user-day-diff__option--pressed");
    }
  });

  //without this, everything is fucked
  if (!isLoaded) {
    return null;
  }

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
  //FOR SINGLE EXERCISE - extract only data relevant to the selected userDayDifF
  function grabRelevantDataPoints(userDayDiff, dateData, weightData) {
    if (userDayDiff === "ALL") {
      return [dateData, weightData];
    }
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    //dataPoints array is sorted from oldest to most recent workout.
    //so, start at end of datapoints array and find index at which dayDiff is greater than userDayDiff
    //slice dataPoints from there and return that - that is your relevant dataPoints array.
    const calcDayDiff = (index) => {
      //so that error not thrown when checking oldest data point
      if (index >= 0) {
        return (nowMs - new Date(dateData[index])) / msPerDay;
      }
    };
    //consider changing from checking based on ms to checking based on day (e.g. so that a lift that happened early in the morning 7 days ago isn't excluded if graph used at night - for now it's fine)
    let i = dateData.length - 1;
    let dayDiff = calcDayDiff(i);
    while (dayDiff < userDayDiff && i >= 0) {
      i--;
      dayDiff = calcDayDiff(i);
    }
    //if i goes down to -1 (all workouts valid) then we end up returning the entire dataPoints array.
    return [dateData.slice(i + 1), weightData.slice(i + 1)];
  }

  //FOR ALL SELECTED EXERCISES - PUT ALL RELEVANT DATA INTO ONE OBJECT WITH KEYS CORRESPONDING TO USEREXDISP SELECTIONS
  function grabAllDataForUserSelection(workoutData, userExDisp) {
    let relevantDataPointsObj = {};
    userExDisp.forEach((userEx) => {
      const { dateData, weightData } = workoutData[userEx];
      const relevantDataPoints = grabRelevantDataPoints(
        userDayDiff,
        dateData,
        weightData
      );
      const [xData, yData] = relevantDataPoints;
      // separateDateAndWeight(relevantDataPoints);
      relevantDataPointsObj[userEx] = { xData, yData };
    });
    return relevantDataPointsObj;
  }

  //CALCULATE OLDEST WORKOUT IF SELECTED USERDAYDIFF IS ALL----
  function calculateDateRange(userDayDiff, relevantDataPointsObj) {
    if (userDayDiff !== "ALL") {
      return userDayDiff;
    }
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    let oldestDate = null;
    for (let exercise in relevantDataPointsObj) {
      const { xData } = relevantDataPointsObj[exercise];
      const exerciseOldestDate = xData[0];
      if (oldestDate === null || oldestDate > exerciseOldestDate) {
        oldestDate = exerciseOldestDate;
      }
    }
    const dateMs = new Date(oldestDate);
    const dateRange = (nowMs - dateMs) / msPerDay + 1;
    return dateRange;
  }

  //CALCULATE MAX AND MIN WEIGHTS FOR ALL SELECTED EXERCISES----
  function calculateWeightRange(relevantDataPointsObj) {
    let minWeight = null;
    let maxWeight = null;
    for (const exercise in relevantDataPointsObj) {
      const { yData } = relevantDataPointsObj[exercise];
      const exerciseMinWeight = Math.min(...yData) - 5;
      const exerciseMaxWeight = Math.max(...yData) + 5;
      if (minWeight === null || exerciseMinWeight < minWeight) {
        minWeight = exerciseMinWeight;
      }
      if (maxWeight === null || exerciseMaxWeight > maxWeight) {
        maxWeight = exerciseMaxWeight;
      }
    }
    return [minWeight, maxWeight];
  }

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //USE FUNCTIONS TO CALCULATE VALUES-------------------------
  // console.log(workoutData, userExDisp);
  let relevantDataPointsObj = grabAllDataForUserSelection(
    workoutData,
    userExDisp
  );
  let weightRange = calculateWeightRange(relevantDataPointsObj);
  let dateRange = calculateDateRange(userDayDiff, relevantDataPointsObj);
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //PROPS TO PASS TO VARIOUS GRAPH COMPONENTS---------------------
  //later on you should add these things to the store to avoid unnecessary rerenders of components due to prop threading.
  const graphAxesProps = {
    graphLayoutProps,
    dateRange,
    weightRange,
  };
console.log(relevantDataPointsObj);
  return (
    <div className="graph-container">
      <div className="graph-info">
        <div className="graph-info__title">graph page dood</div>
        <div className="graph-info__weight">max weight - dep on overlay</div>
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
        <title id="title">this shit doesn't show up anyways</title>
        <GraphAxes graphAxesProps={graphAxesProps} />
        <g>
          {Object.entries(relevantDataPointsObj).map(
            ([name, { xData, yData }], index) => {
              return (
                <GraphPlotArea
                  key={index}
                  name={name}
                  xData={xData}
                  yData={yData}
                  dateRange={dateRange}
                  weightRange={weightRange}
                  graphLayoutProps={graphLayoutProps}
                />
              );
            }
          )}
        </g>
      </svg>
      <UserOptions />
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
