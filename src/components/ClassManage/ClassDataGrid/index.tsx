import {
	DataGrid,
	GridColDef,
	GridEventListener,
	GridEvents,
	GridSelectionModel,
	GridSortModel
} from '@mui/x-data-grid';
import { HTMLAttributes, useEffect, useState } from 'react';
import moment from 'moment';
import useAlert from '../../../hooks/useAlert';
import ClassFilterValue from '../../../types/filter/ClassFilterValue';
import useListFetch from '../../../hooks/useListFetch';
import classApi from '../../../services/apis/classApi';
import ClassModel from '../../../types/models/ClassModel';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../constants/route';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'className',
		headerName: 'Class Name',
		width: 200
	},
	{
		field: 'ownerId',
		headerName: 'Owner ID',
		width: 100
	},
	{
		field: 'inviteCode',
		headerName: 'Invite Code',
		width: 150
	},
	{
		field: 'totalMember',
		headerName: 'Total Members',
		width: 150
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		width: 200,
		valueFormatter: (params) => moment(params.value as Date).format('DD/MM/YYYY HH:mm:ss')
	}
];

type ClassDataGridProps = {
	filterValue: ClassFilterValue;
	onFilterChange: (filterValue: ClassFilterValue) => void;
} & HTMLAttributes<HTMLDivElement>;

const ClassDataGrid = ({ filterValue, onFilterChange, ...rest }: ClassDataGridProps) => {
	const { addMessage } = useAlert();
	const navigate = useNavigate();
	const [classes, setClasses] = useState<ClassModel[]>([]);

	const { execute, listData, status, count, error } = useListFetch<ClassModel>(
		async () => classApi.getClasses(filterValue),
		(data) => data.data.classes
	);

	const [sortModel, setSortModel] = useState<GridSortModel>([]);

	useEffect(() => {
		execute();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	useEffect(() => {
		status === 'success' && setClasses(listData);
	}, [status, listData]);

	useEffect(() => {
		status === 'error' && addMessage(error.data.message, 'error');
	}, [status, error, addMessage]);

	useEffect(() => {
		if (sortModel.length > 0) {
			const { field, sort } = sortModel[0];
			field && sort && onFilterChange({ ...filterValue });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortModel]);

	const handleSelectionChange = (selectionModel: GridSelectionModel) => {};

	const handlePageSizeChange = (pageSize: number) => {
		onFilterChange({ ...filterValue, limit: pageSize });
	};

	const handlePageChange = (page: number) => {
		onFilterChange({ ...filterValue, page: page + 1 });
	};

	const handleSortModelChange = (gridSortModel: GridSortModel) => {
		setSortModel(gridSortModel);
	};

	const handleRowClick: GridEventListener<GridEvents.rowClick> = ({ row }) => {
		navigate(`${ROUTES.CLASS}/${row.id}`);
	};

	return (
		<div {...rest}>
			<div className="mt-3">
				<DataGrid
					rows={classes}
					sortingOrder={['asc', 'desc']}
					sortModel={sortModel}
					columns={columns}
					pageSize={filterValue.limit}
					onSelectionModelChange={handleSelectionChange}
					autoHeight
					onRowClick={handleRowClick}
					rowsPerPageOptions={[5, 10, 15, 20]}
					onPageSizeChange={handlePageSizeChange}
					checkboxSelection
					sortingMode="server"
					onSortModelChange={handleSortModelChange}
					page={filterValue.page !== undefined ? filterValue.page - 1 : filterValue.page}
					paginationMode="server"
					rowCount={count}
					onPageChange={handlePageChange}
					disableSelectionOnClick
				/>
			</div>
		</div>
	);
};

export default ClassDataGrid;
