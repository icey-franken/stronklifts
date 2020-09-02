import React from "react";
import "./Set.css";

export default function Set({ numRepsActual }) {
  return (
    <div className="exercise__set-container">
      {numRepsActual === "noSet" ? (
        <div className="exercise__set exercise__set--empty">
          &#10006;
        </div>
      ) : (
        <div className="exercise__set">{numRepsActual}</div>
      )}
    </div>
  );
}
