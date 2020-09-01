import React from 'react';
import {NavLink} from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function Navigation () {
	return (
		<nav>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/calendar'>Calendar</NavLink>
			<NavLink to='/workout'>Workout</NavLink>
			<NavLink to='/demos'>Demos</NavLink>
			<NavLink to='/logout' component={LogoutButton}/>
		</nav>
	)
}
