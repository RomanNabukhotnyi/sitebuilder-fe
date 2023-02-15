import axios from 'axios/index';
import { routeConfig } from '@/router';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
	}
});

api.interceptors.response.use(
	(response) => {
		return response.data.data;
	},
	async (error) => {
		if (
			error.response &&
			error.response.status === 401 &&
			error.response.config.url === '/auth/refresh'
		) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			routeConfig.push('/login');
			return Promise.reject(error);
		} else if (error.response && error.response.status === 401) {
			const response = await api.get('/auth/refresh', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
				},
			});
			const accessToken = response.data.data.accessToken;
			localStorage.removeItem('accessToken');
			localStorage.setItem('accessToken', accessToken);
			axios.defaults.headers.common[
				'Authorization'
				] = `Bearer ${localStorage.getItem('accessToken')}`;
			return axios({
				...error.config,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});
		} else {
			return Promise.reject(error);
		}
	}
);

export {
	api
};
