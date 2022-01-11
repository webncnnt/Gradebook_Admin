import UserDataGrid from '../../../components/UserManage/UserDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';
import userApi from '../../../services/apis/userApi';
import { useEffect, useState } from 'react';
import useListFetch from '../../../hooks/useListFetch';
import { UserModel } from '../../../types/models/userModel';
import UserSearch from '../../../components/UserManage/UserSearch';
import useAlert from '../../../hooks/useAlert';

const ViewUsersPage = () => {
	const { addMessage } = useAlert();
	const [users, setUsers] = useState<UserModel[]>([]);
	const { execute, listData, status, count, error } = useListFetch<UserModel>(
		userApi.getUsers,
		(data) => data.data.users
	);

	useEffect(() => {
		execute();
	}, [execute]);

	useEffect(() => {
		if (status === 'success') {
			setUsers(listData);
		}
	}, [status, listData]);

	useEffect(() => {
		if (status === 'error') {
			addMessage(error.data.message, 'error');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, error]);

	return (
		<AdminContentLayout header="View Users">
			<UserSearch className="px-5 pt-3 pb-5 bg-white rounded-md shadow-sm" />
			<UserDataGrid
				className="px-5 py-3 mt-3 bg-white rounded-md shadow-md"
				rows={users}
				rowCount={count}
			/>
		</AdminContentLayout>
	);
};

export default ViewUsersPage;
