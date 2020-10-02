import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Graph.css";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";
import { graphActions } from "../../store/graph";

export default function Graph({ relevantDataPointsObj }) {
  const workoutData = useSelector((state) => state.graphData);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userDayDiff, userExDisp } = useSelector(
    (state) => state.graph.userOptions
  );
  // const { userExDisp } = useSelector((state) => state.graph.userOptions);
  console.log(workoutData);

  const { axisOffset, xMargin, width, height } = useSelector(
    (state) => state.graph.layout
  );

  const dispatch = useDispatch();

  // let relevantDataPointsObj = null;
  let weightRange = null;
  let dateRange = null;

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //USE FUNCTIONS TO CALCULATE VALUES-------------------------
  // console.log(workoutData, userExDisp);

  //add pressed class to 1W day diff and squat ex disp options on initial page load
  useEffect(() => {
    const dayDiffEl = document.getElementById(userDayDiff);
    //check so that no error - dependency array not working like I expect - doesn't seem to matter what I put in it
    if (dayDiffEl) {
      dayDiffEl.classList.add("user-day-diff__option--pressed");
    }
  });
  // if (!relevantDataPointsObj) {
  //   return null;
  // }
  // if (Object.keys(relevantDataPointsObj).length === 0) {
  //   return null;
  // }

  // useEffect(() => {
  // 	if(Object.keys(workoutData).length !== 0) {
  // 		dispatch(graphActions.setDateRange(dateRange));
  // 		dispatch(graphActions.setWeightRange(weightRange));

  // 	}
  // },[relevantDataPointsObj]);

  //was trying to do this with use effect - shit is not working. Fuck it
  // if (Object.keys(workoutData).length !== 0) {
  //   relevantDataPointsObj = grabAllDataForUserSelection(
  //     workoutData,
  //     userExDisp
  //   );
  //   weightRange = calculateWeightRange(relevantDataPointsObj);
  //   dateRange = calculateDateRange(userDayDiff, relevantDataPointsObj);
  // }
  // //   useEffect(() => {
  // // 		// relevantDataPointsObj = grabAllDataForUserSelection(workoutData, userExDisp);
  // // 		console.log('hits use effect',relevantDataPointsObj)
  // // console.log(workoutData);

  // //     if (weightRange) {
  // //       dispatch(graphActions.setWeightRange(weightRange));
  // //     }
  // //     if (dateRange) {
  // //       dispatch(graphActions.setDateRange(dateRange));
  // //     }
  // //   }, [workoutData]);

  // //apparently this is necessary if I'm going to use redux store
  // console.log(workoutData);

  // // useEffect(() => {
  // //   setIsLoaded(true);
  // //   console.log("hits is loaded effect", workoutData);
  // // }, [workoutData]);
  // console.log(workoutData);

  // // //without this, everything is fucked
  // if (!isLoaded) {
  //   return null;
  // }
  // console.log(workoutData);

  // // relevantDataPointsObj = grabAllDataForUserSelection(workoutData, userExDisp);
  // // weightRange = calculateWeightRange(relevantDataPointsObj);
  // // dateRange = calculateDateRange(userDayDiff, relevantDataPointsObj);
  // // dispatch(graphActions.setWeightRange(weightRange));
  // // dispatch(graphActions.setDateRange(dateRange));
  // // weightRange = calculateWeightRange(relevantDataPointsObj);
  // // dateRange = calculateDateRange(userDayDiff, relevantDataPointsObj);
  // console.log(weightRange, dateRange);
  // console.log(workoutData);

  // // //relevant data points object is basically slices of workoutData based on userExDisp with relevantDateData and relevantWeightData extracted.
  // userExDisp.forEach((exId) => {
  //   // console.log(workoutData);
  //   const { relevantDateData, relevantWeightData } = workoutData[exId];
  //   console.log(relevantDateData, relevantWeightData);
  // });

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //SET GRAPH LAYOUT PROPS
  //goal is to build dynamic svgs that adjust with page size. For now we will use fixed...dynamic values. Later on the "fixed" width and height values will be based on screen size.
  //TODO: make these values dynamic

  //FOR ALL SELECTED EXERCISES - PUT ALL RELEVANT DATA INTO ONE OBJECT WITH KEYS CORRESPONDING TO USEREXDISP SELECTIONS
  function grabAllDataForUserSelection(workoutData, userExDisp) {
    let relevantDataPointsObj = {};
    userExDisp.forEach((userEx) => {
      const { relevantDateData, relevantWeightData } = workoutData[userEx];
      relevantDataPointsObj[userEx] = { relevantDateData, relevantWeightData };
    });
    return relevantDataPointsObj;
  }



  //WEIGHT RANGE AND DATE RANGE SHOULD GO IN STORE NEAR USER OPTIONS - ON DISPATCH OF (EG) USEREXDISP, WE SHOULD UPDATE WEIGHT RANGE AND DATE RANGE AND THUS ALSO THE RELEVANT DATA POINTS

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //PROPS TO PASS TO VARIOUS GRAPH COMPONENTS---------------------
  //later on you should add these things to the store to avoid unnecessary rerenders of components due to prop threading.

	function grabAllDataForUserSelection(workoutData, userExDisp) {
    let relevantDataPointsObj = {};
    userExDisp.forEach((userEx) => {
      const { relevantDateData, relevantWeightData } = workoutData[userEx];
      relevantDataPointsObj[userEx] = { relevantDateData, relevantWeightData };
    });
    return relevantDataPointsObj;
	}

	const relDPO = grabAllDataForUserSelection(workoutData, userExDisp)

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
          {Object.entries(relDPO).map(
            ([name, { relevantDateData, relevantWeightData }], index) => {
              return (
                <GraphPlotArea
                  key={index}
                  dateRange={dateRange}
                  weightRange={weightRange}
                  userExDispId={name}
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
