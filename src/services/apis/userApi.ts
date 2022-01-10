import ListFetchParams from '../../types/ListFetchParams';
import { UserModel } from '../../types/models/userModel';
import axiosClient from '../axios/axiosClient';

const userApi = {
	getMe: async () => {
		return await axiosClient.get('/profile/me');
	},
	getUsers: async (params: ListFetchParams) => {
		return await axiosClient.get(`/users`, { params });
	},
	getUser: async (id: number) => {
		return await axiosClient.get(`/users/${id}`);
	},
	patchUser: async (user: UserModel) => {
		return await axiosClient.patch(`/users/${user.id}`, user);
	}
};

export default userApi;
