import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ListFetchParams from '../types/ListFetchParams';
import useAsync from './useAsync';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

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

	const location = useLocation();
	const { execute: asyncExecute, status, value, error, pendingTime } = useAsync(asyncApi);
	const [fetchedData, setFetchedData] = useState<ListFetchData<T>>(initialFetchData);
	const [params, setParams] = useState<ListFetchParams>({});

	useEffect(() => {
		setParams(queryString.parse(location.search, { parseNumbers: true }));
	}, [location.search]);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;
		setFetchedData({ data: transform(value.data), total: +value.headers['x-total-count'] });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, value]);

	const execute = useCallback(() => {
		return asyncExecute(params);
	}, [asyncExecute, params]);

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
