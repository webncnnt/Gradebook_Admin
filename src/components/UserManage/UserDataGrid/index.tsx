import { DataGrid, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { UserModel } from '../../../types/models/userModel';
import Button from '../../Button';
import queryString from 'query-string';
import UserFilterValue from '../../../types/filter/UserFilterValue';
import moment from 'moment';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'fullName',
		headerName: 'Full Name',
		width: 200
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 200
	},
	{
		field: 'studentId',
		headerName: 'Student ID',
		width: 120,
		editable: true
	},
	{
		field: 'birth',
		headerName: 'Birthday',
		type: 'date',
		width: 150
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		type: 'date',
		width: 150,
		valueFormatter: (params) => moment(params.value as Date).format('DD/MM/YYYY HH:mm:ss')
	}
];

type UserDataGridProps = {
	rows: UserModel[];
	rowCount: number;
	onRowClick?: (user: UserModel) => void;
} & HTMLAttributes<HTMLDivElement>;

const UserDataGrid = ({ rows, rowCount, onRowClick, ...rest }: UserDataGridProps) => {
	const location = useLocation();
	const [, setSearchParams] = useSearchParams();

	const initialParams = useMemo<UserFilterValue>(() => {
		const { page, limit, name, email, sortBy, order } = queryString.parse(location.search);
		const values: UserFilterValue = {};

		values.page = page ? +page : 1;
		values.limit = limit ? +limit : 5;
		values.sortBy = sortBy && !Array.isArray(sortBy) ? sortBy : undefined;
		values.order = order === 'asc' || order === 'desc' ? order : undefined;
		values.email = email && !Array.isArray(email) ? email : undefined;
		values.name = name && !Array.isArray(name) ? name : undefined;
		values.email = email && !Array.isArray(email) ? email : undefined;

		return values;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [filterValue, setFilterValue] = useState<UserFilterValue>(initialParams);
	const [hasSelectedRow, setHasSelectedRow] = useState<boolean>(false);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'id',
			sort: 'asc'
		}
	]);

	useEffect(() => {
		setSearchParams(queryString.stringify(filterValue));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	useEffect(() => {
		if (sortModel.length < 0) return;
		const { field, sort } = sortModel[0];

		if (field && sort) setFilterValue((value) => ({ ...value, sortBy: field, order: sort }));
	}, [sortModel]);

	const handleSelectionChange = (selectionModel: GridSelectionModel) => {
		setHasSelectedRow(selectionModel.length !== 0);
	};

	const handlePageSizeChange = (pageSize: number) => {
		setFilterValue((value) => ({ ...value, limit: pageSize }));
	};

	const handlePageChange = (page: number) => {
		setFilterValue((value) => ({ ...value, page: page + 1 }));
	};

	const handleSortModelChange = (gridSortModel: GridSortModel) => {
		setSortModel(gridSortModel);
	};

	return (
		<div {...rest}>
			<Button disabled={!hasSelectedRow} className="px-6 py-2 disabled:bg-gray-500" color="alert">
				Lock
			</Button>
			<div className="mt-3">
				<DataGrid
					rows={rows}
					sortingOrder={['asc', 'desc']}
					sortModel={sortModel}
					columns={columns}
					pageSize={filterValue.limit}
					onSelectionModelChange={handleSelectionChange}
					autoHeight
					rowsPerPageOptions={[5, 10, 15, 20]}
					onPageSizeChange={handlePageSizeChange}
					checkboxSelection
					onSortModelChange={handleSortModelChange}
					page={filterValue.page !== undefined ? filterValue.page - 1 : filterValue.page}
					paginationMode="server"
					rowCount={rowCount}
					onPageChange={handlePageChange}
					disableSelectionOnClick
					isCellEditable={(cell) => cell.field === 'studentId'}
				/>
			</div>
		</div>
	);
};

export default UserDataGrid;
