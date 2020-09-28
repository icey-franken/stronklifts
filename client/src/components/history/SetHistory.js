import React from 'react';
import {useSelector} from 'react-redux';

export default function SetHistory({setId}) {
	debugger;
	// let numReps = 'X'
	// const set = useSelector((state)=>state.sets[setId])
	// if (set.numRepsActual) {
	// 	numReps = set.numRepsActual
	// }

	const numReps = useSelector((state)=>state.sets[setId].numRepsActual)

	// if (setId !== 'emptySet') {}
	// console.log(numReps)
	return (
		<div className='workout-history__set'>
			{numReps === null ? '-' : numReps}
		</div>
	)
}
