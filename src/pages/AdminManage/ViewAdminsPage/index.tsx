import AdminContentLayout from '../../../layouts/AdminContentLayout';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import AdminFilterValue from '../../../types/filter/AdminFilterValue';
import queryString from 'query-string';
import AdminSearch from '../../../components/AdminManage/AdminSearch';
import AdminDataGrid from '../../../components/AdminManage/AdminDataGrid';

const INITIAL_FILTER_VALUE: AdminFilterValue = {
	page: 1,
	limit: 5,
	sortBy: 'id',
	order: 'asc'
};

const ViewAdminsPage = () => {
	const location = useLocation();

	const initialParams = useMemo<AdminFilterValue>(() => {
		const { page, limit, name, email, sortBy, order } = queryString.parse(location.search);
		const values: AdminFilterValue = {};

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
	const [filterValue, setFilterValue] = useState<AdminFilterValue>(initialParams);

	useEffect(() => {
		setSearchParams(queryString.stringify(filterValue, { skipEmptyString: true }));
	}, [filterValue, setSearchParams]);

	const handleSearchFilterChange = (filter: AdminFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	const handleDataGridFilterChange = (filter: AdminFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	return (
		<AdminContentLayout header="View Admins">
			<AdminSearch
				filterValue={filterValue}
				onFilterChange={handleSearchFilterChange}
				className="px-5 pt-3 pb-5 bg-white rounded-md shadow-sm"
			/>
			<AdminDataGrid
				filterValue={filterValue}
				onFilterChange={handleDataGridFilterChange}
				className="px-5 py-3 mt-3 bg-white rounded-md shadow-md"
			/>
		</AdminContentLayout>
	);
};

export default ViewAdminsPage;
