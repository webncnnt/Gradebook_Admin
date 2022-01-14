import {
	DataGrid,
	GridCellEditCommitParams,
	GridColDef,
	GridEventListener,
	GridEvents,
	GridSelectionModel,
	GridSortModel
} from '@mui/x-data-grid';
import { HTMLAttributes, useEffect, useState } from 'react';
import Button from '../../Button';
import moment from 'moment';
import useAlert from '../../../hooks/useAlert';
import UserFilterValue from '../../../types/filter/UserFilterValue';
import { UserModel } from '../../../types/models/userModel';
import useListFetch from '../../../hooks/useListFetch';
import userApi from '../../../services/apis/userApi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../constants/route';

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
		field: 'createdAt',
		headerName: 'Created At',
		type: 'date',
		width: 200,
		valueFormatter: (params) => moment(params.value as Date).format('DD/MM/YYYY HH:mm:ss')
	},
	{
		field: 'Status',
		headerName: 'Status',
		width: 100,
		valueFormatter: (params) => (params.value === 'blocked' ? 'Blocked' : 'Active')
	}
];

type UserDataGridProps = {
	filterValue: UserFilterValue;
	onFilterChange: (filterValue: UserFilterValue) => void;
} & HTMLAttributes<HTMLDivElement>;

const UserDataGrid = ({ filterValue, onFilterChange, ...rest }: UserDataGridProps) => {
	const { addMessage } = useAlert();
	const navigate = useNavigate();
	const [users, setUsers] = useState<UserModel[]>([]);

	const { execute, listData, status, count, error } = useListFetch<UserModel>(
		async () => userApi.getUsers(filterValue),
		(data) => data.data.users
	);

	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);

	useEffect(() => {
		execute();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	useEffect(() => {
		status === 'success' && setUsers(listData);
	}, [status, listData]);

	useEffect(() => {
		status === 'error' && addMessage(error.data.message, 'error');
	}, [status, error, addMessage]);

	useEffect(() => {
		if (sortModel.length > 0) {
			const { field, sort } = sortModel[0];
			field && sort && onFilterChange({ ...filterValue, sortBy: field, order: sort });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortModel]);

	const handleSelectionChange = (selectionModel: GridSelectionModel) => {
		setSelectionModel(selectionModel);
	};

	const handlePageSizeChange = (pageSize: number) => {
		onFilterChange({ ...filterValue, limit: pageSize });
	};

	const handlePageChange = (page: number) => {
		onFilterChange({ ...filterValue, page: page + 1 });
	};

	const handleSortModelChange = (gridSortModel: GridSortModel) => {
		setSortModel(gridSortModel);
	};

	const handleBlockUserClick = () => {};

	const handleStudentIdCommit = (commitParams: GridCellEditCommitParams) => {};

	const handleRowClick: GridEventListener<GridEvents.rowClick> = ({ row }) => {
		navigate(`${ROUTES.USER}/${row.id}`);
	};

	return (
		<div {...rest}>
			<Button
				onClick={handleBlockUserClick}
				disabled={selectionModel.length === 0}
				className="px-6 py-2 disabled:bg-gray-500"
				color="alert"
			>
				Block
			</Button>
			<div className="mt-3">
				<DataGrid
					rows={users}
					sortingOrder={['asc', 'desc']}
					sortModel={sortModel}
					columns={columns}
					pageSize={filterValue.limit}
					onSelectionModelChange={handleSelectionChange}
					autoHeight
					onRowClick={handleRowClick}
					sortingMode="server"
					rowsPerPageOptions={[5, 10, 15, 20]}
					onPageSizeChange={handlePageSizeChange}
					checkboxSelection
					onSortModelChange={handleSortModelChange}
					page={filterValue.page !== undefined ? filterValue.page - 1 : filterValue.page}
					paginationMode="server"
					rowCount={count}
					onPageChange={handlePageChange}
					disableSelectionOnClick
					onCellEditCommit={handleStudentIdCommit}
					isCellEditable={(cell) => cell.field === 'studentId'}
				/>
			</div>
		</div>
	);
};

export default UserDataGrid;
