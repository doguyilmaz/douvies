import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = loginData;

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (!password) {
		//   alert('Fill the password field!');
		// }
		// else {
		// login(email, password);
		// }
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='container login'>
			<div className='form-login'>
				<h1 className='large text-primary'>Login</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Sign Into Your Account
				</p>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							required
							value={email}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							minLength='6'
							value={password}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Login' />
				</form>
				<p className='my-1'>
					Don't have an account?
					<Link to='/register'> Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

Login.propTypes = {
	// login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

// export default connect(mapStateToProps, { login })(Login);
export default connect(mapStateToProps, {})(Login);
