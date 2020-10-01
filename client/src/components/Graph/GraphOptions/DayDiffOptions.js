import React from "react";

export default function DayDiffOptions({ userDayDiff, setUserDayDiff }) {
  //copied from ExDispOptions: //for now we thread in userExDisp and setUserExDisp
  //I may be able to have that state stored in here, although I think the plot area component has to know about it and be triggered on change

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

    // (newEl = newEl.parentElement);
    // newEl.id ? setUserDayDiff(newEl.id) : (newEl = oldEl);
    if (newEl !== oldEl) {
      oldEl.classList.remove("user-day-diff__option--pressed");
      newEl.classList.add("user-day-diff__option--pressed");
    }
  };

  return (
    <>
      <div className="user-day-diff__container" onClick={handleDayDiffChange}>
        {userDayDiffOptions.map(([optionText, optionId], index) => {
          return (
            <div
              id={optionId}
              key={index}
              className="user-day-diff__option-container"
            >
              <div className="user-day-diff__option">{optionText}</div>
            </div>
          );
        })}
      </div>
      <div className="user-options-container__placeholder"> </div>
    </>
  );
}
