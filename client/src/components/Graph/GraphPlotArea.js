import React from "react";
import "./GraphPlotArea.css";

export default function GraphPlotArea({
  relevantDateData,
  relevantWeightData,
  dateRange,
  weightRange,
  graphLayoutProps,
  name,
}) {
  const { axisOffset, xRange, yRange } = graphLayoutProps;

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
  const xDataIdx = generateXDataIdx(relevantDateData, dateRange);
  const yDataIdx = generateYDataIdx(relevantWeightData, weightRange);
  const mappedDateData = mapXIdxToDataPoints(xDataIdx, xRange, axisOffset);
  const mappedWeightData = mapYIdxToDataPoints(yDataIdx, yRange);
  const plotArea = buildPlotArea(mappedDateData, mappedWeightData);
  const className = `${name}-plot-area plot-area`;

  return <g className={className}>{plotArea}</g>;
}
