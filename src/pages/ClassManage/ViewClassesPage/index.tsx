import ClassDataGrid from '../../../components/ClassManage/ClassDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';
import ClassFilterValue from '../../../types/filter/ClassFilterValue';
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ClassSearch from '../../../components/ClassManage/ClassSearch';

const INITIAL_FILTER_VALUE: ClassFilterValue = {
	page: 1,
	limit: 5
};

const ViewClassesPage = () => {
	const location = useLocation();

	const initialParams = useMemo<ClassFilterValue>(() => {
		const { page, limit, name, sortBy, order } = queryString.parse(location.search);
		const values: ClassFilterValue = {};

		if (page && +page) values.page = +page;
		if (limit && +limit) values.limit = +limit;
		if (order === 'asc' || order === 'desc') values.order = order;
		if (sortBy && !Array.isArray(sortBy)) values.sortBy = sortBy;
		if (name && !Array.isArray(name)) values.name = name;

		return { ...INITIAL_FILTER_VALUE, ...values };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [, setSearchParams] = useSearchParams();
	const [filterValue, setFilterValue] = useState<ClassFilterValue>(initialParams);

	useEffect(() => {
		setSearchParams(queryString.stringify(filterValue, { skipEmptyString: true }));
	}, [filterValue, setSearchParams]);

	const handleSearchFilterChange = (filter: ClassFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	const handleDataGridFilterChange = (filter: ClassFilterValue) => {
		setFilterValue((v) => ({ ...v, ...filter }));
	};

	return (
		<AdminContentLayout header="View Classes">
			<ClassSearch
				filterValue={filterValue}
				onFilterChange={handleSearchFilterChange}
				className="px-5 pt-3 pb-5 bg-white rounded-md shadow-sm"
			/>
			<ClassDataGrid
				filterValue={filterValue}
				onFilterChange={handleDataGridFilterChange}
				className="px-5 py-3 mt-3 bg-white rounded-md shadow-md"
			/>
		</AdminContentLayout>
	);
};

export default ViewClassesPage;
