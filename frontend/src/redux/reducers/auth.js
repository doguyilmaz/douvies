import { LOAD_USER } from '../types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	user: null,
	loading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOAD_USER:
			// If user exists
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: payload, // User data type...
			};
		default:
			return state;
	}
}
