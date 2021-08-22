import { combineReducers } from 'redux';
import theme from './theme';
import alert from './alert';
import auth from './auth';

export default combineReducers({
	theme,
	alert,
	auth,
});
