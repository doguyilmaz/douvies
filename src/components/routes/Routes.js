import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import AlertTry from '../AlertTry';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
	return (
		<div>
			{/* <Alert /> */}
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				{/* <Route exact path='/alert' component={AlertTry} /> */}
				{/* LATER:WILL BE REMOVED & REFACTORED  */}
				{/* <Route exact path='/profiles' component={Profiles} />
				<Route exact path='/profile/user/:userId' component={Profile} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute exact path='/create/profile' component={CreateProfile} />
				<PrivateRoute exact path='/update/profile' component={EditProfile} /> 
				 <PrivateRoute
					exact
					path='/update/profile/experience'
					component={AddExperience}
				/>
				<PrivateRoute
					exact
					path='/update/profile/education'
					component={AddEducation}
				/>
				<PrivateRoute exact path='/posts' component={Posts} />
				<PrivateRoute exact path='/posts/:pid' component={Post} />
				<Route component={NotFound} /> */}
			</Switch>
		</div>
	);
};

export default Routes;
