import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Graph.css";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";

export default function Graph() {
  const { userDayDiff, userExDisp } = useSelector(
    (state) => state.graph.userOptions
  );

  const { width, height } = useSelector((state) => state.graph.layout);

  //add pressed class to 1W day diff on initial page load
  // useEffect(() => {
  //   const dayDiffEl = document.getElementById(userDayDiff);
  //   //check so that no error - dependency array not working like I expect - doesn't seem to matter what I put in it
  //   if (dayDiffEl) {
  //     dayDiffEl.classList.add("user-day-diff__option--pressed");
  //   }
  // });

  //SET GRAPH LAYOUT PROPS
  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
  //TODO: make these values dynamic

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
        <GraphAxes />
        <g>
          {userExDisp.map((userExDispId, index) => (
            <GraphPlotArea key={index} userExDispId={userExDispId} />
          ))}
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
