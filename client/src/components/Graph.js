import React, { useEffect, useRef, useState } from "react";
import "./Graph.css";
import { plotDateFormat } from "./utils/Formatter";
import GraphPlotArea from "./GraphPlotArea";

export default function Graph({ dataPoints, exerciseName }) {
  // console.log(exerciseName, dataPoints);
  //eventually userDayDiff will be a selectable button available to the user. Hard code for now.
  //value MUST be >= 7

  const [dateDiff, setDateDiff] = useState("7");

  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
  //TODO: make these values dynamic
  const width = 700;
  const height = 400;

  //margin and axisOffset will probably remain constant
  const xMargin = 50;
  const axisOffset = 100;

  //plot ranges are based on previous inputs!
  const yRange = height - axisOffset;
  const xRange = width - axisOffset - xMargin;

  //make dummy graph lines so I can see what's happening
  //DELETE once happy
  let dummyLines = [];
  let i = 0;
  while (i * 100 <= xRange) {
    dummyLines.push(axisOffset + i * 100);
    i++;
  }

  //hacky way to get graph to re-render - fix in future by breaking into components.
  //doesn't work - will find another fix.
  // const useForceUpdate = () => useState()[1];
  // const forceUpdate = useForceUpdate();

  // let userDayDiff = 30;
  const userDayDiff = useRef("7");
  const bullshitArr = grabDataForUserDayDiff(userDayDiff.current, dataPoints);
  const dateLabels = useRef(bullshitArr[0]);
  const mappedDateData = useRef(bullshitArr[1]);
  const weightLabels = useRef(bullshitArr[2]);
  const mappedWeightData = useRef(bullshitArr[3]);
  // let highlightedElement = null;
  // useEffect(() => {
  // 	console.log(document.getElementById('7'))
  //   // highlightedElementRef.current = document.getElementById("7");
  //   console.log(highlightedElementRef.current);
  //   // console.log(highlightedElementRef.current.id);
  // });

  useEffect(() => {
    if (!userDayDiff.current) {
      console.log("hits");
      return;
    }
    console.log("hitttts");
    setDateDiff(userDayDiff.current);
    [
      dateLabels.current,
      mappedDateData.current,
      weightLabels.current,
      mappedWeightData.current,
    ] = grabDataForUserDayDiff(userDayDiff.current, dataPoints);
    // plotArea = buildPlotArea(mappedDateData, mappedWeightData)
    // forceUpdate();
  }, [userDayDiff.current]);

  // console.log(exerciseName);

  // console.log(dataPoints);
  // console.log(!dataPoints);
  // if (!dataPoints) return null;

  const handleDayDiffChange = (e) => {
    // console.log(e.target);
    // console.log(e.target.id);
    let newEl = e.target;
    const oldEl = document.getElementById(userDayDiff.current);
    // console.log(!e.target.id);
    console.log(userDayDiff.current);
    console.log(userDayDiff);
    console.log(typeof userDayDiff.current);
    // let id = e.target.id;
    //can't figure how to avoid error where nested div is clicked - tried z-index. Instead we do this check.
    if (newEl.id) {
      userDayDiff.current = newEl.id;
      setDateDiff(newEl.id);
      // highlightedElementRef.current = newEl;
      // userDayDiff = id;
    } else {
      newEl = newEl.parentElement;
      if (newEl.id) {
        // oldEl = highlightedElementRef.current;
        userDayDiff.current = newEl.id;
        setDateDiff(newEl.id);

        // highlightedElementRef.current = newEl;
        // userDayDiff = id;
      } else {
        return; //this way, if the user clicked the container element instead, then id will still be undefined and this handler will do nothing. I tried using pointer-events:none along with z-index but I still am able to get an error. This is hacky but it should work.
      }
    }
    [
      dateLabels.current,
      mappedDateData.current,
      weightLabels.current,
      mappedWeightData.current,
    ] = grabDataForUserDayDiff(userDayDiff.current, dataPoints);

    // console.log(userDayDiff);
    oldEl.classList.remove("user-day-diff__option--pressed");

    // highlightedElementRef.current = document.getElementById(id);
    // console.log(highlightedElementRef.current);
    newEl.classList.add("user-day-diff__option--pressed");
  };

  // let weightLabels;
  // let dateLabels;
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
      makeXLabels(userDayDiff, nowMs, msPerDay),
      mapXIdxToDataPoints(xDataIdx),
      makeYLabels(minWeight, maxWeight),
      mapYIdxToDataPoints(yDataIdx),
    ];
  }

  // generate x axis labels based on current day and userDayDiff input
  //TODO: add logic that changes dates to months if 3month view selected?
  function makeXLabels(dateRange, nowMs, msPerDay) {
    const startDateMs = nowMs - msPerDay * dateRange;
    let numXLabels = 6;
    let xLabelSpacing = msPerDay;
    let i = 7;
    while (dateRange > i) {
      xLabelSpacing += msPerDay;
      i += 7;
    }
    let dateLabels = [];
    for (let i = 0; i <= numXLabels; i++) {
      dateLabels.push(plotDateFormat(startDateMs + i * xLabelSpacing));
    }
    return dateLabels;
  }

  // generate y axis labels based on min and max weight values
  //TODO: implement a user option to view a zoomed in plot or a plot from 0 to max weight.
  function makeYLabels(minWeight, maxWeight) {
    let numHiddenLabels = 0;
    let i = 5;
    while ((maxWeight - minWeight) / i > 6) {
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

  console.log(userDayDiff, userDayDiff.current);
  // if (!userDayDiff.current) return null;

  // let [
  //   dateLabels,
  //   mappedDateData,
  //   weightLabels,
  //   mappedWeightData,
  // ] = grabDataForUserDayDiff(userDayDiff.current, dataPoints);
  console.log(mappedDateData.current, !mappedDateData.current);
  if (!mappedDateData.current) {
    return null;
  }
  // let plotArea = buildPlotArea(mappedDateData, mappedWeightData);
  //build functions that create the axis in html later

  // color change based on if first weight value is greater/less than last weight value.
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
        <g className="grid x-grid" id="xGrid">
          <line x1={axisOffset} x2={axisOffset} y1="0" y2={yRange} />
        </g>
        <g className="grid y-grid" id="yGrid">
          <line x1={axisOffset} x2={width} y1={yRange} y2={yRange} />
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
          {dateLabels.current.map((date, index) => {
            return (
              <text
                className="x-label"
                key={index}
                x={
                  axisOffset +
                  (xRange / (dateLabels.current.length - 1)) * index
                }
                y={height - (3 * axisOffset) / 4}
                style={{
                  transformOrigin: `${
                    axisOffset +
                    (xRange / (dateLabels.current.length - 1)) * index
                  }px ${height - (3 * axisOffset) / 4}px`,
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
        <g className="labels">
          {weightLabels.current.map((weight, index) => {
            return (
              <text
                className="y-label"
                key={index}
                x={(3 * axisOffset) / 4}
                y={yRange * (1 - index / (weightLabels.current.length - 1))}
              >
                {weight}
              </text>
            );
          })}
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
        </g>
        <GraphPlotArea
          mappedDateData={mappedDateData.current}
          mappedWeightData={mappedWeightData.current}
        />
      </svg>
      <div className="user-day-diff__container">
        <div
          onClick={handleDayDiffChange}
          className="user-day-diff__options-container"
        >
          <div
            id="7"
            className="user-day-diff__option-container  user-day-diff__option--pressed"
          >
            <div className="user-day-diff__option">1W</div>
          </div>
          <div id="14" className="user-day-diff__option-container">
            <div className="user-day-diff__option">2W</div>
          </div>
          <div id="30" className="user-day-diff__option-container">
            <div className="user-day-diff__option">1M</div>
          </div>
          <div id="91" className="user-day-diff__option-container">
            <div className="user-day-diff__option">3M</div>
          </div>
          <div id="182" className="user-day-diff__option-container">
            <div className="user-day-diff__option">6M</div>
          </div>
          <div id="365" className="user-day-diff__option-container">
            <div className="user-day-diff__option">1Y</div>
          </div>
          <div id="all" className="user-day-diff__option-container">
            <div className="user-day-diff__option">ALL</div>
          </div>
        </div>
        <div className="user-day-diff__container-placeholder"> </div>
      </div>
    </div>
  );
}

// function buildGraph(mappedDateData, mappedWeightData) {
//   let graphStr = "";
//   for (let i = 0; i < mappedDateData.length - 1; i++) {
//     graphStr += `<circle cx={${mappedDateData[i]}} cy={${mappedWeightData[i]}} r="5" />
// 				<line
// 					x1={${mappedDateData[i]}}
// 					y1={${mappedWeightData[i]}}
// 					x2={${mappedDateData[i + 1]}}
// 					y2={${mappedWeightData[i + 1]}}
// 				/>`;
//   }
//   graphStr += (
//     `<circle
//       cx={${mappedDateData[mappedDateData.length - 1]}}
//       cy={${mappedWeightData[mappedDateData.length - 1]}}
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
