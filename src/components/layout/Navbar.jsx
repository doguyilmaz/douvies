import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated }) => {
	// const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const authLinks = (
		<ul>
			{/* <li>
        <Link to='/profiles'> Developers </Link>
      </li>*/}
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-home'></i>{' '}
					<span className='hide-sm'> Dashboard </span>
				</Link>
			</li>
			<li>
				<Link to='/series'>
					<i className='fas fa-users'></i>{' '}
					<span className='hide-sm'> Series </span>
				</Link>
			</li>
			<li>
				<Link to='/movies'>
					<i className='fas fa-users'></i>{' '}
					<span className='hide-sm'> Movies </span>
				</Link>
			</li>
			<li>
				<Link to='/profile'>
					<i className='fas fa-user-circle'></i>{' '}
					<span className='hide-sm'> My Profile </span>
				</Link>
			</li>
			<li>
				<Link to='#!'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'> Logout </span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/upcoming'> Upcoming </Link>
			</li>
			<li>
				<Link to='/register'> Register </Link>
			</li>
			<li>
				<Link to='/login'> Login </Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-compact-disc'></i> Douvies{' '}
				</Link>
			</h1>
			<div className='navbar-settings'>
				{!false && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					// <Fragment>{isAuthenticated && false ? authLinks : guestLinks}</Fragment>
				)}
				{/* LATER: navbar status */}
				<i className='fas fa-tools'></i>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Navbar);
