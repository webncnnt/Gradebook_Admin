import axiosClient from '../axios/axiosClient';
import ListFetchParams from '../../types/ListFetchParams';

const classApi = {
	getClasses: async (params: ListFetchParams) => {
		return await axiosClient.get(`/admin/classes`, { params });
	},
	getClass: async (id: number) => {
		return await axiosClient.get(`/admin/classes/${id}`);
	}
};

export default classApi;
