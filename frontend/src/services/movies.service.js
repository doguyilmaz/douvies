import { http } from './axios';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

async function getAll() {
	// return await axios.get(`${API_URL}/douvies/movies`);
	return http.get('/douvies/movies');
}

async function getById(id) {
	return await axios.get(`${API_URL}/douvies/movies/${id}`);
}

async function create(movie) {
	return await axios.post(`${API_URL}/douvies/movies/`, movie);
}

async function update(movie) {
	return await axios.put(`${API_URL}/douvies/movies/${movie.id}`, movie);
}

async function remove(id) {
	return await axios.delete(`${API_URL}/douvies/movies/id`);
}

export const movieService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
