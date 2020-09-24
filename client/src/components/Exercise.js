import React from "react";
import { useSelector } from "react-redux";
import "./Exercise.css";
import Set from './Set';
import SetEmpty from './SetEmpty';


export default function Exercise({ exerciseId }) {
	const exercise = useSelector((state)=>state.exercises[exerciseId]);

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
