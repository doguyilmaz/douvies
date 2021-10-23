import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { setAlert } from '../redux/actions/alert';

const AlertTry = ({ setAlert, alerts }) => {
	return (
		<div>
			<ul>
				{alerts.map((alert) => (
					<li>
						id: {uuid()}, msg: {alert.message}, type: {alert.alertType}
					</li>
				))}
			</ul>

			<h1>Alert Section</h1>
			<Link to='/'>Back</Link>
			<div>
				<button onClick={() => setAlert('Try Message', 'success')}>
					Alert
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(AlertTry);
