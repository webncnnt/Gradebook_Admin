import { AxiosResponse } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import ListFetchParams from '../types/ListFetchParams';
import useAsync from './useAsync';

export type ListFetchData<T> = {
	data: T[];
	total: number;
};

const useListFetch = <T,>(
	asyncApi: (params: ListFetchParams) => Promise<AxiosResponse<any, any>>,
	transform: (data: any) => T[]
) => {
	const initialFetchData = useMemo<ListFetchData<T>>(
		() => ({
			data: [],
			total: 0
		}),
		[]
	);

	const { execute, status, value, error, pendingTime } = useAsync(asyncApi);
	const [fetchedData, setFetchedData] = useState<ListFetchData<T>>(initialFetchData);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;
		setFetchedData({ data: transform(value.data), total: +value.headers['x-total-count'] });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, value]);

	const { data, total } = fetchedData;

	return {
		execute,
		listData: data,
		count: total,
		status,
		error,
		pendingTime
	};
};

export default useListFetch;
