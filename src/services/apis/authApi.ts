import axiosClient from '../axios/axiosClient';

const authApi = {
	postLogin: async (email: string, password: string) => {
		return await axiosClient.post('/auth/login', { email, password });
	},
	postForgotPassword: async (email: string) => {
		return await axiosClient.post('/auth/forgot', { email });
	},
	postChangePassword: async (
		id: number,
		oldPassword: string,
		newPassword: string
	) => {
		return await axiosClient.post(`/auth/changePwd/${id}`, {
			oldPass: oldPassword,
			newPass: newPassword
		});
	}
};

export default authApi;
