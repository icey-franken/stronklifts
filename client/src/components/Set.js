import React from "react";
import "./Set.css";

export default function Set({ numRepsActual }) {
  //we should pass set id from prev element, then grab info from that set from the store. Then we can update value in store
  const handleClick = (e) => {
    console.log(e.target.innerHTML);
    console.log(e.target.innerHTML === 0);
    if (e.target.innerHTML > 0) e.target.innerHTML--;
    else if (e.target.innerHTML === "0") e.target.innerHTML = "";
    else if (e.target.innerHTML === "") e.target.classList.add();
  };
  console.log(numRepsActual !== ("noSet" || "emptySet"));

  return (
    <div className="exercise__set-container">
      {numRepsActual === "emptySet" ? (
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
