import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setAlert } from '../../actions/alert';
// import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// export const Register = ({ setAlert, register, isAuthenticated }) => {
export const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordRe: '',
	});

	const { name, email, password, passwordRe } = formData;

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (!password || !passwordRe) {
		//   setAlert('Fill the password fields!', 'danger');
		// }
		if (password !== passwordRe) {
			// setAlert('Passwords do not match!', 'danger');
		} else {
			// register({
			// 	name,
			// 	email,
			// 	password,
			// });
		}
	};

	// Redirect if logged in
	// if (isAuthenticated) {
	// 	return <Redirect to='/dashboard' />;
	// }

	return (
		<div className='container register'>
			<div className='form-register'>
				<h1 className='large text-primary'>Register</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Create Your Account
				</p>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							name='name'
							// required
							value={name}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							// required
							value={email}
							onChange={(e) => handleChange(e)}
						/>
						<small className='form-text'>
							*This site uses Gravatar so you can use Gravatar Email.
						</small>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							// minLength="6"
							value={password}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Confirm Password'
							name='passwordRe'
							// minLength="6"
							value={passwordRe}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Register' />
				</form>
				<p className='my-1'>
					Already have an account?
					<Link to='/login'> Sign In</Link>
				</p>
			</div>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Register);
// export default connect(mapStateToProps, { setAlert, register })(Register);
