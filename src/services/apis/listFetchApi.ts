import ListFetchParams from '../../types/ListFetchParams';
import axiosClient from '../axios/axiosClient';

const listFetchApi = async (url: string, params: ListFetchParams) => {
	return await axiosClient.get(url, { params });
};

export default listFetchApi;
