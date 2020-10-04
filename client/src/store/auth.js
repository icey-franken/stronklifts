import Cookies from 'js-cookie';//this module allows us to grab cookies
// create all actions and reducer related to auth in this file

//action type
const SET_USER = 'auth/SET_USER';
const REMOVE_USER = 'auth/REMOVE_USER';
// const CREATE_USER = 'auth/CREATE_USER';//uses set user action creator - difference is thunk action creator called

export const authActionTypes = {
	SET_USER,
	REMOVE_USER
}

// action pojo creator function
const setUser = (user) => ({type:SET_USER,user});
const removeUser = () => ({type: REMOVE_USER});
// export const createUser = (user) => ({type:CREATE_USER,user});

export const AuthActions = {
	setUser,
	removeUser
}

//thunk action creator
const login = (username, password) => {
	//logging in is a put request to /api/session/
	//fetch requests that are not GET must have a XSRF-TOKEN header pointing to that cookie
	return async dispatch => {
		const res = await fetch('/api/session', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
			},
			body: JSON.stringify({username,password}),
		});
		res.data = await res.json()//this should be everything EXCEPT hashed password (see user model)
		//now we put user data in our redux store.
		if(res.ok) {
			dispatch(setUser(res.data.user));
		}
		return res;
		//instead should I put errors on user object, then in store I can have an error and grab the error array and display?
	};
};

const logout = () => async (dispatch) => {
	const res = await fetch(`/api/session`, {method: 'delete', headers: {'XSRF-TOKEN': Cookies.get('XSRF-TOKEN')}});//do I need xsrf token here?
	res.data = await res.json();
	if(res.ok) {
		dispatch(removeUser());
	}
	return res;
}

//test out actions on store
// window.login = login;

//NEED TO ALTER THIS THUNK FOR SIGNUP!!!
const signup = (username, email, password, confirmPassword) => {
	return async dispatch => {
		const body = JSON.stringify({username,email,password, confirmPassword});
		const res = await fetch('/api/users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
			},
			body,
		});
		res.data = await res.json()//this should be everything EXCEPT hashed password (see user model)
		//now we put user data in our redux store.
		if(res.ok) {
			dispatch(setUser(res.data.user));
		}
		return res;
	};
};

export const AuthThunks = {
	login,
	logout,
	signup
}

export default function authReducer(state={}, action) {
	Object.freeze(state);//possibly unnecessary
	switch(action.type) {
		case SET_USER:
			return action.user;
		case REMOVE_USER:
			return {};
		default:
			return state;
	}
}
