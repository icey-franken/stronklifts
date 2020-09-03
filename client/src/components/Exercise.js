import React from "react";
import "./Exercise.css";
import Set from './Set';

export default function Exercise({ exercise }) {
  // console.log(exercise);
  const [name, weight, setArr ] = exercise; //can also grab these: repGoal, numSets, but we don't care because this is a 5X5 APP
	const repsArr = [];
	//consider changing how data comes from backend so we don't have to do this forEach
	//this works for adjustable number of sets, but this is a 5X5 APP
	// setArr.forEach((set) => {
  //   repsArr.push(set.numRepsActual);
	// });
	// console.log(setArr);
	for(let i = 0; i < setArr.length; i++) {
		repsArr.push(setArr[i].numRepsActual);
	}
	for(let i = setArr.length; i < 5; i++) {
		if(name==='DEADLIFT')	repsArr.push('noSet');
		else repsArr.push(null);
	}
	// console.log(repsArr, name);
  return (
    <div className="exercise-container">
      <div className="exercise__info-container">
        <div className='exercise__name'>{name}</div>
        <div className='exercise__weight'>{weight} lbs</div>
      </div>
      <div className="exercise__sets-container">
        {repsArr.map((reps,index)=>{
					return(<Set key={index} numRepsActual={reps}/>)
				})}
      </div>
    </div>
  );
}
