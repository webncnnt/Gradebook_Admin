import RegisterAdminFormData from '../../types/form/RegisterAdminFormData';
import UpdateAdminFormData from '../../types/form/UpdateAdminFormData';
import ListFetchParams from '../../types/ListFetchParams';
import axiosClient from '../axios/axiosClient';

const adminApi = {
	getAdmins: async (params: ListFetchParams) => {
		return await axiosClient.get(`/admins`, { params });
	},
	getAdmin: async (id: number) => {
		return await axiosClient.get(`/admins/${id}`);
	},
	postCreateAdmin: async (formData: RegisterAdminFormData) => {
		return await axiosClient.post(`/auth/register`, formData);
	},
	patchUpdateAdmin: async (formData: UpdateAdminFormData) => {
		// TODO
		return await axiosClient.patch(`/admins`, formData);
	}
};

export default adminApi;
