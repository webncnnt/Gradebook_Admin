import axiosClient from '../axios/axiosClient';
import ListFetchParams from '../../types/ListFetchParams';

const classApi = {
	getClasses: async (params: ListFetchParams) => {
		return await axiosClient.get(`/classes`, { params });
	},
	getClass: async (id: number) => {
		return await axiosClient.get(`/classes/${id}`);
	}
};

export default classApi;
