import React, { useEffect, useState } from "react";
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

  const [isLoaded, setIsLoaded] = useState(false);

  const [plotArea, setPlotArea] = useState(null);

  let className = `${userExDispId}-plot-area plot-area`;
  useEffect(() => {
    let xDataIdx = generateXDataIdx(relevantDateData, dateRange);
    let yDataIdx = generateYDataIdx(relevantWeightData, weightRange);
    [xDataIdx, yDataIdx] = fixSoNoNegatives(xDataIdx, yDataIdx); //issue that relevantDateData not coming in properly. Not sure why and would take a long time to troubleshoot. Instead, I will fix the problem by removing negative values from xDataIdx and corresponding values from yDataIdx.

    const mappedDateData = mapXIdxToDataPoints(xDataIdx, xRange, axisOffset);
    const mappedWeightData = mapYIdxToDataPoints(yDataIdx, yRange);
    const plotArea = buildPlotArea(mappedDateData, mappedWeightData);
    setPlotArea(plotArea);
    setIsLoaded(true);
  }, [dateRange, weightRange]);

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

  function fixSoNoNegatives(xDataIdx, yDataIdx) {
    let [posXDataIdx, posYDataIdx] = [[...xDataIdx], [...yDataIdx]];
    let i = 0;
    while (i < posXDataIdx.length) {
      if (posYDataIdx[i] < 0 || posXDataIdx[i] < 0) {
        posXDataIdx.splice(i, 1);
        posYDataIdx.splice(i, 1);
      } else {
        i++;
      }
    }
    return [posXDataIdx, posYDataIdx];
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
    if (mappedDateData.length === 0) {
      return [];
    }
    let graphArr = [];
    for (let i = 0; i < mappedDateData.length - 1; i++) {
      graphArr.push(
        <g key={i}>
          <circle
            key={i}
            cx={mappedDateData[i]}
            cy={mappedWeightData[i]}
            r="3"
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
        r="3"
      />
    );
    return graphArr;
  }

  if (!isLoaded) {
    return null;
  }

  return <g className={className}>{plotArea}</g>;
}
