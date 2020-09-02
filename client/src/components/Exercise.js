import React from "react";
import "./Exercise.css";
import Set from './Set';

export default function Exercise({ exercise }) {
  console.log(exercise);
  const [name, weight, setArr, numSets] = exercise; //can also grab these: repGoal, numSets, but we don't care because this is a 5X5 APP
	const repsArr = [];
	//consider changing how data comes from backend so we don't have to do this forEach
  setArr.forEach((set) => {
    repsArr.push(set.numRepsActual);
	});
  return (
    <div className="exercise-container">
      <div className="exercise__info-container">
        <div>Exercise name: {name}</div>
        <div>Working weight: {weight} lbs</div>
      </div>
      <div className="exercise__sets-container">
        {repsArr.map((reps,index)=>{
					return(<Set key={index} numRepsActual={reps}/>)
				})}
      </div>
    </div>
  );
}
