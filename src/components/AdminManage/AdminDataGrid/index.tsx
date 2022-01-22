import { DataGrid, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { HTMLAttributes, useEffect, useState } from 'react';
import moment from 'moment';
import useAlert from '../../../hooks/useAlert';
import AdminFilterValue from '../../../types/filter/AdminFilterValue';
import { UserModel } from '../../../types/models/userModel';
import useListFetch from '../../../hooks/useListFetch';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/route';
import adminApi from '../../../services/apis/adminApi';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 70,
		renderCell: ({ value }) => {
			return (
				<Link
					className="text-blue-600 underline active:text-violet-600"
					to={`${ROUTES.ADMIN}/${value}`}
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
		width: 220
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

type AdminDataGridProps = {
	filterValue: AdminFilterValue;
	onFilterChange: (filterValue: AdminFilterValue) => void;
} & HTMLAttributes<HTMLDivElement>;

const AdminDataGrid = ({ filterValue, onFilterChange, ...rest }: AdminDataGridProps) => {
	const { addMessage } = useAlert();
	const [admins, setAdmins] = useState<UserModel[]>([]);

	const { execute, listData, status, count, error } = useListFetch<UserModel>(
		async () => adminApi.getAdmins(filterValue),
		(data) => data.users
	);

	const [, setSelectionModel] = useState<GridSelectionModel>([]);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);

	useEffect(() => {
		execute();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	useEffect(() => {
		status === 'success' && setAdmins(listData);
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

	return (
		<div {...rest}>
			<div className="mt-3">
				<DataGrid
					rows={admins}
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
					rowCount={count}
					onPageChange={handlePageChange}
					disableSelectionOnClick
					isCellEditable={(cell) => false}
				/>
			</div>
		</div>
	);
};

export default AdminDataGrid;
