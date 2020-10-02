import React from "react";
import { DayDiffOptions, ExDispOptions } from ".";
export default function UserOptions({ userOptionsProps }) {
  //maybe I'm going overboard with modularity. My (mild) concern now is that the userOptions component will re-render on prop changes - which includes props for both daydiff and exdisp. Without this useroptions prop, they will only rerender on their own prop change.
  //This is likely an extremely small performance hinderance but it's something to think about. The argument might be made that I should put this stuff in the redux store instead of threading - that should avoid the rerender issue.
  //For now I don't think it matters, but in the future it is a slight improvement I could make if I so choose.

  const {
    userDayDiff,
    setUserDayDiff,
    userExDisp,
    setUserExDisp,
  } = userOptionsProps;

  return (
    <>
      <div className="user-options-container">
        <DayDiffOptions
          userDayDiff={userDayDiff}
          setUserDayDiff={setUserDayDiff}
        />
      </div>
      <div className="user-options-container">
        <ExDispOptions userExDisp={userExDisp} setUserExDisp={setUserExDisp} />
      </div>
    </>
  );
}
