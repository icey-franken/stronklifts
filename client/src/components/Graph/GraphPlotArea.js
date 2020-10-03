import React, { useEffect } from "react";
import "./GraphPlotArea.css";
import { useSelector } from "react-redux";

export default function GraphPlotArea({ userExDispId }) {
  const { dateRange, weightRange } = useSelector((state) => state.graph.range);

  const { axisOffset, xMargin, width, height } = useSelector(
    (state) => state.graph.layout
  );
  const yRange = height - axisOffset;
  const xRange = width - axisOffset - xMargin;

  const { relevantDateData, relevantWeightData } = useSelector(
    (state) => state.graphData[userExDispId]
  );

  const { userExDisp, userDayDiff } = useSelector(
    (state) => state.graph.userOptions
  );

  useEffect(() => {
    xDataIdx = generateXDataIdx(relevantDateData, dateRange);
    yDataIdx = generateYDataIdx(relevantWeightData, weightRange);
    mappedDateData = mapXIdxToDataPoints(xDataIdx, xRange, axisOffset);
    mappedWeightData = mapYIdxToDataPoints(yDataIdx, yRange);
    plotArea = buildPlotArea(mappedDateData, mappedWeightData);
		className = `${userExDispId}-plot-area plot-area`;
		console.log('hits');
  }, [userExDisp, userDayDiff, dateRange, weightRange]);

  //GENERATE IDX ARRAYS FROM RELEVANT DATA---------------------
  //Idx arrays are scalar values that will be used later on to generate Num arrays based on SVG size parameters.
  //use relevant raw date data points to construct xDataIdx
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
  //use relevant raw weight data points to construct xDataIdx
  function generateYDataIdx(yDataWeight, [minWeight, maxWeight]) {
    let yDataIdx = [];
    yDataWeight.forEach((weight) => {
      //generate weight scalar array
      yDataIdx.push((weight - minWeight) / (maxWeight - minWeight));
    });
    return yDataIdx;
  }

  //MAP IDX ARRAYS TO DATA POINTS-------------------------------
  //map xDataIdx and yDataIdx scalar arrays to actual data points based on SVG size
  function mapXIdxToDataPoints(xDataIdx, xRange, axisOffset) {
    return xDataIdx.map((x) => axisOffset + xRange * x);
  }
  function mapYIdxToDataPoints(yDataIdx, yRange) {
    return yDataIdx.map((y) => (1 - y) * yRange);
  }

  //BUILD PLOT BASED ON MAPPED DATA POINTS-----------------------
  function buildPlotArea(mappedDateData, mappedWeightData) {
    let graphArr = [];
    for (let i = 0; i < mappedDateData.length - 1; i++) {
      graphArr.push(
        <g key={i}>
          <circle
            key={i}
            cx={mappedDateData[i]}
            cy={mappedWeightData[i]}
            r="4"
          />
          <line
            x1={mappedDateData[i]}
            y1={mappedWeightData[i]}
            x2={mappedDateData[i + 1]}
            y2={mappedWeightData[i + 1]}
          />
        </g>
      );
    }
    graphArr.push(
      <circle
        key={mappedDateData.length - 1}
        cx={mappedDateData[mappedDateData.length - 1]}
        cy={mappedWeightData[mappedDateData.length - 1]}
        r="4"
      />
    );
    return graphArr;
  }

  //CALCULATE NECESSARY VALUES USING ABOVE FUNCTIONS------------
  let xDataIdx = generateXDataIdx(relevantDateData, dateRange);
  let yDataIdx = generateYDataIdx(relevantWeightData, weightRange);
  let mappedDateData = mapXIdxToDataPoints(xDataIdx, xRange, axisOffset);
  let mappedWeightData = mapYIdxToDataPoints(yDataIdx, yRange);
  let plotArea = buildPlotArea(mappedDateData, mappedWeightData);
  let className = `${userExDispId}-plot-area plot-area`;

  return <g className={className}>{plotArea}</g>;
}
