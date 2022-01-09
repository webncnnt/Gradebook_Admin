import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { UserModel } from '../../types/models/userModel';
import Button from '../Button';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'fullname',
		headerName: 'Full Name',
		width: 150
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 150
	},
	{
		field: 'dob',
		headerName: 'Birthday',
		type: 'date',
		width: 110
	}
];

const UserDataGrid = () => {
	const [pageSize, setPageSize] = useState<number>(5);
	const [hasSelectedRow, setHasSelectedRow] = useState<boolean>(false);
	const [rows, setRows] = useState<UserModel[]>([]);

	const handleSelectionChange = (selectionModel: GridSelectionModel) => {
		setHasSelectedRow(selectionModel.length !== 0);
	};

	const handlePageSizeChange = (pageSize: number) => {
		setPageSize(pageSize);
	};

	return (
		<div className="w-full">
			<Button
				disabled={!hasSelectedRow}
				className="px-6 py-2 disabled:bg-gray-500"
				color="alert"
			>
				Lock
			</Button>
			<div className="mt-3">
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					onSelectionModelChange={handleSelectionChange}
					autoHeight
					rowsPerPageOptions={[5, 10, 15, 20]}
					onPageSizeChange={handlePageSizeChange}
					checkboxSelection
					disableSelectionOnClick
					isCellEditable={(_) => false}
				/>
			</div>
		</div>
	);
};

export default UserDataGrid;
