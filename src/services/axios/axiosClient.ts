import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:800/api'
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

	return config;
});

axiosClient.interceptors.response.use(async (response) => {
	return response;
});

export default axiosClient;
