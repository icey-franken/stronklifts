import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphActions } from "../../../store/graph";

export default function DayDiffOptions() {
  const { userDayDiff } = useSelector((state) => state.graph.userOptions);
  const dispatch = useDispatch();
  const setUserDayDiff = (userDayDiff) => {
    dispatch(graphActions.setUserDayDiff(userDayDiff));
  };

  //QUESTION: same as in userExDisp - is it appropriate to have these "brains" in the component, or do they belong in the redux store?
  const userDayDiffOptions = [
    ["1W", 7],
    ["2W", 14],
    ["1M", 30],
    ["3M", 91],
    ["6M", 182],
    ["1Y", 365],
    ["ALL", "ALL"],
  ];

  //event handler that changes highlighted date range and updates userDayDiff, forcing Graph component to rerender
  const handleDayDiffChange = (e) => {
		let newEl = e.target;
    const oldEl = document.getElementById(userDayDiff);
    //can't figure how to avoid error where nested div is clicked - tried z-index. Instead we do this check.
		//TODO: if I want to display multiple graphs, I need to make ids unique to each plot. getElementById only grabs the first element it finds.
    newEl.id
      ? setUserDayDiff(newEl.id)
      : newEl.parentElement.id
      ? (newEl = newEl.parentElement && setUserDayDiff(newEl.id))
      : (newEl = oldEl);
    if (newEl !== oldEl) {
      oldEl.classList.remove("user-day-diff__option--pressed");
      newEl.classList.add("user-day-diff__option--pressed");
    }
  };

  function buildDayDiffOptions(userDayDiffOptions) {
    let optionsArr = [];
    for (let i = 0; i < userDayDiffOptions.length - 2; i++) {
      optionsArr.push(
        <div
          id={userDayDiffOptions[i][1]}
          key={i}
          className="user-day-diff__option-container"
        >
          <div className="user-day-diff__option">
            {userDayDiffOptions[i][0]}
          </div>
        </div>
      );
		}
		optionsArr.push(
      <div
        id={userDayDiffOptions[userDayDiffOptions.length - 1][1]}
        key={userDayDiffOptions.length - 1}
        className="user-day-diff__option-container user-day-diff__option--pressed"
      >
        <div className="user-day-diff__option">{userDayDiffOptions[userDayDiffOptions.length - 1][0]}</div>
      </div>
    );
    return optionsArr;
	}

  const optionsArr = buildDayDiffOptions(userDayDiffOptions);

  return (
    <>
      <div className="user-day-diff__container" onClick={handleDayDiffChange}>
        {optionsArr}
      </div>
      <div className="user-options-container__placeholder"> </div>
    </>
  );
}
