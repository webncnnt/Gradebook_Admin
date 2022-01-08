import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000/api'
});

axiosClient.interceptors.request.use(async (config) => {
	if (!config.headers) {
		config.headers = {};
	}

	const token = localStorage.getItem('access_token');
	const contentType = config.headers['Content-Type'];

	if (token) {
		config.headers['Authorization'] = token;
	}

	if (!contentType) {
		config.headers['Content-Type'] = 'application/json';
	}

	config.timeout = 10000;

	return config;
});

axiosClient.interceptors.response.use(
	async (response) => {
		return response;
	},
	async (error) => {
		if (error.response.status === 401) {
			return Promise.reject(error.response);
		}

		return Promise.reject(error);
	}
);

export default axiosClient;
