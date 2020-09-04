import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Exercise.css";
import Set from './Set';
import SetEmpty from './SetEmpty';


export default function Exercise({ exerciseId }) {
	const exercise = useSelector((state)=>state.exercises[exerciseId]);

	//add use selector to grab exercises instead of threading?


  // console.log(exercise);
  // const [name, weight, setArr ] = exercise; //can also grab these: repGoal, numSets, but we don't care because this is a 5X5 APP
	// const repsArr = [];
	// //consider changing how data comes from backend so we don't have to do this forEach
	// //this works for adjustable number of sets, but this is a 5X5 APP
	// // setArr.forEach((set) => {
  // //   repsArr.push(set.numRepsActual);
	// // });
	// // console.log(setArr);
	// for(let i = 0; i < setArr.length; i++) {
	// 	repsArr.push(setArr[i].numRepsActual);
	// }
	// for(let i = setArr.length; i < 5; i++) {
	// 	if(name==='DEADLIFT')	repsArr.push('noSet');
	// 	else repsArr.push(null);
	// }
	// // console.log(repsArr, name);
	if(exercise.setIds.length === 1) {
		exercise.setIds.push('emptySet','emptySet','emptySet','emptySet');
	}

	return (
    <div className="exercise-container">
      <div className="exercise__info-container">
        <div className='exercise__name'>{exercise.exerciseName}</div>
        <div className='exercise__weight'>{exercise.workingWeight} lbs</div>
      </div>
      <div className="exercise__sets-container">
        {exercise.setIds.map((setId,index)=>{
					if(setId === 'emptySet') {
						return <SetEmpty key={index}/>
					} else
					return(<Set key={index} setId={setId}/>)
				})}
      </div>
    </div>
  );
}
