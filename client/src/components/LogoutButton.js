import React from 'react';
import {Button} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as AuthActions from '../store/auth';

export default function LogoutButton () {
	const loggedOut = useSelector(state => !state.auth.id);//should I change auth state to include token?

	const dispatch = useDispatch();

	const handleClick = () => {dispatch(AuthActions.logout())};

	if(loggedOut) return <Redirect to='/login' />;

	return (
		<Button onClick={handleClick}>Logout</Button>
	)
}
