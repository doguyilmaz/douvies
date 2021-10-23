import { SET_ALERT, REMOVE_ALERT } from '../types';

// Set Alert
export const setAlert = (message, alertType) => (dispatch) => {
	// LATER: needs unique id
	const id = 1;
	dispatch({
		type: SET_ALERT,
		payload: { id, message, alertType },
	});
};
