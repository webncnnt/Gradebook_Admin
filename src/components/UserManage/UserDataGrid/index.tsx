import {
	DataGrid,
	GridCellEditCommitParams,
	GridColDef,
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
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/route';
import useAsync from '../../../hooks/useAsync';
import UpdateStudentFormData from '../../../types/form/UpdateStudentFormData';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 70,
		renderCell: ({ value }) => {
			return (
				<Link
					className="text-blue-600 underline active:text-violet-600"
					to={`${ROUTES.USER}/${value}`}
				>
					{value}
				</Link>
			);
		}
	},
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
		field: 'status',
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

	const [users, setUsers] = useState<UserModel[]>([]);

	const {
		execute: executeUsersFetch,
		listData: listDataUsers,
		status: statusUsersFetch,
		count: totalUsers,
		error: errorUsersFetch
	} = useListFetch<UserModel>(
		async () => userApi.getUsers(filterValue),
		(data) => data.data.users
	);

	const {
		execute: executeUpdateStudentId,
		status: statusUpdateStudentId,
		error: errorsUpdateStudentId
	} = useAsync(userApi.putUser);

	const {
		execute: executeBlockUsers,
		status: statusBlockFetch,
		error: errorBlockFetch
	} = useAsync(userApi.blockUsers);

	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);

	// Users
	useEffect(() => {
		executeUsersFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	useEffect(() => {
		statusUsersFetch === 'success' && setUsers(listDataUsers);
	}, [statusUsersFetch, listDataUsers]);

	useEffect(() => {
		statusUsersFetch === 'error' && addMessage(errorUsersFetch.data.message, 'error');
	}, [statusUsersFetch, errorUsersFetch, addMessage]);

	// Block Users
	useEffect(() => {
		statusBlockFetch === 'success' && addMessage('Block users successfully', 'success');
		statusBlockFetch === 'error' && addMessage(errorBlockFetch.data.message, 'error');
	}, [statusBlockFetch, addMessage, errorBlockFetch]);

	// Update Student ID
	useEffect(() => {
		statusUpdateStudentId === 'success' && addMessage('Update student id success', 'success');
		statusUpdateStudentId === 'error' && addMessage(errorsUpdateStudentId.data.message, 'error');
	}, [statusUpdateStudentId, addMessage, errorsUpdateStudentId]);

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

	const handleBlockUserClick = () => {
		executeBlockUsers(selectionModel);
	};

	const handleStudentIdCommit = (commitParams: GridCellEditCommitParams) => {
		const { id, value } = commitParams;

		const userNeedUpdate = users.find((u) => u.id === id);

		if (userNeedUpdate) {
			const { fullName, id, avatar, dob, numberPhone, facebook, address } = userNeedUpdate;

			const updateForm: UpdateStudentFormData = {
				fullname: fullName,
				id,
				studentId: value?.toString(),
				avatar,
				dob,
				numberPhone,
				facebook,
				address
			};

			executeUpdateStudentId(updateForm);
		}
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
					sortingMode="server"
					rowsPerPageOptions={[5, 10, 15, 20]}
					onPageSizeChange={handlePageSizeChange}
					checkboxSelection
					onSortModelChange={handleSortModelChange}
					page={filterValue.page !== undefined ? filterValue.page - 1 : filterValue.page}
					paginationMode="server"
					rowCount={totalUsers}
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
