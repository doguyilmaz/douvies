import React, { useState, useLayoutEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import ThemeContext from '../../theme/theme-context';

import Nav from './Navbar';

import { dark, light } from '../../theme/theme-context';

const Landing = ({ theme: { theme }, isAuth }) => {
	const [mode, setMode] = useState(light);

	// Alternative to useEffect for theme
	// paints the app before it renders elements
	useLayoutEffect(() => {
		if (theme === 'dark') {
			setMode(light);
		} else {
			setMode(dark);
		}
	}, [theme]);

	// theme.theme === 'dark' ? dark : light;

	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}

	return (
		// <div style={mode}>
		// 	<h1>Landing</h1>
		// 	<Nav />
		// 	<p>{JSON.stringify(theme)}</p>
		// </div>
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>
						<span>Dou</span>vies
					</h1>
					<p className='lead'>A movie and serie app. Personal Passions</p>
					<div className='buttons'>
						<Link
							to='/register'
							className='btn btn-primary'
							style={{ borderRadius: 30, width: 120 }}
						>
							{' '}
							Sign Up{' '}
						</Link>
						<Link
							to='/login'
							className='btn btn-light'
							style={{ borderRadius: 30, width: 120 }}
						>
							{' '}
							Login{' '}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	theme: state.theme,
});

export default connect(mapStateToProps, {})(Landing);
