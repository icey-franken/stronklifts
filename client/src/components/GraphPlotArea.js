import React from 'react';


export default function GraphPlotArea({mappedDateData, mappedWeightData}) {
	console.log(mappedDateData);


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


	return (
		<g className="data-points">{buildPlotArea(mappedDateData, mappedWeightData)}</g>
	)
}
