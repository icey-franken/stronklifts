import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphActions } from "../../../store/graph";

export default function ExDispOptions() {
  const { userExDisp } = useSelector((state) => state.graph.userOptions);
  const dispatch = useDispatch();
  const setUserExDisp = (userExDisp) => {
    dispatch(graphActions.setUserExDisp(userExDisp));
  };

  //NOTE: I think it makes more sense for the exDispOptions to live in this component as a part of state - there is no reason for this stuff to be in the redux store afaik.
  //NOTE NOTE: NO! THE REASON I WANT THIS IN THE STORE IS BECAUSE OTHER COMPONENTS NEED TO KNOW ABOUT IT - NAMELY, THE GRAPH COMPONENT SO IT KNOWS TO RERENDER THE GRAPHPLOTAREA COMPONENT.

  const userExDispOptions = [
    ["SQUAT", "sq"],
    ["OVERHEAD PRESS", "op"],
    ["DEADLIFT", "dl"],
    ["BENCH PRESS", "bp"],
    ["PENDLAY ROW", "pr"],
  ];

  //QUESTION: is it best practice to have this logic in the component or in the redux store? I am leaving it here for now but it's something to thing about.

  //TODO: fix lagginess - the redux store will "get behind" and end up with selection on screen not matching what's in the store. - FIXED. I now go through all five on every click to make sure things stay in sync. Again, I think this is better suited to living in component state instead of the redux store, but I'll stick with the store for now.
  const updateClasses = (userExDispIds) => {
    const allUserExDispIds = ["sq", "op", "dl", "bp", "pr"];
    allUserExDispIds.forEach((id) => {
      const el = document.getElementById(id);
      userExDispIds.indexOf(id) === -1
        ? el.classList.remove("user-day-diff__option--pressed")
        : el.classList.add("user-day-diff__option--pressed");
    });
  };

  //helper function for handleClick - same operation twice
  const handleExDispChange = (id) => {
    //check if user clicked all
    let newUserExDisp;
    if (id === "all-ex") {
      userExDisp.length === 5
        ? (newUserExDisp = ["sq"])
        : (newUserExDisp = ["sq", "op", "dl", "bp", "pr"]);
    } else {
      //otherwise check if id already in userExDisp state
      const idx = userExDisp.indexOf(id);
      idx === -1
        ? (newUserExDisp = [...userExDisp, id])
        : userExDisp.length > 1
        ? (newUserExDisp = [
            ...userExDisp.slice(0, idx),
            ...userExDisp.slice(idx + 1),
          ])
        : (newUserExDisp = [...userExDisp]);
    }
    setUserExDisp(newUserExDisp);
    updateClasses(newUserExDisp);
  };

  //click handler for exercise display change
  const handleClick = (e) => {
    let newEl = e.target;
    //does element have id? - if not, minor styling error
    if (newEl.id) {
      handleExDispChange(newEl.id);
      //does parent element have id? (styling issue)
    } else if (newEl.parentElement.id) {
      handleExDispChange(newEl.parentElement.id);
      //if no id on el or parent, do nothing (styling error)
    }
  };

  return (
    <>
      <div className="user-day-diff__container" onClick={handleClick}>
        {userExDispOptions.map(([exerciseName, exerciseId], index) => {
          return (
            <div
              id={exerciseId}
              key={index}
              className="user-day-diff__option-container user-day-diff__option--pressed"
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
