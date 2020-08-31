import Cookies from 'js-cookie';//this module allows us to grab cookies
// create all actions and reducer related to auth in this file

//action type
const SET_USER = 'auth/SET_USER';

// action pojo creator function
const setUser = (user) => ({type:SET_USER,user});

//thunk action creator
export const login = (username, password) => {
	//logging in is a put request to /api/session/
	//fetch requests that are not GET must have a XSRF-TOKEN header pointing to that cookie
	return async dispatch => {
		const res = await fetch('/api/session', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
			},
			body: JSON.stringify({username,password});
		});
		res.data = await res.json()//this should be everything EXCEPT hashed password (see user model)
		//now we put user data in our redux store.
		if(res.ok) {
			dispatch(setUser(res.data));
		}
		return res;
	};
};
