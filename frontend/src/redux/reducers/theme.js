import { SET_THEME, LOAD_THEME } from '../types';

const initialState = {
	theme: localStorage.getItem('theme') || 'light',
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_THEME:
			localStorage.setItem('theme', payload);
			return { ...state, theme: payload };

		case LOAD_THEME:
			return {
				...state,
				theme: localStorage.getItem('theme') || 'light',
			};

		default:
			return state;
	}
};
