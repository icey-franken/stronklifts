import React from "react";
import { useSelector } from "react-redux";
import "./Graph.css";
import GraphPlotArea from "./GraphPlotArea";
import { GraphAxes } from "./GraphAxes";
import { UserOptions } from "./GraphOptions";

export default function Graph() {
  const { userExDisp } = useSelector((state) => state.graph.userOptions);

  const { width, height } = useSelector((state) => state.graph.layout);

  return (
    <div className="graph-container">
      <h1 className='graph__header'>Workout Progress</h1>

      <div className="graph-info">
        {/* <div className="graph-info__title">graph page dood</div> */}
        {/* <div className="graph-info__weight">max weight - dep on overlay</div> */}
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
        <title id="title">A plot of your progress over time</title>
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
