import ListFetchParams from '../../types/ListFetchParams';
import { UserModel } from '../../types/models/userModel';
import axiosClient from '../axios/axiosClient';

const adminApi = {
	getAdmins: async (params: ListFetchParams) => {
		return await axiosClient.get(`/admins`, { params });
	},
	getAdmin: async (id: number) => {
		return await axiosClient.get(`/admins/${id}`);
	},
	postCreateAdmin: async (user: UserModel) => {
		return await axiosClient.patch(`/admins/${user.id}`, user);
	}
};

export default adminApi;
