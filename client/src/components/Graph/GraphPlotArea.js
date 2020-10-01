import React from "react";

export default function GraphPlotArea({
  xData,
  yData,
  dateRange,
  weightRange,
  graphLayoutProps,
}) {
  const { axisOffset, xRange, yRange } = graphLayoutProps;
  // console.log(mappedDateData);
  console.log(xData, yData);
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
  function mapXIdxToDataPoints(xDataIdx) {
    return xDataIdx.map((x) => axisOffset + xRange * x);
  }
  function mapYIdxToDataPoints(yDataIdx) {
    return yDataIdx.map((y) => (1 - y) * yRange);
  }

  function buildPlotArea(mappedDateData, mappedWeightData) {
    // console.log(mappedDateData, mappedWeightData);

    let graphArr = [];
    for (let i = 0; i < mappedDateData.length - 1; i++) {
      graphArr.push(
        <g key={i}>
          <circle
            key={i}
            className="data-point"
            cx={mappedDateData[i]}
            cy={mappedWeightData[i]}
            r="5"
          />
          <line
            className="data-line"
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
        className="data-point"
        cx={mappedDateData[mappedDateData.length - 1]}
        cy={mappedWeightData[mappedDateData.length - 1]}
        r="5"
      />
    );
    return graphArr;
  }

  const xDataIdx = generateXDataIdx(xData, dateRange);
  const yDataIdx = generateYDataIdx(yData, weightRange);
  const mappedDateData = mapXIdxToDataPoints(xDataIdx);
  const mappedWeightData = mapYIdxToDataPoints(yDataIdx);
  // const plotArea = buildPlotArea(mappedDateData, mappedWeightData)
  // console.log(plotArea);

  return (
    <g className="data-points">
      {buildPlotArea(mappedDateData, mappedWeightData)}
    </g>
  );
}
