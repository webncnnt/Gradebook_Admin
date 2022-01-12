import axiosClient from '../axios/axiosClient';
import ClassFilterValue from '../../types/filter/ClassFilterValue';

const classApi = {
	getClasses: async (params: ClassFilterValue) => {
		return await axiosClient.get(`/admin/classes`, { params });
	},
	getClass: async (id: number) => {
		return await axiosClient.get(`/admin/classes/${id}`);
	}
};

export default classApi;
