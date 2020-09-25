import React from "react";
// import "./Set.css";
// can probably change the set empty history component render in exercise history component to render nothing at all - empty sets are cleared out in redux store
export default function SetEmptyHistory() {
	console.log('empty');
  return (
    <div className="workout-history__set workout-history__set--empty">
      Empty set &#10006;
    </div>
  );
}
