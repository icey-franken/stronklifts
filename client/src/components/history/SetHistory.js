import React from 'react';
import {useSelector} from 'react-redux';

export default function SetHistory({setId}) {
	debugger;
	let numReps = 'X'
	if (setId !== 'emptySet') {
		numReps = useSelector((state)=>state.sets[setId].numRepsActual)
	}
	console.log(setId)
	console.log(numReps)
	return (
		<div className='workout-history__set'>
			{numReps === null ? '-' : numReps}
		</div>
	)
}
