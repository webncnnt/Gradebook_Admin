import UserFilterValue from '../../types/filter/UserFilterValue';
import UpdateStudentFormData from '../../types/form/UpdateStudentFormData';
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
	putUser: async (user: UpdateStudentFormData) => {
		return await axiosClient.put(`/profile/${user.id}`, user);
	},
	blockUsers: async (ids: number[]) => {
		return await axiosClient.patch(`/admin/users/block`);
	}
};

export default userApi;
