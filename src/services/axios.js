import axios from 'axios';
// import { API_URL } from '../config';

const API_URL = 'http://localhost:5000';

let instance = axios.create({
	baseURL: API_URL,
	timeout: 4000,
	timeoutErrorMessage: 'Request has timed out. Try again later.',
});

// request header
instance.interceptors.request.use(
	(config) => {
		// Do something before request is sent

		// api token
		// const apiToken = sessionStorage.getItem('token')
		// config.headers = { 'Custom-Header-IF-Exist': apiToken }
		// const apiToken = JSON.parse(localStorage.getItem('token'));
		// alert(apiToken.token)
		// config['Content-Type'] = 'application/json';
		// config['headers'] = { Authorization: apiToken };
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const http = instance;
