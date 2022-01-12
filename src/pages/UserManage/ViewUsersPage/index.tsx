import UserDataGrid from '../../../components/UserManage/UserDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import UserSearch from '../../../components/UserManage/UserSearch';
import UserFilterValue from '../../../types/filter/UserFilterValue';
import queryString from 'query-string';

const INITIAL_FILTER_VALUE: UserFilterValue = {
	page: 1,
	limit: 5,
	sortBy: 'id',
	order: 'asc'
};

const ViewUsersPage = () => {
	const location = useLocation();

	const initialParams = useMemo<UserFilterValue>(() => {
		const { page, limit, name, email, sortBy, order } = queryString.parse(location.search);
		const values: UserFilterValue = {};

		if (page && +page) values.page = +page;
		if (limit && +limit) values.limit = +limit;
		if (order === 'asc' || order === 'desc') values.order = order;
		if (sortBy && !Array.isArray(sortBy)) values.sortBy = sortBy;
		if (name && !Array.isArray(name)) values.name = name;
		if (email && !Array.isArray(email)) values.email = email;

		return { ...INITIAL_FILTER_VALUE, ...values };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [, setSearchParams] = useSearchParams();
	const [filterValue, setFilterValue] = useState<UserFilterValue>(initialParams);

	useEffect(() => {
		setSearchParams(queryString.stringify(filterValue, { skipEmptyString: true }));
	}, [filterValue, setSearchParams]);

	const handleSearchFilterChange = (filter: UserFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	const handleDataGridFilterChange = (filter: UserFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	return (
		<AdminContentLayout header="View Users">
			<UserSearch
				filterValue={filterValue}
				onFilterChange={handleSearchFilterChange}
				className="px-5 pt-3 pb-5 bg-white rounded-md shadow-sm"
			/>
			<UserDataGrid
				filterValue={filterValue}
				onFilterChange={handleDataGridFilterChange}
				className="px-5 py-3 mt-3 bg-white rounded-md shadow-md"
			/>
		</AdminContentLayout>
	);
};

export default ViewUsersPage;
