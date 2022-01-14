import AdminFilterValue from '../../types/filter/AdminFilterValue';
import RegisterAdminFormData from '../../types/form/RegisterAdminFormData';
import UpdateAdminFormData from '../../types/form/UpdateAdminFormData';
import axiosClient from '../axios/axiosClient';

const adminApi = {
	getAdmins: async (params: AdminFilterValue) => {
		return await axiosClient.get(`/admin/admins`, { params });
	},
	getAdmin: async (id: number) => {
		return await axiosClient.get(`/admin/admins/${id}`);
	},
	postCreateAdmin: async (formData: RegisterAdminFormData) => {
		return await axiosClient.post(`/admin/admins`, formData);
	},
	patchUpdateAdmin: async (formData: UpdateAdminFormData) => {
		// TODO
		return await axiosClient.patch(`/admin/admins`, formData);
	}
};

export default adminApi;
