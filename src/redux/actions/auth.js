import { LOAD_USER } from '../types';

// Load User
export const loadUser = () => async (dispatch) => {
	// set loading true and then to false & refactore the logic
	// Check if there is user in localStorage
	if (localStorage.token) {
		console.log('Found Token');
		// Set token
		// Axios header etc.
	}

	try {
		dispatch({
			type: LOAD_USER,
			payload: 'dou:13', // FIX: User data, change to right type
		});
		// Get user
		// Don't forget to memorize
		// Do not fetch user every time.
		// Then dispatch LOAD_USER
	} catch (error) {
		console.log(error);
		// If there is any error
		// Dispatch error response for reducer
	}
};

// Register User

// Login User

// Logout User

// Forgot Password

// Reset Password
