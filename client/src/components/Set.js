import React from "react";
import "./Set.css";

export default function Set({ numRepsActual }) {

	//add set slice of state!

  //we should pass set id from prev element, then grab info from that set from the store. Then we can update value in store
  const handleClick = (e) => {
    if (e.target.innerHTML > 0) e.target.innerHTML--;
    else if (e.target.innerHTML === "0") {
			e.target.innerHTML = "";
			e.target.classList.add('exercise__set--emptySet');
		} else {
			e.target.innerHTML = '5';
			e.target.classList.remove('exercise__set--emptySet')
		}
			// else if (e.target.innerHTML === "")
  };
  // console.log(numRepsActual !== ("noSet" || "emptySet"));
	// console.log(numRepsActual===null);
  return (
    <div className="exercise__set-container">
      {(numRepsActual === null)? (
        <div
          className="exercise__set exercise__set--emptySet"
          onClick={handleClick}
        ></div>
      ) : numRepsActual !== "noSet" ? (
        <div className="exercise__set" onClick={handleClick}>
          {numRepsActual}
        </div>
      ) : (
        <div className="exercise__set exercise__set--noSet">&#10006;</div>
      )}
    </div>
  );
}
