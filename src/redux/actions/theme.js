import { SET_THEME, LOAD_THEME } from '../types';

// Set Theme ~~~~~~
export const setTheme = () => (dispatch) => {
	const theme = localStorage.getItem('theme');

	let payload = 'light';
	if (theme) {
		payload = theme === 'dark' ? 'light' : 'dark';
	}

	dispatch({
		type: SET_THEME,
		payload,
	});
};

// Load Theme
export const loadTheme = () => (dispatch) => {
	if (localStorage.theme) {
		dispatch({
			type: LOAD_THEME,
			payload: localStorage.theme,
		});
	} else {
		dispatch({
			type: SET_THEME,
			payload: 'light',
		});
	}
};
