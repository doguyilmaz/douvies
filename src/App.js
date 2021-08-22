import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routes/Routes';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadTheme, setTheme } from './redux/actions/theme';
import { loadUser } from './redux/actions/auth';
// import setAuthToken from './utils/setAuthToken';

const App = () => {
	useEffect(() => {
		store.dispatch(loadTheme());
		store.dispatch(loadUser());
	}, []);

	const setThemeLight = () => {
		store.dispatch(setTheme());
	};

	return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</>
			</Router>
			{/* <button onClick={setThemeLight}> Change Theme </button> */}
		</Provider>
	);
};

export default App;
