import UserFilterValue from '../../types/filter/UserFilterValue';
import { UserModel } from '../../types/models/userModel';
import axiosClient from '../axios/axiosClient';

const userApi = {
	getMe: async () => {
		return await axiosClient.get('/profile/me');
	},
	getUsers: async (params: UserFilterValue) => {
		return await axiosClient.get(`/admin/users`, { params });
	},
	getUser: async (id: number) => {
		return await axiosClient.get(`/admin/users/${id}`);
	},
	patchUser: async (user: UserModel) => {
		return await axiosClient.patch(`/admin/users/${user.id}`, user);
	},
	blockUsers: async (ids: number[]) => {
		return await axiosClient.patch(`/admin/users/block`);
	}
};

export default userApi;
