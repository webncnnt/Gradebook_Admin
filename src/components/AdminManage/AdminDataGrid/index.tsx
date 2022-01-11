import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { UserModel } from '../../../types/models/userModel';

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

const AdminDataGrid = () => {
	const [pageSize, setPageSize] = useState<number>(5);
	const [rows, setRows] = useState<UserModel[]>([]);

	const handlePageSizeChange = (pageSize: number) => {
		setPageSize(pageSize);
	};

	return (
		<div className="w-full">
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				autoHeight
				rowsPerPageOptions={[5, 10, 15, 20]}
				onPageSizeChange={handlePageSizeChange}
				checkboxSelection
				disableSelectionOnClick
				isCellEditable={(_) => false}
			/>
		</div>
	);
};

export default AdminDataGrid;
