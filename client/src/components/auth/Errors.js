import React from 'react';

export default function Errors ({errors}) {
	return (
		<ul className='errorsList'>
			{errors.map(err=> <li>{err}</li>)}
		</ul>
	);
};
