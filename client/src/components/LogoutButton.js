import React from 'react';
import {Button} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as AuthActions from '../store/auth';

export default function LogoutButton () {
	const loggedOut = useSelector(state => !state.auth.id);//should I change auth state to include token?

	//IMPORTANT
	//there is a bug - if you log in , click through nav (e.g. click demo) and then hit logout, the url stays as /demo but it renders the Rando nav bar, with no auth page. Can't figure out why. May need to do something with history?

	const dispatch = useDispatch();

	const handleClick = () => {dispatch(AuthActions.logout())};

	if(loggedOut) return <Redirect to='/login' />;

	return (
		<Button onClick={handleClick}>Logout</Button>
	)
}
