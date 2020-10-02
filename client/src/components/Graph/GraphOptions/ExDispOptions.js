import React from "react";

export default function ExDispOptions({ userExDisp, setUserExDisp }) {
  //for now we thread in userExDisp and setUserExDisp
  //I may be able to have that state stored in here, although I think the plot area component has to know about it and be triggered on change

  const userExDispOptions = [
    ["SQUAT", "sq"],
    ["OVERHEAD PRESS", "op"],
    ["DEADLIFT", "dl"],
    ["BENCH PRESS", "bp"],
    ["PENDLAY ROW", "pr"],
  ];

  //helper function for handleExDispChange - same operation twice
  const __handleExDisp = (newEl) => {
    //check if user clicked all
    if (newEl.id === "all-ex") {
      const userExDispIds = ["sq", "op", "dl", "bp", "pr"];
      //all selected? Deselect all but squat
      if (userExDisp.length === 5) {
        setUserExDisp([userExDispIds.shift()]);
        userExDispIds.forEach((elId) => {
          const el = document.getElementById(elId);
          el.classList.remove("user-day-diff__option--pressed");
        });
      } else {
        //all not selected? Select all
        //note: classList.add and remove do nothing if class is already added/not added - no need to check .contains
        setUserExDisp([...userExDispIds]);
        userExDispIds.forEach((elId) => {
          const el = document.getElementById(elId);
          el.classList.add("user-day-diff__option--pressed");
        });
      }
    } else {
      const idx = userExDisp.indexOf(newEl.id);
      //check if id in userExDisp state
      if (idx === -1) {
        //if exercise not in userExDisp array, add it
        setUserExDisp([...userExDisp, newEl.id]);
        newEl.classList.add("user-day-diff__option--pressed");
      } else {
        //if exercise already in userExDisp array AND userExDisp contains more than one entry, remove it
        if (userExDisp.length > 1) {
          //if not pressed, add to userExDisp state, toggle
          setUserExDisp([
            ...userExDisp.slice(0, idx),
            ...userExDisp.slice(idx + 1),
          ]);
          newEl.classList.remove("user-day-diff__option--pressed");
        }
        //if exercise in userExDisp array but only one is selected, do nothing.
      }
    }
  };

  //click handler for exercise display change
  const handleExDispChange = (e) => {
    let newEl = e.target;
    //TODO: if I want to display multiple graphs, I need to make ids unique to each plot. getElementById only grabs the first element it finds.
    //does element have id? - if not, minor styling error
    if (newEl.id) {
      __handleExDisp(newEl);
      //does parent element have id? (sytling issue)
    } else if (newEl.parentElement.id) {
      __handleExDisp(newEl.parentElement);
      //if no id on el or parent, do nothing (styling error)
    }
  };

  return (
    <>
      <div className="user-day-diff__container" onClick={handleExDispChange}>
        {userExDispOptions.map(([exerciseName, exerciseId], index) => {
          return (
            <div
              id={exerciseId}
              key={index}
              className="user-day-diff__option-container"
            >
              <div className="user-day-diff__option">{exerciseName}</div>
            </div>
          );
        })}
        <div id="all-ex" className="user-day-diff__option-container">
          <div className="user-day-diff__option">ALL</div>
        </div>
      </div>
      <div className="user-options-container__placeholder"> </div>
    </>
  );
}
